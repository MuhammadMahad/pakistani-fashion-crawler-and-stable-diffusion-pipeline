// For more information, see https://crawlee.dev/
import { Actor } from "apify";
import { Dataset, PlaywrightCrawler } from "crawlee";
import { Page } from "playwright";

await Actor.init();

const globs = {
  khaadi: ["https://pk.khaadi.com/**"],
  sanaSafinaz: ["https://www.sanasafinaz.com/pk/**"],
  mariaB: [
    "https://www.mariab.pk/**",
    "https://www.mariab.pk/pages/**",
    "https://www.mariab.pk/collections/**",
    "https://www.mariab.pk/products/**",
  ],
  gulAhmed: ["https://www.gulahmedshop.com/**"],
  nishatlinen: [
    "https://nishatlinen.com/collections/**",
    "https://nishatlinen.com/collections/*/products/**",
  ],
  sapphire: ["https://pk.sapphireonline.pk/collections/*/products/**"],
};

const exclusions = {
  khaadi: ["https://pk.khaadi.com/fragrances*"],
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
  sapphire: [
    "https://pk.sapphireonline.pk/collections/new-in-kids**",
    "https://pk.sapphireonline.pk/collections/kids**",
    "https://pk.sapphireonline.pk/collections/new-in-fragrances**",
    "https://pk.sapphireonline.pk/collections/cosmetics**",
    "https://pk.sapphireonline.pk/collections/fragrances**",
    "https://pk.sapphireonline.pk/pages/shop-by-scent",
    "https://pk.sapphireonline.pk/pages/the-edit",
    "https://pk.sapphireonline.pk/collections/girls-eastern**",
    "https://pk.sapphireonline.pk/collections/girls-kurtas**",
    "https://pk.sapphireonline.pk/collections/girls-outfits**",
    "https://pk.sapphireonline.pk/collections/girls-fusion**",
    "https://pk.sapphireonline.pk/pages/mommy-and-me**",
    "https://pk.sapphireonline.pk/collections/boys-eastern**",
    "https://pk.sapphireonline.pk/collections/boys-kurta-shalwar**",
    "https://pk.sapphireonline.pk/collections/boys-waistcoats**",
    "https://pk.sapphireonline.pk/collections/boys-trousers**",
    "https://pk.sapphireonline.pk/collections/boys-bedding**",
    "https://pk.sapphireonline.pk/collections/girls-bedding**",
    "https://pk.sapphireonline.pk/collections/cot-sets**",
    "https://pk.sapphireonline.pk/collections/face**",
    "https://pk.sapphireonline.pk/collections/lips**",
    "https://pk.sapphireonline.pk/collections/eyes**",
    "https://pk.sapphireonline.pk/collections/nails**",
    "https://pk.sapphireonline.pk/collections/makeup-tools**",
    "https://pk.sapphireonline.pk/collections/fragrance-rose-collection**",
    "https://pk.sapphireonline.pk/collections/fragrance-discovery-sets**",
    "https://pk.sapphireonline.pk/collections/womens-perfumes**",
    "https://pk.sapphireonline.pk/collections/man-perfumes**",
    "https://pk.sapphireonline.pk/collections/womens-body-mists**",
    "https://pk.sapphireonline.pk/collections/men-s-body-mists**",
    "https://pk.sapphireonline.pk/collections/floral-fragrances**",
    "https://pk.sapphireonline.pk/collections/fruity-fragrances**",
    "https://pk.sapphireonline.pk/collections/oriental-fragrances**",
    "https://pk.sapphireonline.pk/collections/woody-fragrances**",
  ],
};

