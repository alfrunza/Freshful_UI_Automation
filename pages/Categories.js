const {By, until} = require('selenium-webdriver');
const BasePage = require('./BasePage');
const config = require('../config/config.json');

const HEADER = By.css('div[data-testid="header-desktop"]');
const ACCEPT_COOKIES = By.css('button[data-testid="cookies-banner-accept"]');
const CATEGORIES = By.css('div[aria-label="scrollable content"]');
const PRODUCTS_BUTTON = By.xpath('//*[@id="layout"]/header/div/div[2]/div/ul/li[1]/button/div');
const HOMEPAGE_CATEGORIES = By.css('.CategoriesDesktop_listItemWrapper__0q4no > a');

class Categories extends BasePage {
    constructor(driver) {
        super(driver);
    }

    async load() {
        await this.visit('https://www.freshful.ro/');
        await this.driver.manage().window().maximize();

        const isPageLoaded = await this.isDisplayed(HEADER, 5000);
        if(!isPageLoaded) {
            throw new Error('The page was not loaded after 5 seconds');
        }

        await this.click(ACCEPT_COOKIES);
    }

    async verifyProductsButton() {
        const found = await this.isDisplayed(PRODUCTS_BUTTON, 5000);
        expect(found).toBeTruthy();
    }

    async verifyCategoriesPresent() {
        const found = await this.isDisplayed(CATEGORIES, 5000);
        expect(found).toBeTruthy();
    }

    async verifyCategoryLinks() {
        const links = Object.values(config.categoryLinks);
        const buttons = await this.findAll(HOMEPAGE_CATEGORIES);
        let helper;
        expect(buttons.length).toBe(16);
        for(let i = 0; i < links.length; i++) {
            await this.driver.wait(until.elementIsVisible(buttons[i]), 5000);
            await this.click(buttons[i]);
            await this.driver.sleep(2000);
            expect(await this.driver.getCurrentUrl()).toBe(links[i]);
        }
    }
}

module.exports = Categories;