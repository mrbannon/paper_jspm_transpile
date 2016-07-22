# jspm_npm_test

Assume working directory in git repo is ```<DIRECTORY>```.

1) user@machine:```<DIRECTORY>```$ npm install

2) user@machine:```<DIRECTORY>```$ ./node_modules/.bin/jspm install -y

3) user@machine:```<DIRECTORY>```$ cp index.html web/; cp Application.js web/

4) user@machine:```<DIRECTORY>```$ ./node_modules/.bin/gulp

A web server is now serving this test app at your.ip.goes.here:9001. For the given settings in the package.json, everything should be fine if you open your.ip.goes.here:9001 in your browser.
Now, if you were to do the above only package.json pulled version 0.10.2, you should get an error for the JSDom dependency in your browser's console.

NOTE: If you did steps 1-4 and don't want to repull and do the steps again, just do the following:

5) user@machine:```<DIRECTORY>```$ ./node_modules/.bin/jspm uninstall paper

6) user@machine:```<DIRECTORY>```$ ./node_modules/.bin/jspm install npm:paper@0.10.2

7) user@machine:```<DIRECTORY>```$ ./node_modules/.bin/gulp
