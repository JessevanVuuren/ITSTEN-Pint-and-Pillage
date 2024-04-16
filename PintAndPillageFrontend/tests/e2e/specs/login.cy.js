


describe("login logic with different login combinations", () => {
  const email = "myUser" + Math.floor((Math.random() * 100)) + "@gmail.com"
  const password = "Pass234supper!"

  it("Should login when used right credentials", () => {
    cy.visit("/login")

    cy.get("input[placeholder='Username']").type("test5@mail.com")
    cy.get("input[placeholder='Password']").type("Test123!")

    cy.get("button[class='submitButton']").click()
    cy.url().should("include", "/")
  })

  it("Should not login when used wrong credentials", () => {
    cy.visit("/login")

    cy.get("input[placeholder='Username']").type("test5@mail.com")
    cy.get("input[placeholder='Password']").type("JustAPass")

    cy.get("button[class='submitButton']").click()

    cy.get('span').contains('Something went wrong').should('exist');
  })

  it("Should not login when used wrong credentials", () => {
    cy.visit("/login")

    cy.get("button[class='submitButton']").click()

    cy.get('span').contains('Username is required').should('exist');
    cy.get('span').contains('Password is required').should('exist');
  })

  it("Should display help popup when logged in for the first time", () => { // 1

    cy.visit('/register')
    cy.get("input[placeholder='Username']").type("myUserName")
    cy.get("input[placeholder='Email']").type(email)
    cy.get("input[placeholder='Password']").type(password)
    cy.get("input[placeholder='Repeat password']").type(password)

    cy.get("button[class='submitButton']").click()
    cy.url().should("include", "/login")

    cy.get("input[placeholder='Username']").type(email)
    cy.get("input[placeholder='Password']").type(password)

    cy.get("button[class='submitButton']").click()

    cy.get("div[class='tutorialBaseModal']").should("exist")

  })

  it("Should not display help text when logged in for the second time", () => { // 2
    cy.visit('/login')

    cy.get("input[placeholder='Username']").type(email)
    cy.get("input[placeholder='Password']").type(password)

    cy.get("button[class='submitButton']").click()

    cy.get("div[class='tutorialBaseModal']").should("not.exist")

  })
})