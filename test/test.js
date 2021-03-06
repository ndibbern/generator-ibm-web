/*
 © Copyright IBM Corp. 2018
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 http://www.apache.org/licenses/LICENSE-2.0
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

"use strict";

let helpers = require('yeoman-test');
let assert = require('yeoman-assert');
let path = require('path');
let fs = require('fs-extra');
const defaultNodeVersion = '^8.11.0';

let bluemixSettings = {
	name: "MyTest",
	backendPlatform: "SWIFT",
	"cloudant": [
		{
			"password": "pass",
			"url": "https://account.cloudant.com",
			"username": "user"
		}
	],
	"objectStorage": [
		{
			"password": "Gl.=W23@",
			"projectId": "12345",
			"region": "dallas",
			"userId": "abc1234"
		}
	]
};

let requiredFilesForBasic = [
	'public/index.html',
	'public/404.html',
	'public/500.html'
];

let requiredFilesForAngular = [
	'client/app.js',
	'client/component.html',
	'client/index.html',
	'public/404.html',
	'public/500.html',
	'client/default.css',
	'webpack.common.js',
	'webpack.dev-proxy.js',
	'webpack.dev-standalone.js',
	'webpack.prod.js',
];

let requiredFilesForReact = [
	'client/index.html',
	'client/app/App.jsx',
	'client/default.css',
	'client/index.jsx',
	'client/404.html',
	'client/500.html',
	'test/test-server.js',
	'Procfile-dev',
	'Procfile-debug',
	'webpack.common.js',
	'webpack.dev-proxy.js',
	'webpack.dev-standalone.js',
	'webpack.prod.js',
];

describe('Web project generator', function () {

	// NodeJS tests

	describe('Basic app with NodeJS', function () {

		beforeEach(function () {

			bluemixSettings.backendPlatform = "NODE";

			return helpers.run(path.join(__dirname, '../generators/app'))
				.inTmpDir()
				.withOptions({
					bluemix: JSON.stringify(bluemixSettings),
					framework: "None"
				});
		});

		it('contains web pages', function () {

			assert.file(requiredFilesForBasic);

		});

		it('starter text appears', function () {
			assert.fileContent('public/index.html', 'You are currently running a Node.js app built for the IBM Cloud')
		});

	});
	describe('Basic app with Python', function () {

		beforeEach(function () {

			bluemixSettings.backendPlatform = "PYTHON";

			return helpers.run(path.join(__dirname, '../generators/app'))
				.inTmpDir()
				.withOptions({
					bluemix: JSON.stringify(bluemixSettings),
					framework: "None"
				});
		});

		it('contains web pages', function () {

			assert.file(requiredFilesForBasic);

		});

		it('starter text appears', function () {
			assert.fileContent('public/index.html', 'You are currently running a Python app built for the IBM Cloud')
		});

	});
	describe('Basic app with Go', function () {

		beforeEach(function () {

			bluemixSettings.backendPlatform = "GO";

			return helpers.run(path.join(__dirname, '../generators/app'))
				.inTmpDir()
				.withOptions({
					bluemix: JSON.stringify(bluemixSettings),
					framework: "None"
				});
		});

		it('contains web pages', function () {

			assert.file(requiredFilesForBasic);

		});

		it('starter text appears', function () {
			assert.fileContent('public/index.html', 'You are currently running a Go app built for the IBM Cloud')
		});

	});

	describe('React app with NodeJS', function () {

		beforeEach(function () {

			bluemixSettings.backendPlatform = "NODE";

			return helpers.run(path.join(__dirname, '../generators/app'))
				.inTmpDir(function (dir) {
					fs.copySync(path.join(__dirname, 'resources/package.json'), path.join(dir, 'package.json'));
					fs.copySync(path.join(__dirname, 'resources/Dockerfile'), path.join(dir, 'Dockerfile'));
					fs.copySync(path.join(__dirname, 'resources/manifest.yml'), path.join(dir, 'manifest.yml'));
				})
				.withOptions({
					bluemix: JSON.stringify(bluemixSettings),
					framework: "React"
				});
		});

		it('required files created', function () {

			assert.file(requiredFilesForReact);

		});

		it('should have the correct run scripts to debug and dev', function() {
			assert.fileContent('package.json', '"dev": "nf --procfile Procfile-dev --port 3000 start"');
			assert.fileContent('package.json', '"debug": "nf --procfile Procfile-debug --port 3000 start"');
		});

		it('contains original dependencies', function () {

			assert.fileContent('package.json', 'appmetrics-dash');
			assert.fileContent('package.json', 'express');

		});

		it('contains Webpack', function () {

			assert.fileContent('package.json', 'webpack');
			assert.fileContent('package.json', 'babel');

		});

		it(`should use ${defaultNodeVersion} for engine node version`, function() {
			assert.jsonFileContent('package.json', {engines: {node : defaultNodeVersion}});
		});

		it('contains React', function () {
			assert.fileContent('package.json', 'react');
			assert.fileContent('package.json', 'react-dom');
			assert.fileContent('package.json', 'babel-preset-react');
		});

	});
	describe('React app with NodeJS', function () {

		beforeEach(function () {

			bluemixSettings.backendPlatform = "NODE";

			return helpers.run(path.join(__dirname, '../generators/app'))
				.inTmpDir(function (dir) {
					fs.copySync(path.join(__dirname, 'resources/package.json'), path.join(dir, 'package.json'));
					fs.copySync(path.join(__dirname, 'resources/Dockerfile'), path.join(dir, 'Dockerfile'));
					fs.copySync(path.join(__dirname, 'resources/manifest.yml'), path.join(dir, 'manifest.yml'));
				})
				.withOptions({
					bluemix: JSON.stringify(bluemixSettings),
					framework: "React"
				});
		});

		it('required files created', function () {

			assert.file(requiredFilesForReact);

		});

		it('should have the correct run scripts to debug and dev', function() {
			assert.fileContent('package.json', '"dev": "nf --procfile Procfile-dev --port 3000 start"');
			assert.fileContent('package.json', '"debug": "nf --procfile Procfile-debug --port 3000 start"');
		});

		it('contains original dependencies', function () {

			assert.fileContent('package.json', 'appmetrics-dash');
			assert.fileContent('package.json', 'express');

		});

		it('contains Webpack', function () {

			assert.fileContent('package.json', 'webpack');
			assert.fileContent('package.json', 'babel');

		});

		it(`should use ${defaultNodeVersion} for engine node version`, function() {
			assert.jsonFileContent('package.json', {engines: {node : defaultNodeVersion}});
		});

		it('contains React', function () {
			assert.fileContent('package.json', 'react');
			assert.fileContent('package.json', 'react-dom');
			assert.fileContent('package.json', 'babel-preset-react');
		});

	});
	describe('React app with NodeJS using a defined node version', function () {

		const expectedNodeVersion = '8.0.0';
		beforeEach(function () {
			bluemixSettings.backendPlatform = "NODE";

			return helpers.run(path.join(__dirname, '../generators/app'))
				.inTmpDir(function (dir) {
					fs.copySync(path.join(__dirname, 'resources/Dockerfile'), path.join(dir, 'Dockerfile'));
					fs.copySync(path.join(__dirname, 'resources/manifest.yml'), path.join(dir, 'manifest.yml'));
				})
				.withOptions({
					bluemix: JSON.stringify(bluemixSettings),
					framework: "React",
					nodeVersion: expectedNodeVersion
				});
		});

		it('required files created', function () {

			assert.file(requiredFilesForReact);

		});

		it('contains Webpack', function () {

			assert.fileContent('package.json', 'webpack');
			assert.fileContent('package.json', 'babel');

		});

		it('contains React', function () {
			assert.fileContent('package.json', 'react');
			assert.fileContent('package.json', 'react-dom');
			assert.fileContent('package.json', 'babel-preset-react');
		});
	});

	describe('AngularJS app with NodeJS using a defined node version and present existing files ', function () {
		const expectedNodeVersion = '8.0.0';
		beforeEach(function () {

			bluemixSettings.backendPlatform = "NODE";

			return helpers.run(path.join(__dirname, '../generators/app'))
				.inTmpDir(function (dir) {
					fs.copySync(path.join(__dirname, 'resources/Dockerfile'), path.join(dir, 'Dockerfile'));
					fs.copySync(path.join(__dirname, 'resources/manifest.yml'), path.join(dir, 'manifest.yml'));
				})
				.withOptions({
					bluemix: JSON.stringify(bluemixSettings),
					framework: "AngularJS",
					nodeVersion: expectedNodeVersion
				});
		});


		it('required files created', function () {
			assert.file(requiredFilesForAngular);
		});

		it('should have specific build script', function() {
			assert.fileContent('package.json', 'webpack --progress --config webpack.prod.js');
		});

		it('should have correct node scripts under dev and debug', function() {
			assert.fileContent('package.json', '"dev": "npm-run-all --parallel client-reload-proxy server-reload"');
			assert.fileContent('package.json', '"debug": "npm-run-all --parallel client-reload-proxy inspector"');
		});

		it('should have original scripts and dependencies', function() {
			assert.fileContent('package.json', 'mocha');
			assert.fileContent('package.json', 'node --inspect=0.0.0.0:9229 server/server.js');
		});
	});
	describe('AngularJS app with NodeJS and present existing files ', function () {
		beforeEach(function () {

			bluemixSettings.backendPlatform = "NODE";

			return helpers.run(path.join(__dirname, '../generators/app'))
				.inTmpDir(function (dir) {
					fs.copySync(path.join(__dirname, 'resources/package.json'), path.join(dir, 'package.json'));
					fs.copySync(path.join(__dirname, 'resources/Dockerfile'), path.join(dir, 'Dockerfile'));
					fs.copySync(path.join(__dirname, 'resources/manifest.yml'), path.join(dir, 'manifest.yml'));
				})
				.withOptions({
					bluemix: JSON.stringify(bluemixSettings),
					framework: "AngularJS",
				});
		});

		it('required files created', function () {
			assert.file(requiredFilesForAngular);
		});

		it('contains original dependencies', function () {

			assert.fileContent('package.json', 'appmetrics-dash');
			assert.fileContent('package.json', 'express');

		});

		it('should have react specific build script', function() {
			assert.fileContent('package.json', 'webpack --progress --config webpack.prod.js');
		})

		it('should have correct node scripts under dev and debug', function() {
			assert.fileContent('package.json', '"dev": "npm-run-all --parallel client-reload-proxy server-reload"');
			assert.fileContent('package.json', '"debug": "npm-run-all --parallel client-reload-proxy inspector"');
		});

		it(`should use ${defaultNodeVersion} for engine node version`, function() {
			assert.jsonFileContent('package.json', {engines: {node : defaultNodeVersion}});
		});
		it('should have original scripts and dependencies', function() {
			assert.fileContent('package.json', 'mocha');
			assert.fileContent('package.json', 'node --inspect=0.0.0.0:9229 server/server.js');
			assert.fileContent('package.json', 'sample-app');
			assert.jsonFileContent('package.json', {engines: {node : defaultNodeVersion}});
		});
	});

	describe('AngularJS app with NodeJS with empty user directory', function () {
		beforeEach(function () {

			bluemixSettings.backendPlatform = "NODE";

			return helpers.run(path.join(__dirname, '../generators/app'))
				.withOptions({
					bluemix: JSON.stringify(bluemixSettings),
					framework: "AngularJS"
				});
		});

		it('required files created', function () {
			assert.file(requiredFilesForAngular);
		});

		it('contains original dependencies', function () {

			assert.fileContent('package.json', 'appmetrics-dash');
			assert.fileContent('package.json', 'express');

		});

		it(`should use ${defaultNodeVersion} for engine node version`, function() {
			assert.fileContent('package.json', 'MyTest');
			assert.jsonFileContent('package.json', {engines: {node : defaultNodeVersion}});
		});

		it('should not have Dockerfile', function () {
			assert.noFile('Dockerfile')
		});

		it('should not have manifest.yml', function () {
			assert.noFile('manifest.yml');
		});

		it('should have react specific build script', function() {
			assert.fileContent('package.json', 'webpack --progress --config webpack.prod.js');
		});

		it('should have correct node scripts under dev and debug', function() {
			assert.fileContent('package.json', '"dev": "npm-run-all --parallel client-reload-proxy server-reload"');
			assert.fileContent('package.json', '"debug": "npm-run-all --parallel client-reload-proxy inspector"');
		});

		it('should have original scripts and dependencies', function() {
			assert.fileContent('package.json', 'mocha');
			assert.fileContent('package.json', 'node --inspect=0.0.0.0:9229 server/server.js');
		})
	});
});
