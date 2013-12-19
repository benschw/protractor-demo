'use strict';

var HomePage = require('../pageObjects/HomePage.js').HomePage;

describe('homepage', function() {

    var homePage;
    beforeEach(function (){
        homePage = new HomePage();
        homePage.navigate();
    });

    it('should have a list of installed components', function() {

        var list = homePage.getList();

        expect(list.count()).toEqual(3);
        expect(list.get(0).getText()).toEqual('HTML5 Boilerplate');
        expect(list.get(1).getText()).toEqual('AngularJS');
        expect(list.get(2).getText()).toEqual('Karma');
    });

});
