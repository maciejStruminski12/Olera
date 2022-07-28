/// <reference types="cypress" />

import { CarePlan } from "./PageObjects/CarePlan"
import { HomePage } from "./PageObjects/HomePage"
import { Map } from "./PageObjects/Map"
import { Questionnaire } from "./PageObjects/Questionnaire"


const home = new HomePage()
const questionnaire = new Questionnaire()
const carePlan = new CarePlan()
const map = new Map()

    beforeEach(() => {
       cy.login()
    })
    
describe('logged in user', () => { 
    it('2.2.1 Homepage without zipp code', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://staging-api.olera.care/api/v1/users/me?with_answers=true',
            },
            {
            body:
                {"id":4,
                "email":"qatest@xfive.co",
                "created_at":"2022-02-10T02:29:22.676-06:00",
                "updated_at":"2022-04-08T04:55:34.022-05:00",
                "role":"caregiver",
                "name":"QA Test",
                "zip_code":null,
                "display_name":"QA Test",
                
                }
            
            }
            ).as('me')
        cy.visit('/')
        cy.wait('@me')
        home.getTopBar_LoginButton().should('not.exist')
        home.getTopBar_CarePlanButton().should('exist')
        home.getGetStartedButton().should('be.visible')
        cy.get('input').should('have.length',2).within((el)=>{
            cy.get(el[0]).should('have.attr','placeholder','Zip Code')
        })
     
    })
    it('2.2.2 Homepage with zipp code', () => {
        home.getTopBar_LoginButton().should('not.exist')
        home.getTopBar_CarePlanButton().should('exist')
        home.getBrowseNowButton().should('be.visible')
        cy.get('input').should('have.length',1)
    })
    it('2.2.3 Answer questions', () => {
        cy.interceptQuestions() 
        home.getBrowseNowButton().click()
        cy.wait('@questions') 
        questionnaire.answer('Yes').click()
        questionnaire.getNextButton().click()
        questionnaire.answer('Home').click()
        cy.interceptCarePlan()
        questionnaire.getFinnishButton().click()
        cy.wait('@carePlan')
        carePlan.getTitle().should('exist')
        carePlan.getResultCategoryName('[Test] Category for testing').siblings('ul').within(()=>{
            cy.get('li').contains('[Test] Third subcategory').should('exist')
            cy.get('li').contains('[Test] Second subcategory (excluded)').should('exist')
        })
        carePlan.getResultCategoryName('[Test] Category for testing').parent().next().within(()=>{
            cy.get('li').eq(0).should('contain',0)
            cy.get('li').eq(1).should('contain',3).click()
        })
        cy.wait(1000)
        map.getProviderLink('Test Provider 2').should('exist')
        map.getProviderLink('Test Provider 3').should('exist')
        map.getListOfProviders().should('have.length',3) //change to 2 when map is fixed. If not working, set providers Long and Lat
        map.setRange('20')
        map.getListOfProviders().should('have.length',3)
        map.getProviderLink('Test Provider 1').should('exist')
        
    })
    it.only('2.2.4 Different answers - different results', () => {
    
        cy.interceptQuestions() 
        home.getBrowseNowButton().click()
        cy.wait('@questions')
        cy.wait(1000)
        questionnaire.answer('No').click()
        questionnaire.getNextButton().click()
        questionnaire.answer('Their own home').click()
        cy.interceptCarePlan()
        questionnaire.getFinnishButton().click()   
        cy.wait('@carePlan')
        cy.wait(3000)
        carePlan.getTitle().should('exist')
        carePlan.getResultCategoryName('[Test] Category for testing').siblings('ul').within(()=>{
            cy.get('li').contains('[Test] Third subcategory').should('exist')
            cy.get('li').contains('[Test] First subcategory').should('exist')
        })
        carePlan.getResultCategoryName('[Test] Category for testing').parent().next().within(()=>{
            cy.get('li').eq(0).should('contain',0)
            cy.get('li').eq(1).should('contain',2).click()
        })
        cy.wait(1000)
        map.getProviderLink('Test Provider 3').should('exist')
        map.getListOfProviders().should('have.length',2) //change to 1 when map is fixed. If not working, set providers Long and Lat
        map.setRange('20')
        map.getListOfProviders().should('have.length',2)
        map.getProviderLink('Test Provider 1').should('exist')
    })    
})
