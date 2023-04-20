const {Builder, By} = require('selenium-webdriver');
const Search = require('../pages/Search');
const config = require('../config/config.json');

describe('Search Function', function() {
    jest.setTimeout(60 * 1000);
    let driver;
    let search;

    beforeEach(async () => {

        //Here we initialize the driver as well as a new search object
        driver = await new Builder().forBrowser('chrome').build();
        search = new Search(driver);

        //This function will load our page before every test in this project
        await search.load();
    })

    afterEach(async () => {

        //This will tear down the already running driver for the completed test
        await driver.quit();
    })

    test('TC01 - Verify that a searchbox is present on the site', async () => {
        await search.verifySearchboxPresent();
    })

    test('TC02 - Verify that products can be searched for using the searchbox', async () => {
        await search.searchForStrings();
    })

    test('TC03 - Verify the user can search for numbers', async () => {
        await search.searchForNumbers();
    })

    test('TC04 - Verify the user cannot search for an empty value', async () => {
        await search.searchForEmpty();
    })

    test.skip('TC05 - Verify recent searches show up in the searchbar', async () => {
        //Due to the JavaScript on the site, I cannot find the HTML element for the recent searches
        // await search.recentSearch();
    })
})