# ember-powerbi
[![Build Status](https://img.shields.io/travis/Microsoft/PowerBI-Ember.svg?branch=dev)](https://travis-ci.org/Microsoft/PowerBI-Ember)
[![npm version](https://img.shields.io/npm/v/ember-powerbi.svg)](https://www.npmjs.com/package/ember-powerbi)
[![Total Downloads](https://img.shields.io/npm/dt/ember-powerbi.svg)](https://www.npmjs.com/package/ember-powerbi)
[![Monthly Downloads](https://img.shields.io/npm/dm/ember-powerbi.svg)](https://www.npmjs.com/package/ember-powerbi)
[![GitHub tag](https://img.shields.io/github/tag/microsoft/ember-powerbi.svg)](https://github.com/Microsoft/PowerBI-Ember/tags)

A set of EmberJS components to seemlessly embed Power BI components into web based applications.

## Contents

This addon provides components such as `{{powerbi-report}}` and `{{powerbi-component}}` as well as a service `powerbi` which wraps the core powerbi service from the [powerbi-client](https://github.com/Microsoft/PowerBI-JavaScript) package.

## Getting started

1. Run `ember install ember-powerbi` from ember application directory.

2. Fetch data to embed a visual from the server (embedUrl and accessToken) and make it available on controller scope.

  This would usually involve setting up Ember-Data with custom serializers and adapters or manually making requests using ajax through ember-network etc.
  
  See the dummy application for more information.
  
  If you need a sample server to test reports from your own Power BI workspace you can use the following:
  
  - C# Sample Server: [https://github.com/Azure-Samples/powerbi-dotnet-server-aspnet-web-api](https://github.com/Azure-Samples/powerbi-dotnet-server-aspnet-web-api)
  
  - Nodejs Sample Server: (COMING SOON)
  
3. Insert the component in your template where you want to embed the visual:

  ```
  {{powerbi-report embedUrl=embedConfiguration.embedUrl accessToken=embedConfiguration.accessToken reportId=embedConfiguration.id onEmbedded=(action 'onEmbedded') }}
  ```
  
## Other Notes

  Use the generic component to pass all properties as a single object.  This may be useful when the type of the embeded component changes dynamically:
  
  ```
  {{powerbi-component embedConfiguration onEmbedded=(action 'onEmbedded') class="powerbi-container"}}
  ```
  
  Note that because this is generic you must have a `type` property on the object to indicate what you're embedding.

  See the demo application for detailed usage which shows integration with controllers and how to setup the onEmbedded action. The embed action is necessary in order to get access to the embed instance within the parent controller which enables sending commands or registering event handlers.

## Running the dummy app:
### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).