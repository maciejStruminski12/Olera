/// <reference types="cypress" />

import { AdminDashboard } from "./PageObjects/AdminDashboard"
import { AdminLoginPage } from "./PageObjects/AdminLoginPage"
import { ForgotPasswordPage } from "./PageObjects/AdminForgotPasswordPage"
import { ResendConfirmationPage } from "./PageObjects/AdminResendConfirmationPage"


const adminLogin = new AdminLoginPage()
const adminDashboard = new AdminDashboard()
const forgotPasswordPage = new ForgotPasswordPage()
const resendConfirmationPage = new ResendConfirmationPage()

describe('1.1 Admin Login Page', () => {

    
    context('Login',()=>{
        beforeEach(() => {
            cy.visit(Cypress.env('adminLoginUrl'))
        })
        it('1.1.1 unregistered email', () => {
            adminLogin.getEmail().type('qatest+wrongemail@xfive.co')
            adminLogin.getPassword().type(Cypress.env('password')+'{enter}')
            adminLogin.validateAlert('Invalid Email or password.')
        })
        it('1.1.2 wrong password', () => {
            adminLogin.getEmail().type(Cypress.env('adminEmail'))
            adminLogin.getPassword().type('asdasdasd')
            adminLogin.getSubmitButton().click()
            adminLogin.validateAlert('Invalid Email or password.')
        })
        it('1.1.3 successful login', () => {
            adminLogin.getEmail().type(Cypress.env('adminEmail'))
            adminLogin.getPassword().type(Cypress.env('password')+'{enter}')
            adminDashboard.getTopBarTitle().should('contain','Olera Backend')
        })
        it('1.1.4 Forgot password link', () => {
            adminLogin.getForgotPasswordLink().click()
            adminLogin.validatePageTitle('Forgot your password?')
            forgotPasswordPage.getEmail().should('be.visible')
        })
        it('1.1.4 Email Confirmation link', () => {
            adminLogin.getEmailConfirmationLink().click()
            adminLogin.validatePageTitle('Resend confirmation instructions')
            resendConfirmationPage.getEmail().should('be.visible')
        })
    })
    context('Forgot password',()=>{
        beforeEach(() => {
            cy.visit(Cypress.env('adminLoginUrl')+'/users/password/new')
        })
        it('1.2.1 blank email', () => {
            forgotPasswordPage.getSubmitButton().click()
            forgotPasswordPage.validateNotice('If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.')
            adminLogin.validatePageTitle('Log in')
        })    
        it('1.2.2 unregistered email', () => {
            forgotPasswordPage.getEmail().type('qatest+wrongemail@xfive.co {enter}')
            forgotPasswordPage.validateNotice('If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.')
            adminLogin.validatePageTitle('Log in')
        })
        it('1.2.3 valid email', () => {
            forgotPasswordPage.getEmail().type(Cypress.env('adminEmail')+ '{enter}')
            forgotPasswordPage.validateNotice('If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.')
            adminLogin.validatePageTitle('Log in')
        })
    })
    context('Email confirmation',()=>{
        beforeEach(() => {
            cy.visit(Cypress.env('adminLoginUrl')+'/users/confirmation/new')
        })
        it('1.3.1 blank email', () => {
            resendConfirmationPage.getSubmitButton().click()
            resendConfirmationPage.validateNotice('If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes.')
            adminLogin.validatePageTitle('Log in')
        })    
        it('1.3.2 unregistered email', () => {
            resendConfirmationPage.getEmail().type('qatest+wrongemail@xfive.co {enter}')
            resendConfirmationPage.validateNotice('If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes.')
            adminLogin.validatePageTitle('Log in')
        })
        it('1.3.3 valid email', () => {
            resendConfirmationPage.getEmail().type(Cypress.env('adminEmail')+ '{enter}')
            resendConfirmationPage.validateNotice('If your email address exists in our database, you will receive an email with instructions for how to confirm your email address in a few minutes.')
            adminLogin.validatePageTitle('Log in')
        })
    })

})