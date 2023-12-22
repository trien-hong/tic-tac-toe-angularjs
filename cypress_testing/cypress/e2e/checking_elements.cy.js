describe('Checking elements', () => {
  beforeEach(() => {
    cy.visit('https://tic-tac-toe-game-th.surge.sh/')
  })

  it('title should contain \"Tic Tac Toe | AngularJS\"', () => {
    cy.title().should('eq', 'Tic Tac Toe | AngularJS')
  })

  describe('check top buttons', () => {
    it('should contain \"Dark Mode\" button', () => {
      cy.get('.left_buttons').contains('label', 'Dark Mode')
    })

    it('should contain \"Light Mode\" button', () => {
      cy.get('.left_buttons').contains('label', 'Light Mode')
    })

    it('should contain \"How To Play\" button', () => {
      cy.get('.right_buttons').contains('a', 'How To Play')
    })

    it('should contain \"GitHub Repository\" button', () => {
      cy.get('.right_buttons').contains('a', 'GitHub Repository')
    })
  })

  describe('check win/tie counter text', () => {
    it('should contain \"Player 1 (X):\" text', () => {
      cy.get('.player1_win_count').contains('Player 1 (X):')
    })

    it('should contain \"Tie:\" text', () => {
      cy.get('.tie_count').contains('Tie:')
    })

    it('should contain \"Player 2 (O)\" text', () => {
      cy.get('.player2_win_count').contains('Player 2 (O):')
    })

    it('ensure all default counter values are \"0\"', () => {
      cy.get('.player1_win_count').contains('0')
      cy.get('.tie_count').contains('0')
      cy.get('.player2_win_count').contains('0')
    })
  })

  describe('check if all 9 squares/buttons are there', () => {
    it('should contain the 9 squares/buttons', () => {
      cy.get('#square0')
      cy.get('#square1')
      cy.get('#square2')
      cy.get('#square3')
      cy.get('#square4')
      cy.get('#square5')
      cy.get('#square6')
      cy.get('#square7')
      cy.get('#square8')
    })

    it('ensure each square has a default value of \"*\"', () => {
      cy.get('#square0').contains('*')
      cy.get('#square1').contains('*')
      cy.get('#square2').contains('*')
      cy.get('#square3').contains('*')
      cy.get('#square4').contains('*')
      cy.get('#square5').contains('*')
      cy.get('#square6').contains('*')
      cy.get('#square7').contains('*')
      cy.get('#square8').contains('*')
    })
  })

  describe('check the bottom status', () => {
    it('ensure the default value is \"Current Player: 1 (X)\"', () => {
      cy.get('.status').contains('Current Player: 1 (X)')
    })
  })

  describe('Clicking the \"Light Mode\" button should change bg color', () => {
    it('background color should be lighter', () => {
      cy.get('.left_buttons').contains('label', 'Light Mode').click()
      cy.get('body').should('have.css', 'background-color').and('eq', 'rgb(246, 246, 246)')
    })
  })

  describe('Clicking the \"Dark Mode\" button should change bg color', () => {
    it('background color should be darker', () => {
      cy.get('.left_buttons').contains('label', 'Light Mode').click()
      cy.get('.left_buttons').contains('label', 'Dark Mode').click()
      cy.get('body').should('have.css', 'background-color').and('eq', 'rgb(138, 138, 138)')
    })
  })
})