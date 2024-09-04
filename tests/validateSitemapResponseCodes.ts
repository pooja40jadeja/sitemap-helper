/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
import {countSitemapResponses, extractUrlsFromSitemap} from "../src/processUrls";

const lodash = require("lodash");

const sitemapFileName = {
  page: "page-sitemap1.xml",
  resource: "resource-sitemap1.xml",
  resourceType: "resource-type-sitemap1.xml",
};

const MAX_ALLOWED_NON200_PCT = Number(process.env.MAX_ALLOWED_NON200_PCT);

Object.keys(sitemapFileName).forEach(
  (sitemapType: keyof typeof sitemapFileName) => {
    describe(`Validate ${sitemapType} Response Codes`, () => {
      let sitemapUrls: string[];
      let responseArray: any[];
      let MAX_ALLOWED_NON200_URLS: number;

      it("Count Response Code and Occurrences", async () => {
        sitemapUrls = await extractUrlsFromSitemap(
          sitemapFileName[sitemapType]
        );
        MAX_ALLOWED_NON200_URLS = Math.round(
          (sitemapUrls.length * MAX_ALLOWED_NON200_PCT) / 100
        );
        responseArray = await countSitemapResponses(sitemapUrls);
        const elementOccurrences = lodash.countBy(responseArray, "status");
        // eslint-disable-next-line no-console
        console.log(sitemapType, elementOccurrences);
      });

      it(`${sitemapType} 404 Response Codes`, async () => {
        const urlsWith404 = responseArray
          .filter((item) => item.status === 404)
          .map((item) => item.url);
        if (urlsWith404.length > 0) {
          // eslint-disable-next-line no-console
          console.log(urlsWith404);
        }
        expect(urlsWith404.length).toBeLessThanOrEqual(MAX_ALLOWED_NON200_URLS);
      });

      it(`${sitemapType} 301 Response Codes`, async () => {
        const urlsWith301 = responseArray
          .filter((item) => item.status === 301)
          .map((item) => item.url);
        expect(urlsWith301.length).toBeLessThanOrEqual(MAX_ALLOWED_NON200_URLS);
      });

      it(`${sitemapType} 302 Response Codes`, async () => {
        const urlsWith302 = responseArray
          .filter((item) => item.status === 302)
          .map((item) => item.url);
        expect(urlsWith302.length).toBeLessThanOrEqual(MAX_ALLOWED_NON200_URLS);
      });
    });
  }
);
