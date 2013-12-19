'use strict';

var HomePage = require('../pageObjects/HomePage.js').HomePage;

describe('homepage', function() {

    var homePage;

    beforeEach(function (){
        homePage = new HomePage();
        homePage.navigate();
    });

    it('should have greeting', function() {
        var header = homePage.header();
        var subHeader = homePage.subHeader();

        expect(header.getText()).toEqual('\'Allo, \'Allo!');
        expect(subHeader.getText()).toEqual('Enjoy coding! - Yeoman');
    });

});