const {Builder, By} = require('selenium-webdriver');
const config = require('../config/config.json');
const Categories = require('../pages/Categories');

describe('Categories', function() {
    jest.setTimeout(120 * 1000);
    let driver;
    let categories;

    beforeEach(async () => {
        driver = new Builder().forBrowser('chrome').build();
        categories = new Categories(driver);

        await categories.load();
    })

    afterEach(async () => {
        await this.driver.quit();
    })

    test('TC06 - Verify a Products Button is present on the homepage', async () => {
        await categories.verifyProductsButton();
    })

    test('TC07 - Verify product categories are present on the homepage', async () => {
        await categories.verifyCategoriesPresent();
    })

    test('TC08 - Verify clicking on a category redirects the user to the category page', async () => {
        await categories.verifyCategoryLinks();
    })

    test.skip('TC09 - Verify that categories in the Products Menu are displayed properly and without erorrs', async () => {
        //THIS NEEDS A HUMAN EYE
    })

    test.skip('TC10 - Verify that categories on the homepage are displayed properly and without errors', async () => {
        //THIS NEEDS A HUMAN EYE
    })

    test('TC11 - Verify that products from a category are displayed on that respective category page', async () => {
        //THIS NEEDS A HUMAN EYE
    })
})