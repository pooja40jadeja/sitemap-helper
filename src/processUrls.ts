/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
import BottleNeck from "bottleneck";
import {getSitemapContent} from "./generateSitemap";
const fetch = require("node-fetch");
const xml2js = require("xml2js");
require("dotenv").config();

export const extractUrlsFromSitemap = async (
    sitemapFile: string
): Promise<string[]> => {
  const sitemapContent: string = await getSitemapContent(
      sitemapFile
  );
  const result: any = await xml2js.parseStringPromise(sitemapContent);
  const locArray: string[] = result?.urlset?.url.map((url: any) => url.loc[0]);
  return locArray;
};


const headers = new Headers({
  "User-Agent": "Sitemap-helper/1.0",
});

const limiter = new BottleNeck({
  maxConcurrent: 3,
  minTime: 40,
});

export const countSitemapResponses = async (
    urls: string[]
): Promise<any[]> => {
  const fetchWithRetry = async (
      url: string,
      options: RequestInit,
      retries: number = 1,
      timeout: number = 60000
  ): Promise<Response> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      if (!response.ok && retries > 0) {
        throw new Error(`Fetch error: ${response.statusText}`);
      }
      return response;
    } catch (error) {
      if (retries > 0) {
        return await fetchWithRetry(url, options, retries - 1, timeout);
      }
      throw error;
    } finally {
      clearTimeout(id);
    }
  };

  const arrayOfResponses: any[] = await Promise.all(
      urls.map((url) =>
          limiter
              .schedule(() =>
                  fetchWithRetry(new URL(url).toString(), {
                    method: "HEAD",
                    headers,
                    redirect: "follow",
                  }).then((res: Response) => ({ url: res.url, status: res.status }))
              )
              .catch((error: any) => {
                // eslint-disable-next-line no-console
                console.error(`Error fetching URL ${url}: ${error.message}`);
                return { url, status: 0 };
              })
      )
  );
  return arrayOfResponses;
};


