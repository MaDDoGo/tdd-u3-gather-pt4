const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');
const Item = require('../../models/item');

describe('User visits the details page', () => {
    it('and is rendered', async () => {
        const itemToCreate = buildItemObject();
        
        browser.url('/items/create');
        browser.setValue('#title-input', itemToCreate.title);
        browser.setValue('#description-input', itemToCreate.description);
        browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
        browser.click('#submit-button');

        browser.click('.item-card a');

        assert.include(browser.getText('#item-description'), itemToCreate.description);
    });
});