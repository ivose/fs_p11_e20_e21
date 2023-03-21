const { version } = require('../../package.json')
describe('App', function () {
  it('version can be read', function () {
    cy.visit('http://localhost:5000/version')
    cy.contains(version)
  })
})