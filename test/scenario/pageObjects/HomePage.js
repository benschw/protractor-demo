var os = require('os');

function getIpAddress() {
    var ipAddress = null;
    var ifaces = os.networkInterfaces();

    function processDetails(details) {
        if (details.family === 'IPv4' && details.address !== '127.0.0.1' && !ipAddress) {
            ipAddress = details.address;
        }
    }

    for (var dev in ifaces) {
        ifaces[dev].forEach(processDetails);
    }
    return ipAddress;
}

var HomePage = function () {
};

HomePage.prototype = {
    navigate: function () {
        browser.get('http://' + getIpAddress() + ':9001/');
    },
    getList: function () {
        return element.all(by.repeater('thing in awesomeThings'));
    },
    header: function () {
        return element(by.css('h1'));
    },
    subHeader: function () {
        return element(by.css('h3'));
    }
};

exports.HomePage = HomePage;