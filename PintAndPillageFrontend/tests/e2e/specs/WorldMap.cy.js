
beforeEach(() => {
  cy.login();
});

describe("World map actions", () => {
  it("Should open map when clicked on map icon", () => { 
    cy.get("button[class='mapButton']").click()

    cy.wait(3000)

    cy.url().should("include", "/world")
    cy.get("img[id='worldMapVillage']").should("exist")
  })

  it("Should be able to see village when on world map and clicked om village", () => { 
    Cypress.on('uncaught:exception', () => { return false })

    cy.get("button[class='mapButton']").click()
    
    cy.wait(3000)

    cy.get("img[id='worldMapVillage']").first().click({force:true})

    cy.get("div[class='innerModalBox']").should("exist")
    cy.get("h3[id='villageFramePlayer']").contains("Player:").should("exist")
    cy.get("h3[id='villageFramePoints']").contains("Points:").should("exist")
  })

  it("Should be able to toggle settle places when pushed on button", () => { 
    cy.get("button[class='mapButton']").click()
    
    cy.wait(3000)

    cy.get("div[class='worldMapSettingsButtonContainer worldMapSettingsModal']").click()

    cy.get("img[class='tileWorldMap SettleableTile']").should("exist")
  })

  it("Should not be able to select 0 ships when 1 ship is required", () => {
    cy.get("button[class='mapButton']").click()

    cy.wait(3000)

    cy.get("img[id='worldMapVillage']").last().click({force:true})

    cy.get("button[class='pillageButton']").click()
    cy.get('.inputContainer input[type="number"]').as('numberInput');
    cy.get('@numberInput').type('0');
    cy.get("button[class='combatButton']").click()
    
    cy.get('h2').contains('Not enough carrying capacity').should('exist');
  })

  it("Should not be able to select 6 ships when 5 ships are available", () => {
    cy.get("button[class='mapButton']").click()

    cy.wait(3000)

    cy.get("img[id='worldMapVillage']").last().click({force:true})

    cy.get("button[class='pillageButton']").click()
    cy.get('.inputContainer input[type="number"]').as('numberInput');
    cy.get('@numberInput').type('6');
    cy.get("button[class='combatButton']").click()
    
    cy.get('.inputContainer input[type="number"]').as('numberInput');
    cy.get('@numberInput').type('1');
    cy.get("button[class='combatButton']").click()

    cy.get('div').contains('AxiosError: Request failed with status code 422').should('exist');
  })

  it("Should be able to attack a village when input ship and men", () => {
    cy.get("button[class='mapButton']").click()

    cy.wait(3000)

    cy.get("img[id='worldMapVillage']").last().click({force:true})

    cy.get("button[class='pillageButton']").click()
    cy.get('.inputContainer input[type="number"]').as('numberInput');
    cy.get('@numberInput').type('1');
    cy.get("button[class='combatButton']").click()
    
    cy.get('.inputContainer input[type="number"]').as('numberInput');
    cy.get('@numberInput').type('1');
    cy.get("button[class='combatButton']").click()

    cy.get('span').contains('Units Send!').should('exist');
  })
})