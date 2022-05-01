# Web QA Assignment (full setup with reports/test cases/bug reports)

## About The Project

Project has been created using automation framework TestCafe, written in Javascript.

### Built With

* []()TestCafe
* []()Javascript
* []()html-reporter

## Getting Started

In order to install TestCafe and run tests you need to do steps below.

### Prerequisites

1. In order to run the project first thing needed is Node.js
   ```sh
   https://nodejs.org/en/
   ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/wmiklasewicz/BB-Web-QA-assignment
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. To avoid restarting computer install TestCafe globally
   ```sh
   npm install testcafe -g
   ```
4. For some of windows users there is a need to add policy in powershell in order to run any scripts on machine
   ```sh
   1. Open powerShell console as an administrator
   2. Paste this code: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope LocalMachine

## Usage

Below there are examples of ways that tests could be started
1. Pre configured way to run all tests concurrently for 1 instance of chrome and 1 instance of firefox with html reporting
   ```sh
    testcafe .\tests\ 
   ```
2. Run specific test concurrently for 1 instance of chrome and 1 instance of frefox with html reporting
   ```sh
    testcafe .\tests\{testName}
    Example1: testcafe .\tests\crud-articles-operations.js --reporter html:automated-reports/test-report.html
   ```
3. Running tests without html reporting but with output directly in console
   ```sh
    testcafe .\tests\ -r spec
   ```
4. Manual override for browsers with console output, to return to html reports please remove "-r spec"
   ```sh
    testcafe chrome .\tests\ -r spec
   ```
5. Running specific test with browser override can be done in two ways
    ```sh
    testcafe chrome .\tests\{testName} -r spec
    Example: testcafe chrome .\tests\crud-articles-operations.js -r spec
     ```
6. Running tests using defined commands in package.json file
    ```sh
    Headless: npm run chrome:headless-tests-with-html-report
    Non-headless: npm run firefox-tests-with-html-report
     ```
7. Tests that are being run with default html reporter will store its reports in folder `automated-reports`

## Automated tests output
Please notice that some automated tests fails due to bugs. Bug reports can be find in `documents/bugs-reports` folder.
*NOTE: I assumed here that "Your Feed" tab should display articles created by user*
1. Test case 1 | BWQA-3: Create a new article -  failed, an article should be visible also on your feed tab
2. Test case 2 | BWQA-4: Read article -  failed, a user can access created article and read it, but we can't validate it on "Your Feed" tab due to Test case 1 output
3. Test case 3 | BWQA-8: Delete article - failed, a user can delete article, and article is not visible after that operation, but we can't validate it on "Your Feed" tab due to Test case 1 output
4. Test case 4 | BWQA-9: Update article - failed, a user can update articles and data are correctly refreshed, but we can't validate it on "Your Feed" tab due to Test case 1 output
5. Test case 5 | BWQA-12: Create empty article - failed, a user should not be able to create an empty article, there should be defined required fields


## Manual deliverables
### Built With

* []()JIRA
* []()XRAY
* []()Lighthouse

To create test cases and bugs reports I setup a Jira instance and integrated it with the Xray test management plugin, thanks to that I was able to easily create and manage test cases, test execution reports etc., 
1. Test cases - located in `documents/test-cases` folder, generated with the usage of Xray tool, a template has been modified by me to get all needed information
2. Manual test execution report - located in `documents/manual-report`, generated with the usage of Xray tool
3. Bug reports - located in `documents/bug-reports` generated from my test JIRA instance

## Approach and application evaluation
### Test management tool
I decided to create test documentation with usage of test JIRA instance and test management tool - XRAY/trial version fully setup by me.

Badly managed test cases are difficult to maintain, at the moment we have great tools on the QA market, which solve that issue, in addition, solutions integrated with JIRA bring transparency to the team about the QA process and everyone is aware how the application is tested.

### Automated tests approach and strategy
Automated project have been developed using 2 main approaches:
1. Page object pattern - this approach complies with DRY rule of programming, thanks to that we can create the project as a set of reusable components. This technique speeds up not only development itself (we have components we can reuse) but also greatly improve experience of future maintenance - update selectors in one place when something will change.

2. Data driven development - here we try to separate data layer from the code, this technique improves management of data within the test automation.

3. Generic functions - automated tests are growing, so important thing is create generic functions, which can be reusable e.g. function for adding tasks.

4. Screenshots - there's a function which allow to do a screenshot after desired step

5. Random data - test functions are designed to use randomly generated data, which brings some fuzzy testing and makes tests more robust

6. Config files
  - .env - contains data related to starting sites links as well as test users if applies
  - .testcaferc.json - config file for testCafe, you can define here everything related to timeouts, concurrency, browsers used and much more.
  - package.json - standard config defining packages that will be downladed after typing `npm i`

### Risks and Recommendations
- Application donsn't have implemented validations so it can lead to the messy content
- Application doesn't support mobile view for some screens
- Accessibility and security requirements can be improved, please check report in `documents/performence-accessibility`
- Application could provide more user-friendly features like articles search, page pagination in modern view etc.,
- Main actions could be more exposed to the user e.g. logout action should be visible on the main page for logged user

## Contact

Wioletta Mikłasewicz - https://www.linkedin.com/in/wioletta-kisielewicz