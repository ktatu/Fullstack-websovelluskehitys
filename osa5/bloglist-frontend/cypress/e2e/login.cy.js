describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        cy.visit('http://localhost:3000')
    })
  
    it('shows login form on landing page', function() {
        cy.contains("Please login")
    })
})