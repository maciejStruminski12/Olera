// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
 
 Cypress.Commands.add('login',() => { 
  cy.request({
    method: 'POST',
    url : 'https://staging-api.olera.care/users/sign_in',
    headers: {
      Accept: 'application/json'
    },
    body: {
      user: {
        email: Cypress.env('userEmail'),
        password: Cypress.env('password')
      }
    }

  }).then((resp) => {
    cy.log(JSON.stringify(resp.headers.authorization))
    const tempToken = resp.headers.authorization;
    
    const token = tempToken.replace("Bearer ", "")
    cy.visit(Cypress.env('loginUrl'))
    cy.window()
  .its("sessionStorage")
  .invoke("setItem", "accessToken", token)    
  })
  cy.visit('/')
})

 
Cypress.Commands.add('interceptQuestions',() => { 
  cy.intercept({
    method: 'GET',
    url: 'https://stg-app.olera.care/_next/data/*/questionnaire.json',
    },
    {
        body:{
            "pageProps":
            {
                "questions":[
                    {"id":6,
                    "value":"[Test] Do you have advanced directives in place?",
                    "order":0,
                    "answers":[
                        {"id":16,
                        "value":"Yes",
                        "order":0},
                        {"id":17,
                        "value":"No",
                        "order":1},
                        ]
                    },
                    {"id":7,
                    "value":"[Test] Where does your loved one live?",
                    "order":1,
                    "answers":[
                        {"id":18,
                        "value":"Home",
                        "order":0},
                        {"id":19,
                        "value":"Their own home",
                        "order":1},
                        {"id":20,
                        "value":"An assisted living facility",
                        "order":2}
                    ]},
                    ]},
                    
                }
    
    }
    ).as('questions')  
})
Cypress.Commands.add('interceptCarePlan',() => { 
  cy.intercept({
    method: 'GET',
    url: 'https://staging-api.olera.care/api/v1/care_plan',
    }).as('carePlan')
})

 
 /*Cypress.Commands.add('loginByGoogleApi', () => {
    cy.log('Logging in to Google')
    cy.request({
      method: 'POST',
      url: 'https://www.googleapis.com/oauth2/v4/token',
      body: {
        grant_type: 'refresh_token',
        client_id: Cypress.env('googleClientId'),
        client_secret: Cypress.env('googleClientSecret'),
        refresh_token: Cypress.env('googleRefreshToken'),
      },
    }).then(({ body }) => {
      const { access_token, id_token } = body
  
      cy.request({
        method: 'GET',
        url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        headers: { Authorization: `Bearer ${access_token}` },
      }).then(({ body }) => {
        cy.log(body)
        const userItem = {
          token: id_token,
          user: {
            googleId: body.sub,
            email: body.email,
            givenName: body.given_name,
            familyName: body.family_name,
            imageUrl: body.picture,
          },
        }
  
        window.localStorage.setItem('googleCypress', JSON.stringify(userItem))
        cy.visit('/')
      })
    })
  })*/

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
