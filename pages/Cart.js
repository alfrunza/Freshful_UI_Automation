const {By, until} = require('selenium-webdriver');
const config = require('../config/config.json');
const BasePage = require('./BasePage');

const HEADER = By.css('div[data-testid="header-desktop"]');
const ACCEPT_COOKIES = By.css('button[data-testid="cookies-banner-accept"]');
const HOMEPAGE_CART_ICON = By.css('button.CartButton_button__Os72R');

class Cart extends BasePage {
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

    async verifyCartButton() {
        const found = await this.isDisplayed(HOMEPAGE_CART_ICON, 5000);
        expect(found).toBeTruthy();
    }
}

module.exports = Cart;