# jspm_npm_test

Assume working directory in git repo is ```<DIRECTORY>```.

1) user@machine:```<DIRECTORY>```$ npm install

2) user@machine:```<DIRECTORY>```$ ./node_modules/.bin/jspm install -y

3) user@machine:```<DIRECTORY>```$ ./node_modules/.bin/gulp

A web server is now serving this test app at your.ip.goes.here:9001. For the given settings in the package.json, everything should be fine if you open your.ip.goes.here:9001 in your browser. If you open your browser's console you should see a PaperScope object.

4) user@machine:```<DIRECTORY>```$ ./node_modules/.bin/gulp dist:server

First, gulp-jspm transpiles paper.js and Application.js into a bundle file and serves them on your.ip.goes.here:9001. (Wait until you see 'dist:server' before accessing the page.) If you open your browser's console this time you will see an error message: Uncaught Module 2 not present.

NOTE: If you did steps 1-4 and don't want to repull and do the steps again to test against paper.js 0.9.25, just do the following:

5) user@machine:```<DIRECTORY>```$ ./node_modules/.bin/jspm uninstall paper

6) user@machine:```<DIRECTORY>```$ ./node_modules/.bin/jspm install npm:paper@0.9.25

Now, rerun your gulp commands. With paper.js 0.9.25 there is no error in the transpile.
