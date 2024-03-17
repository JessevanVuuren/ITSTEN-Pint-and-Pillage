// https://docs.cypress.io/api/table-of-contents

describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('/register')
    cy.get("input[placeholder='Username']").type("myUserName")
    cy.get("input[placeholder='Email']").type("myUserr1@gmail.com")
    cy.get("input[placeholder='Password']").type("mySuperPass12!")
    cy.get("input[placeholder='Repeat password']").type("mySuperPass12!")

    cy.get("button[class='submitButton']").click()
    cy.url().should("include", "/login")

  })
})
