export class Map{
    getProviderLink(name){
        return cy.get('a').contains(name)
    }
    getListOfProviders(){
        return cy.get('h4')
    }
    setRange(range){
        cy.get('div').contains('Range').parent().within(()=>{
            cy.get('input').eq(1).clear().type(range)
        })
    }
}