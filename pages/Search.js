const {By, until, Actions, Key} = require('selenium-webdriver');
const BasePage = require("./BasePage");
const config = require("../config/config.json");

const HOMEPAGE = By.css('div[data-testid="homepage-slots"]');
const ACCEPT_COOKIES = By.css('button[data-testid="cookies-banner-accept"]');
const SEARCH_BOX = By.css('div[data-testid="header-desktop"] input');
const SEARCH_ERROR = By.css('div[data-testid="search-error"]');

class Search extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async load() {
        await this.visit('https://www.freshful.ro/');
        await this.driver.manage().window().maximize();

        const isPageLoaded = await this.isDisplayed(HOMEPAGE, 5000);
        if(!isPageLoaded) {
            throw new Error('Page didn\'t load after 5 seconds');
        }

        await this.click(ACCEPT_COOKIES);
    }

    async verifySearchboxPresent() {
        const found = await this.isDisplayed(SEARCH_BOX, 5000);
        expect(found).toBeTruthy();
    }

    async searchForStrings() {
        const testData = Object.values(config.products);
        for(const element of testData) {
            await this.click(SEARCH_BOX);
            await this.driver.actions().keyDown(Key.CONTROL).sendKeys('a').keyUp(Key.CONTROL).perform();
            await this.type(SEARCH_BOX, element);
            await this.driver.actions().keyDown(Key.ENTER).keyUp(Key.ENTER).perform();
            try {
                await this.driver.wait(until.urlContains(element), 10000);
            } catch(error) {
                if(error.toString().includes('TimeoutError')) {
                    throw new Error('URL does not contain "' + element + '"');
                }
            }
            expect(await this.driver.getCurrentUrl()).toContain('/search');
        }
    }

    async searchForNumbers() {
        const testData = Object.values(config.titleNumbers);
        for(const element of testData) {
            await this.click(SEARCH_BOX);
            await this.driver.actions().keyDown(Key.CONTROL).sendKeys('a').keyUp(Key.CONTROL).perform();
            await this.type(SEARCH_BOX, element);
            await this.driver.actions().keyDown(Key.ENTER).keyUp(Key.ENTER).perform();
            try {
                await this.driver.wait(until.urlContains(element), 10000);
            } catch(error) {
                if(error.toString().includes('TimeoutError')) {
                    throw new Error('URL does not contain "' + element + '"');
                }
            }
            expect(await this.driver.getCurrentUrl()).toContain('/search');
        }
    }

    async searchForEmpty() {
        //Because there is no actual error displayed in this scenario, this test should only be taken as an example
        await this.click(SEARCH_BOX);
        await this.driver.actions().keyDown(Key.ENTER).keyUp(Key.ENTER).perform();
        let control = true;
        try {
            await this.find(SEARCH_ERROR);
        } catch(error) {
            if(error.toString().includes('NoSuchElement')) {
                control = false;
            }
        }
        expect(control).toBeTruthy();
    }

    // async recentSearch() {
    //     await this.click(SEARCH_BOX);
    //     await this.type(SEARCH_BOX, config.products.product1);
    //     await this.driver.actions().keyDown(Key.ENTER).keyUp(Key.ENTER).perform();
    //     await this.click(SEARCH_BOX);
    //
    // }
}

module.exports = Search;