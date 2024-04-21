
beforeEach(() => {
  cy.login();
});


describe("testing graphical user interface elements", () => { 
  it("Should open battle log when clicked battle log button", () => { // 27
    cy.wait(1000)

    cy.get("button[class='combatButtonHeader']").click()


    cy.get("button[class='combatButtonHeader']").should("exist")
    cy.get("h1").contains("Combat Log").should("exist")
    cy.get("h3").contains("You didn't go in combat yet, what are you doing you lazy viking!").should("exist")
  })

  it("Should change seasons when user set seasons of in settings menu", () => { // 35
    cy.wait(1000)

    cy.get("button[class='settingsButton']").click()
    cy.get('.settingsButtonsList button').contains('Seasons:').click();


    cy.get('.settingsButtonsList button').contains('Seasons: off').should("exist");
  })
})


