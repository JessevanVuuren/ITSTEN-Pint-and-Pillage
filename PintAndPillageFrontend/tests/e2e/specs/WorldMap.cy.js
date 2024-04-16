
beforeEach(() => {
  cy.login();
});

describe("World map actions", () => {
  it("should open map when clicked on map icon", () => { // 19
    cy.get("button[class='mapButton']").click()

    cy.wait(3000)

    cy.url().should("include", "/world")
    cy.get("img[id='worldMapVillage']").should("exist")
  })

  it("should be able to see village when on world map and clicked om village", () => { // 20 // 24
    Cypress.on('uncaught:exception', () => { return false })

    cy.get("button[class='mapButton']").click()
    
    cy.wait(3000)

    cy.get("img[id='worldMapVillage']").first().click({force:true})

    cy.get("div[class='innerModalBox']").should("exist")
    cy.get("h3[id='villageFramePlayer']").contains("Player: Derp").should("exist")
    cy.get("h3[id='villageFramePoints']").contains("Points: 430").should("exist")
  })

  it("should be able to toggle settle places when pushed on button", () => { // 21
    cy.get("button[class='mapButton']").click()
    
    cy.wait(3000)

    cy.get("div[class='worldMapSettingsButtonContainer worldMapSettingsModal']").click()

    cy.get("img[class='tileWorldMap SettleableTile']").should("exist")
  })

  it("should be able to attack a village when input ship and men", () => { // 25    
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