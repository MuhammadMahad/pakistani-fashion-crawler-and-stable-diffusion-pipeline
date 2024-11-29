// For more information, see https://crawlee.dev/
import { Actor } from "apify";
import { Dataset, PlaywrightCrawler } from "crawlee";
import { Page } from "playwright";

await Actor.init();

const extractors = {
  "pk.khaadi.com": async (page: Page) => {
    // things to improve:
    // doesn't get all images because some images only appear only click a button to scroll down through the images
    try {
      // Additional extraction logic
      // Wait for the main content to load
      // await page.waitForSelector(".details-pdp");

      // Extract text from the specified selectors
      const brand = await page.$eval(".details-pdp > div.product-brand", (el) =>
        el.textContent?.trim()
      );
      const productName = await page.$eval("h2.product-name", (el) =>
        el.textContent?.trim()
      );
      const specifications = await page.$$eval(".spec-list span", (els) =>
        els.map((el) => el.textContent?.trim()).join(", ")
      );

      // Concatenate all extracted text into a single description
      const description = `${brand} ${productName} ${specifications}`;

      // Extract image URLs from the first selector
      const currentImageUrls = await page.$$eval(
        ".slick-current .mz-figure img[data-url]",
        (imgs) => imgs.map((img) => img.getAttribute("data-url"))
      );

      // Extract image URLs from the second selector
      const slideImageUrls = await page.$$eval(
        "div.slick-slide:nth-of-type(n+2) img[itemprop='image']",
        (imgs) => imgs.map((img) => img.getAttribute("src"))
      );

      // Combine and filter out any null values
      const imageUrls = [...currentImageUrls, ...slideImageUrls].filter(
        (url) => url !== null && !url.includes("Khaadi-logo--new-with-mark")
      );

      return { description, imageUrls };
    } catch (error) {
      return {};
    }
  },
  "sanasafinaz.com": async (page: Page) => {
    // things to improve:
    // images are too small
    try {
      const paragraphs = page.locator("[itemprop='description'] p");

      const texts = await paragraphs.allTextContents();

      const description = texts.join(" ");

      // Create a locator for the target images
      const images = page.locator(".mt-thumb-switcher img");

      // Retrieve the src attributes of all matching images
      const imageUrls = await images.evaluateAll((imgElements) =>
        imgElements.map((img) => (img as HTMLImageElement).src)
      );

      return { description, imageUrls };
    } catch (error) {
      return {};
    }
  },

  // Define extractors for other domains
};

// PlaywrightCrawler crawls the web using a headless
// browser controlled by the Playwright library.
const crawler = new PlaywrightCrawler({
  // Use the requestHandler to process each of the crawled pages.
  async requestHandler({ request, page, enqueueLinks, log }) {
    const title = await page.title();
    log.info(`Title of ${request.loadedUrl} is '${title}'`);

    const { hostname } = new URL(request.url);
    const domain = hostname.replace("www.", "");

    const extractor = extractors[domain as keyof typeof extractors];

    // Save results as JSON to ./storage/datasets/default
    // await pushData({ title, url: request.loadedUrl });
    if (extractor) {
      const data = await extractor(page);
      if (data.description && data.imageUrls.length) {
        await Dataset.pushData({
          domain: domain,
          url: request.url,
          ...data,
        });
        console.log("data", data);
      }
    } else {
      log.warning(`No extractor defined for domain: ${domain}`);
    }

    // Extract links from the current page
    // and add them to the crawling queue.
    // await enqueueLinks();

    // Enqueue links to follow
    // await enqueueLinks({
    //   // Adjust the selector to target specific links
    //   selector: "a",
    //   // Optionally, specify patterns to include or exclude certain links
    //     globs: [
    //       "https://sanasafinaz.com/**",
    //       "https://pk.khaadi.com/**",
    //       "https://www.mariab.pk/**",
    //       "https://www.gulahmedshop.com/**",
    //       "https://nishatlinen.com/**",
    //       "https://pk.sapphireonline.pk/**",
    //       "https://bareeze.com/**",
    //       "https://www.junaidjamshed.com/**",
    //       "https://asimjofa.com/**",
    //       "https://www.alkaramstudio.com/**" /* add more patterns as needed */,
    //     ],
    // });
    await enqueueLinks({
      strategy: "same-hostname",

      globs: ["https://pk.khaadi.com/*", "https://www.sanasafinaz.com/pk/*"],
      exclude: [
        "https://www.sanasafinaz.com/pk/kids*",
        "https://www.sanasafinaz.com/pk/fragrances*",
      ],
      //   transformRequestFunction: (request) => {
      //     console.log(`Enqueuing URL: ${request.url}`);
      //     return request;
      // },
    });
  },
  // Comment this option to scrape the full website.
  //   maxRequestsPerCrawl: 20,
  // Uncomment this option to see the browser window.
  //   headless: false,
});

// List of initial URLs to crawl
const startUrls = [
  //   "https://pk.khaadi.com/",
  "https://www.sanasafinaz.com/pk/",
  //   "https://www.mariab.pk/",
  //   "https://www.gulahmedshop.com/",
  //   "https://nishatlinen.com/",
  //   "https://pk.sapphireonline.pk/",
  //   "https://bareeze.com/",
  //   "https://www.junaidjamshed.com/",
  //   "https://asimjofa.com/",
  //   "https://www.alkaramstudio.com/",
];

// Add first URL to the queue and start the crawl.
await crawler.run(startUrls);

await Actor.exit();
