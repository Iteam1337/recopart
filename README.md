# recopart

##Pre-requisites

###Node
####Windows
Run the [msi](http://nodejs.org/dist/v0.12.2/x64/node-v0.12.2-x64.msi) or use [chokolatey](https://chocolatey.org/) to run ```choco install nodejs```
####OS X
Preferably use [homebrew](https://thechangelog.com/install-node-js-with-homebrew-on-os-x/)


```bash
npm install -g gulp
npm install -g cordova
npm install -g bower
```

##Setup

Clone the repo
```bash
git clone https://github.com/Iteam1337/recopart.git
```
Install dependencies
```bash
npm install
bower install
```
Build the project
```bash
gulp build
```
Run the app
```bash
cordova run ios
cordova run browser
```
##gulp tasks

###default
If you only type ```gulp```, a list of available commands are listed

###watch
You can add watch after any command, it will initiate a file watch which reruns the command.

###lint
This runs jshint against all js files. It checks for syntax and style errors. Settings for jshint are set in .jshintrc (this can also be used by VS for it's built in linting). The current settings are:

* **curly** forces use of {} for if:s, loop:s, while:s etc
* **eqeqeq** forces use of === instead of == (explicit equality check vs. equality check with auto cast)
* **latedef** checks that variables and functions are declared before being used. This flag is explicitly turned off since the John Papa style guide uses the implicit variable and function [hoisting](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting) for style reasons.
* **noarg** prohibits use of ```arguments.caller``` and ```arguments.callee``` for performance reasons
* **undef** prohibits use of undeclared (global) variables. Exceptions are declared in the globals section
* **eqnull** allows use of == null since null/undefined are essentially interchangeable
* **expr** checks that functions are not called as properties. This is disabled since chai (the assertions framework uses this style)
* **maxcomplexity** Sets a limit on the maximum allowed cyclomatic complexity in a function
* **browser** and **node** add globals present in browsers (window etc) and node (require etc). The latter is to accomodate the build scripts

###mocha
Runs mocha tests. If run with watch, the test output can be watched at http://localhost:1337

###karma
Runs tests using the Karma test runner using all browsers listed in build/config.json karmaBrowsers

###serve
Serves the site. Not yet correctly configured to run with the cordova setup

###build
Runs a series of sub tasks to generate a build
* **clean** deletes all generated files from the dist folder
* **html** runs the templating engine against src/index.html, mnifies the result and pipes it to the dist folder
* **less** runs the less precompiler and pipes the result to the dist folder
* **templatecache** takes all template html files and puts them inte the Angular templatecache so they are preloaded
* **concat** takes all needed javascript files (including bower dependencies and the generated template code) and concatenates them into a single file.
* **assets**  copies assets (currently only tmp files generated by other steps) to the dist folder