
beforeEach(() => {
  cy.login();
});


describe("building buildings and response to 500 http error", () => { 
  it("should open menu when clicked on a building tile", () => { // 3
    cy.get("div[class='clickableTile']").eq(4).click({force:true})

    cy.get("div[class='innerModalBox']").should("exist")
    cy.get("h1").contains("Building List").should("exist")

  })

  it("should be able to build a wall when clicked on tile 0,0", () => { // 10
    cy.get("div[class='clickableTile']").first().click({force:true})

    cy.get("h1").contains("Building List").should("exist")
    cy.get("h1").contains("Wall").should("exist")

  })

  it("should be able to build a harbor when clicked on a tile next to water", () => { // 10
    cy.get("div[class='clickableTile']").last().click({force:true})

    cy.get("h1").contains("Building List").should("exist")
    cy.get("h1").contains("Harbor").should("exist")
  })


  it("should be able to create house when clicked on building tile and click on building house", () => {
    
    cy.get("div[class='clickableTile']").eq(7).click({force:true})
    cy.get('.buildingList').contains('h1', 'House').parent('.buildingInformationContainer').siblings('button').click(); 

    cy.get("div[class='clickableTile']").eq(7).find("img[src*='/img/under_construction.74d7592c.png']").should("exist")

  })

  it("should display error screen when response is 500", () => {
    
    cy.intercept('POST', '/api/building/build', (req) => {
      req.reply({ statusCode: 500, body: {} });
    }).as('errorRoute');

    cy.get("div[class='clickableTile']").eq(9).click({force:true})
    cy.get('.buildingList').contains('h1', 'House').parent('.buildingInformationContainer').siblings('button').click(); 

    cy.wait('@errorRoute');

    cy.url().should("include", "/woeps")
    cy.get("h1").contains("Something went wrong!").should("exist")
  })
})



// 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 16, 17, 18, 26, 28, 29, 31, 