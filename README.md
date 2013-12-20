
# protractor concurrency demo

	sudo npm install -g yo
	sudo npm install -g protractor
	sudo npm install -g grunt-cli
	sudo npm install -g bower

	mkdir protractor-demo
	cd protractor-demo

	npm install generator-angular

	yo angular # go ahead and "Y" everything
	# bower install

## protractor

	npm install protractor --save-dev
	npm install grunt-protractor-runner --save-dev


	cp -r ../protractor-demo-bak/test/scenario/ test/scenario
	

	grunt


### protractor config
after "karma" section

    protractor: {
      options: {
        //configFile: 'node_modules/protractor/referenceConf.js', // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        args: {
          baseUrl: 'http://'+getIpAddress()+':'+ '<%= connect.dist.options.port %>' //config for all protractor tasks
        }
      },
      feature1: {
        options: {
          configFile:'test/scenario/conf/featureList1.js', // Target-specific config file
        }
      },
      feature2: {
        options: {
          configFile:'test/scenario/conf/featureList2.js', // Target-specific config file
        }
      }
    }

at top

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




### Concurrent
in "concurrent" section

      protractor: [
        'protractor:feature1',
        'protractor:feature2'
      ],



update "connect.dist" to use port 9002 and ip 0.0.0.0

    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      ...
      dist: {
        options: {
          port: 9002,
          base: '<%= yeoman.dist %>'
        }
      }
      ...
    }

register task

	grunt.registerTask('ptr', [
		'clean:server',
		'build',
		'connect:dist',
		'concurrent:protractor'
	]);


