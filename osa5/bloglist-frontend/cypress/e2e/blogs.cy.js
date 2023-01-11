describe("Blog app", function() {

    const cypressUser = {
        username: "cypressUser",
        name: "cypressName",
        password: "cypressPassword"
    }

    const cypressBlog = {
        author: "Cypress",
        title: "All about Cypress",
        url: "https://example.com"
    }

    describe("When logged in", function() {
        beforeEach(function() {
            cy.request("POST", "http://localhost:3003/api/testing/reset")
            cy.request("POST", "http://localhost:3003/api/users", cypressUser)
            cy
                .request("POST", "http://localhost:3003/api/login", { username: cypressUser.username, password: cypressUser.password })
                .then((res) => {
                    localStorage.setItem("loggedUser", JSON.stringify(res.body))
                    cy.visit("http://localhost:3000")
                })

        })

        it("A blog can be created", function() {
            cy
                .contains("new blog")
                .click()

            cy
                .get("#url-input")
                .type(cypressBlog.url)

            cy
                .get("#author-input")
                .type(cypressBlog.author)

            cy
                .get("#title-input")
                .type(cypressBlog.title)

            cy
                .get("#blog-submit")
                .click()

            cy.contains(`${cypressBlog.title} by ${cypressBlog.author} added`)
            cy.contains(cypressBlog.author)
        })

        it("A blog can be deleted", function() {
            cy.createBlog(cypressBlog)
            cy.visit("http://localhost:3000")

            cy
                .get("#expandedViewButton")
                .click()

            cy
                .contains("delete")
                .click()

            cy.
                contains(cypressBlog.title)
                .should("not.exist")

        })

        /*
        it("A blog can be liked", function() {
            cy
                .get("#expandedViewButton")
                .click()

            cy
                .contains("like")
                .click()

            cy.contains("likes 1")
        })
        */
    })

})