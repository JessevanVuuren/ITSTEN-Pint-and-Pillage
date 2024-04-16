// https://docs.cypress.io/api/table-of-contents

describe('Register logic with different login combinations', () => {
  it('Should register when creating account', () => {
    cy.visit('/register')
    cy.get("input[placeholder='Username']").type("myUserName")
    cy.get("input[placeholder='Email']").type("myUser" + Math.random() + "@gmail.com")
    cy.get("input[placeholder='Password']").type("mySuperPass12!")
    cy.get("input[placeholder='Repeat password']").type("mySuperPass12!")

    cy.get("button[class='submitButton']").click()
    cy.url().should("include", "/login")

  })

  it('Should not register when email address already in use', () => {
    cy.visit('/register')
    cy.get("input[placeholder='Username']").type("myUserName")
    cy.get("input[placeholder='Email']").type("test5@mail.com")
    cy.get("input[placeholder='Password']").type("mySuperPass12!")
    cy.get("input[placeholder='Repeat password']").type("mySuperPass12!")

    cy.get("button[class='submitButton']").click()
    cy.url().should("include", "/woeps")

  })

  it('Should give toast message when fields are left empty', () => {
    cy.visit('/register')
    
    cy.get("button[class='submitButton']").click()

    cy.get('span').contains('Username is required').should('exist');
    cy.get('span').contains('Email is required').should('exist');
    cy.get('span').contains('Password is required').should('exist');
    cy.get('span').contains('Password confirmation is required').should('exist');
  })

  it('Should give toast email is invalid when email is invalid', () => {
    cy.visit('/register')

    cy.get("input[placeholder='Username']").type("myUserName")
    cy.get("input[placeholder='Email']").type("testmail.com")
    cy.get("input[placeholder='Password']").type("mySuperPass12!")
    cy.get("input[placeholder='Repeat password']").type("mySuperPass12!")
    
    cy.get("button[class='submitButton']").click()

    cy.get('span').contains('Email is invalid').should('exist');
  })

  it('Should give toast passwords dont match when password dont match', () => {
    cy.visit('/register')

    cy.get("input[placeholder='Username']").type("myUserName")
    cy.get("input[placeholder='Email']").type("test@mail.com")
    cy.get("input[placeholder='Password']").type("mySuperPass12!")
    cy.get("input[placeholder='Repeat password']").type("!21ssaPrepuSym")
    
    cy.get("button[class='submitButton']").click()

    cy.get('span').contains('The passwords don\'t match').should('exist');
  })
})
