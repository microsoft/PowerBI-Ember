# ember-powerbi
A set of EmberJS components to seemlessly embed Power BI components into web based applications

## Contents

This addon provides components such as `{{powerbi-report}}` and service `powerbi`.

## Getting started

1. Run `ember install ember-powerbi` from ember application directory.
2. Fetch data to embed a visual from the server (embedUrl and accessToken) and make it available on controller scope.

  This would usually involve setting up Ember-Data with custom serializers and adapters or manually making requests using ajax through ember-network etc.
  
  See the dummy application for more information. (Instructions below)
  
  If you need a sample server to test you can use the following:
  
  - C# Sample Server: (COMING SOON)
  
  - Nodejs Sample Server: (COMING SOON)
  
3. Insert the component in your template where you want to embed the visual:

  `{{powerbi-report embedUrl=report.embedUrl accessToken=report.accessToken}}`
  
## Other Notes

  Use the generic component to pass all properties as a single object.  This may be useful when the type of the embeded component changes dynamically:
  
  `{{powerbi-component report}}`

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