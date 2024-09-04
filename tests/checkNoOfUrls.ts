import {getSitemapTotalUrls} from "../src/generateSitemap";

const sitemapFiles = {
  "page-sitemap1.xml": 100,
  "resource-sitemap1.xml": 100,
  "resource-type-sitemap1.xml": 1,
};

describe("Check No. of URLs", () => {
  test.each(Object.entries(sitemapFiles))(
    "Check %s",
    async (sitemapFile: any, minExpectedSitemapUrls) => {
      const noOfUrls: number = await getSitemapTotalUrls(
        sitemapFile,
        "url"
      );
      expect(noOfUrls).toBeGreaterThanOrEqual(minExpectedSitemapUrls);
    }
  );
});
