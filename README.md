# sitemap-helper

* Sitemap Helper checks that total number of urls are equal to or more than mininum required threshold.
* Also, it checks that the Response codes other than 200 (404, 301, 302) returned by each URL present within Sitemaps are within given threshold.
* The base URL can be defined as Environment variable or can be hardcoded as per the need.
* This application also supports sitemaps with multiple sitemap files. To do that, just replace `sitemapFiles` in `tests/checkNoOfUrls.ts`
 and `sitemapFileName` in `tests/validateSitemapResponseCodes.ts` with path of your sitemap files. Also, update the minimum required threshold per sitemap file in `tests/checkNoOfUrls.ts`.
* Currently, request rate is being controlled by https://www.npmjs.com/package/bottleneck as it allows to control maximum requests within given time in order to avoid sudden traffic on application.
* If your application is able to handle such traffic, then you can remove bottleneck from fetch declaration as it will speed up the test execution.


## Prerequisites

* Node - v20+
* npm

## Installation

1. Clone the repo
   ```shell
   git clone https://github.com/pooja40jadeja/sitemap-helper.git
   ```
2. Set the right Node version
   ```shell
   nvm use 20
   ```
3. Install NPM packages
   ```shell
   npm install
   ```
## Linting

To run lint: `$ npm run lint`

## Execution
To run tests: `$ npm run test`

## Reporting
Upon completion of test execution, an HTML report will be generated under `\out` folder. 
For failed test, it will also log the error there.