const extractors = {
  "pk.khaadi.com": async (page: Page) => {
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

      const imageUrls = await page.$$eval("a.mz-thumb", (anchors) =>
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
  "sanasafinaz.com": async (page: Page) => {
    // things to improve:
    // remove ids such as SS23BSP214F from description
    try {
      const paragraphs = page.locator("[itemprop='description'] p");

      const texts = await paragraphs.allTextContents();

      const originalDescription = texts.join(" ");

      const description = originalDescription.replace(/Not Included/gi, "");

      const imageUrls = await page.$$eval("a.mt-thumb-switcher", (anchors) =>
        anchors
          .map((anchor) => {
            const dataImage = anchor.getAttribute("data-image");
            return dataImage ? dataImage : null;
          })
          .filter((url) => url !== null)
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

      const imageUrlsWithPotentialDuplicates = await page.$$eval(
        "a.mt-thumb-switcher",
        (anchors) =>
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

      const imageUrls = [...new Set(imageUrlsWithPotentialDuplicates)];

      return { description, imageUrls };
    } catch (error) {
      return {};
    }
  },
  "nishatlinen.com": async (page: Page) => {
    // things to improve:
    try {
      // Retrieve the current page URL
      const currentURL = page.url();

      // Check if the URL contains the word 'products'
      if (!currentURL.includes("products")) {
        return {}; // Exit the function if 'products' is not in the URL
      }

      // Extract text from the 'h1' element
      const h1Text = await page.textContent("h1");

      // Extract text from all 'div' elements with the class 't4s-rte'
      const divTexts = await page.$$eval("div.t4s-rte", (divs) =>
        divs.map((div) => div.textContent?.trim()).join(" ")
      );

      // Combine the extracted texts into a single description
      const description = `${h1Text?.trim()} ${divTexts}`.trim();

      const imageUrls = await page.$$eval(
        ".t4s-carousel__nav-item img",
        (images) => {
          const urls = images.map((img) => {
            // Extract the highest-resolution URL from the srcset attribute
            const srcset =
              img.getAttribute("data-srcset") || img.getAttribute("srcset");
            if (srcset) {
              const srcsetUrls = srcset
                .split(",")
                .map((src) => src.trim().split(" ")[0]);
              return "https:" + srcsetUrls[srcsetUrls.length - 1]; // Get the last URL, which is usually the highest resolution
            }
            // Fallback to the src attribute if srcset is not available
            return img.getAttribute("src");
          });
          // Remove duplicates
          return [...new Set(urls)];
        }
      );

      return { description, imageUrls };
    } catch (error) {
      return {};
    }
  },
  "pk.sapphireonline.pk": async (page: Page) => {
    // things to improve:
    try {
      // Retrieve the current page URL
      const currentURL = page.url();

      // Check if the URL contains the word 'products'
      if (!currentURL.includes("products")) {
        return {}; // Exit the function if 'products' is not in the URL
      }

      const description = await page.evaluate(() => {
        const container = document.querySelector("#content1");
        if (!container) return ""; // Handle cases where the container is not found

        return container.innerHTML
          .split(/<br\s*\/?>/i) // Split by <br> tags
          .map((text) => text.replace(/<\/?[^>]+(>|$)/g, "").trim()) // Remove HTML tags and trim whitespace
          .filter((text) => text) // Remove empty strings
          .join("\n"); // Preserve line breaks
      });

      // Extract URLs of the highest-resolution images
      const imageUrls = await page.$$eval(
        "div[data-product-single-media-wrapper] img", // Select the image elements within the specified container
        (images) =>
          images
            .map(
              (img) => "https:" + img.getAttribute("data-master") // Extract the `data-master` attribute for the highest resolution image
            )
            .filter(Boolean) // Remove null/undefined values
      );
      //   console.log("description", description);
      //   console.log("imageUrls", imageUrls);

      return { description, imageUrls };
    } catch (error) {
      console.error(error);
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

    await enqueueLinks({
      strategy: "same-hostname",

      globs: [
        ...globs.khaadi,
        ...globs.sanaSafinaz,
        ...globs.mariaB,
        ...globs.gulAhmed,
        ...globs.nishatlinen,
        ...globs.sapphire,
      ],
      exclude: [
        ...exclusions.khaadi,
        ...exclusions.sanaSafinaz,
        ...exclusions.mariaB,
        ...exclusions.gulAhmed,
        ...exclusions.sapphire,
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
  //   "https://www.gulahmedshop.com/",
  //   "https://nishatlinen.com/",
  //   "https://pk.sapphireonline.pk/",

  "https://bareeze.com/",
  //   "https://www.junaidjamshed.com/",
  //   "https://asimjofa.com/",
  //   "https://www.alkaramstudio.com/",
];

// Add first URL to the queue and start the crawl.
await crawler.run(startUrls);

await Actor.exit();
