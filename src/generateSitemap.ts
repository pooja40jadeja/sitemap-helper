/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-var-requires */
const fetch = require("node-fetch");
const { DOMParser } = require("xmldom");
require("dotenv").config();

const BASE_URL: string = process.env.BASE_URL;

export const getSitemapContent = async (
  sitemapFile: string
): Promise<string> => {
  const url = `${BASE_URL}${sitemapFile}`;
  const res = await fetch(url, {
    method: "GET",
    timeout: 60000,
  });
  return res.text();
};

export const getSitemapTotalUrls = async (
  sitemapFile: string,
  tagName: string
): Promise<number> => {
  const sitemapContent: string = await getSitemapContent(
    sitemapFile
  );
  const xmlDocSitemapFile: Document = new DOMParser().parseFromString(
      sitemapContent,
      "text/xml"
  );
  const urlElements: number =
      xmlDocSitemapFile.getElementsByTagName(tagName).length;
  return urlElements;
};
