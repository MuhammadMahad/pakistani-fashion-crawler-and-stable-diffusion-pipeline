// For more information, see https://crawlee.dev/
import { Actor } from "apify";
import { Dataset, PlaywrightCrawler } from "crawlee";
import { Page } from "playwright";

await Actor.init();

const exclusions = {
  sanaSafinaz: [
    "https://www.sanasafinaz.com/pk/kids*",
    "https://www.sanasafinaz.com/pk/fragrances*",
  ],
  mariaB: [
    "https://www.mariab.pk/collections/perfumes*",
    "https://www.mariab.pk/collections/mommy-me*",
    "https://www.mariab.pk/pages/kids*",
    "https://www.mariab.pk/collections/kids*",
    "https://www.mariab.pk/collections/view-all-kids*",
    "https://www.mariab.pk/collections/baba-me*",
    "https://www.mariab.pk/collections/kidswear*",
    "https://www.mariab.pk/collections/new-arrivals-kids*",
  ],
  gulAhmed: [
    "https://www.gulahmedshop.com/sale/kids*",
    "https://www.gulahmedshop.com/sale/fragrances*",
    "https://www.gulahmedshop.com/salt-western-wear/kids/*",
    "https://www.gulahmedshop.com/kids/*",
    "https://www.gulahmedshop.com/fragrances-perfumes/*",
    "https://www.gulahmedshop.com/fragrances-perfumes*",
  ],
};

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
    // remove ids such as SS23BSP214F from description
    try {
      const paragraphs = page.locator("[itemprop='description'] p");

      const texts = await paragraphs.allTextContents();

      const originalDescription = texts.join(" ");

      const description = originalDescription.replace(/Not Included/gi, "");

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
  "mariab.pk": async (page: Page) => {
    // things to improve:
    // Remove ids such as SF-W24-18 from description
    try {
      const description = (
        await page.locator("h1, p.gygygy").allTextContents()
      ).join("");

      const imageHandles = await page.$$(".product__thumb img");
      const imageUrls = [];

      for (const imageHandle of imageHandles) {
        const srcset = await imageHandle.getAttribute("srcset");
        if (srcset) {
          // Split the srcset string into individual image descriptors
          const sources = srcset.split(",").map((src) => {
            const [url, descriptor] = src.trim().split(" ");
            return { url, descriptor };
          });
          // Sort sources by descriptor to get the highest resolution
          sources.sort((a, b) => {
            const aRes = parseInt(a.descriptor, 10);
            const bRes = parseInt(b.descriptor, 10);
            return bRes - aRes;
          });
          // Take the highest resolution image
          let src = sources[0].url;
          if (src.startsWith("//")) {
            src = "https:" + src;
          }
          imageUrls.push(src);
        } else {
          let src = await imageHandle.getAttribute("src");
          if (src) {
            if (src.startsWith("//")) {
              src = "https:" + src;
            }
            imageUrls.push(src);
          }
        }
      }

      return { description, imageUrls };
    } catch (error) {
      return {};
    }
  },
  "gulahmedshop.com": async (page: Page) => {
    // things to improve:
    try {
      const startingDescription = await page.evaluate(() => {
        const baseElement = document.querySelector("span.base");
        const descriptionDivs = document.querySelectorAll(".description div");

        const baseText = baseElement ? baseElement.textContent?.trim() : "";
        const descriptionTexts = Array.from(descriptionDivs)
          .map((div) => div.textContent)
          .join(" ");

        return `${baseText} ${descriptionTexts}`.trim();
      });

      // Extract additional attributes from the table, excluding the "Discount Percentage" row
      const additionalAttributes = await page.evaluate(() => {
        const rows = document.querySelectorAll(
          "table.data.table.additional-attributes tbody tr"
        );
        return Array.from(rows)
          .filter((row) => !row.textContent?.includes("Discount Percentage"))
          .map((row) => {
            const label = row.querySelector("th")?.textContent?.trim();
            const value = row.querySelector("td")?.textContent?.trim();
            return label && value ? `${label} ${value}` : null;
          })
          .filter((text) => text !== null)
          .join(", ");
      });

      // Combine the initial description with the additional attributes
      const description =
        `${startingDescription} ${additionalAttributes}`.trim();

      const imageUrls = await page.$$eval("a.mt-thumb-switcher", (anchors) =>
        anchors
          .map((anchor) => {
            const dataImage = anchor.getAttribute("data-image");
            return dataImage
              ? dataImage.startsWith("//")
                ? "https:" + dataImage
                : dataImage
              : null;
          })
          .filter((url) => url !== null)
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

      globs: [
        "https://pk.khaadi.com/*",
        "https://www.sanasafinaz.com/pk/*",
        "https://www.mariab.pk/*",
        "https://www.mariab.pk/pages/*",
        "https://www.mariab.pk/collections/*",
        "https://www.mariab.pk/products/*",
        "https://www.gulahmedshop.com/*",
      ],
      exclude: [
        ...exclusions.sanaSafinaz,
        ...exclusions.mariaB,
        ...exclusions.gulAhmed,
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
  //   "https://www.sanasafinaz.com/pk/",
  //   "https://www.mariab.pk/",
  "https://www.gulahmedshop.com/",
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
