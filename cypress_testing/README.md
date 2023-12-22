# End-to-end/E2E testing with Cypress

### Here are steps on how you can get Cypress up and running
* CD into the cypress folder if you haven't already.
* In your terminal, type in `npi ci`. This will install the node_modules folder.
* Next, type in `npx cypress open`. This will open the Cypress app.
* Since I've only implemented E2E testing, click on that.
* Choose your web browser of choice. I'm using Chrome v114.
    * You will need to install a web broswer on your OS.
    * I believe Electron is there by default.
* Click on any of those and Cypress will handle the rest.
    * All test are automated by Cypress so you shouldn't need to do anything.
* Assuming you don't see a `503 Service Unavailable` from surge's servers. All the test should run okay. 
* Learn more about Cypress [here](https://www.cypress.io/)