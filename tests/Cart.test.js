const {By, Builder} = require('selenium-webdriver');
const Cart = require('../pages/Cart');
const config = require('../config/config.json');

describe('Shopping Cart', function() {
    jest.setTimeout(60 * 1000);
    let driver;
    let cart;

    beforeEach(async () => {
        driver = new Builder().forBrowser('chrome').build();
        cart = new Cart(driver);

        await cart.load();
    })

    afterEach(async () => {
        await this.driver.quit();
    })

    test('TC12 - Verify shopping cart icon is present and functional on the homepage', async () => {
        await cart.verifyCartButton();
    })
})