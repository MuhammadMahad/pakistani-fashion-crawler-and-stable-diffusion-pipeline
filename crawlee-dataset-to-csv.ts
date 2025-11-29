// // For more information, see https://crawlee.dev/
// import { Actor } from "apify";
// import { CheerioCrawler, Dataset, PlaywrightCrawler } from "crawlee";
// import { Page } from "playwright";
// import { type CheerioRoot } from "@crawlee/utils";

// await Actor.init();

// const globs = {
//   khaadi: ["https://pk.khaadi.com/**"],
//   sanaSafinaz: ["https://www.sanasafinaz.com/pk/**"],
//   mariaB: [
//     "https://www.mariab.pk/**",
//     "https://www.mariab.pk/pages/**",
//     "https://www.mariab.pk/collections/**",
//     "https://www.mariab.pk/products/**",
//   ],
//   gulAhmed: ["https://www.gulahmedshop.com/**"],
//   nishatlinen: [
//     "https://nishatlinen.com/collections/**",
//     "https://nishatlinen.com/products/**",
//   ],
//   sapphire: ["https://pk.sapphireonline.pk/collections/*/products/**"],
//   bareeze: ["https://bareeze.com/**"],
//   junaidJamshed: ["https://www.junaidjamshed.com/**"],
//   asimJofa: [
//     "https://asimjofa.com/collections/**",
//     "https://asimjofa.com/products/**",
//   ],
//   alkaramStudio: [
//     "https://www.alkaramstudio.com/collections/**",
//     "https://www.alkaramstudio.com/products/**",
//   ],
// };

// const exclusions = {
//   khaadi: [
//     "https://pk.khaadi.com/fragrances/**",

//     "https://pk.khaadi.com/sale/**",
//     "https://pk.khaadi.com/sale",
//   ],
//   sanaSafinaz: [
//     "https://www.sanasafinaz.com/pk/kids/**",
//     "https://www.sanasafinaz.com/pk/kids",
//     "https://www.sanasafinaz.com/pk/fragrances/**",
//     "https://www.sanasafinaz.com/pk/fragrances",
//     "https://www.sanasafinaz.com/pk/kids.html",
//     "https://www.sanasafinaz.com/pk/fragrances.html",
//     "https://www.sanasafinaz.com/pk/new-arrivals/kids.html",
//     "https://www.sanasafinaz.com/pk/new-arrivals/fragrances.html",
//     "https://www.sanasafinaz.com/pk/catalog/category/view/s/kids/id/718/",
//     "https://www.sanasafinaz.com/pk/accessories/footwear/kids.html",

//     "https://www.sanasafinaz.com/pk/sale",
//     "https://www.sanasafinaz.com/pk/sale/**",
//   ],
//   mariaB: [
//     "https://www.mariab.pk/collections/perfumes/**",
//     "https://www.mariab.pk/collections/perfumes",
//     "https://www.mariab.pk/collections/mommy-me/**",
//     "https://www.mariab.pk/collections/mommy-me",
//     "https://www.mariab.pk/pages/kids/**",
//     "https://www.mariab.pk/pages/kids",
//     "https://www.mariab.pk/collections/kids/**",
//     "https://www.mariab.pk/collections/kids",
//     "https://www.mariab.pk/collections/view-all-kids/**",
//     "https://www.mariab.pk/collections/view-all-kids",
//     "https://www.mariab.pk/collections/baba-me/**",
//     "https://www.mariab.pk/collections/baba-me",
//     "https://www.mariab.pk/collections/kidswear/**",
//     "https://www.mariab.pk/collections/kidswear",
//     "https://www.mariab.pk/collections/new-arrivals-kids/**",
//     "https://www.mariab.pk/collections/new-arrivals-kids",
//     "https://www.mariab.pk/collections/kids-sale",
//     "https://www.mariab.pk/collections/kids-sale/**",
//     "https://www.mariab.pk/pages/kids?utm_source=Slider&utm_campaign=Kids-Slider",

//     "https://www.mariab.pk/pages/sale-view-all",
//     "https://www.mariab.pk/collections/unstitched-sale",
//     "https://www.mariab.pk/collections/ready-to-wear-sale",
//     "https://www.mariab.pk/collections/sale-menswear",
//     "https://www.mariab.pk/collections/jewelry-sale",
//     "https://www.mariab.pk/collections/sale-mariab-accessories",
//   ],
//   gulAhmed: [
//     "https://www.gulahmedshop.com/sale/kids/**",
//     "https://www.gulahmedshop.com/sale/kids",
//     "https://www.gulahmedshop.com/sale/fragrances/**",
//     "https://www.gulahmedshop.com/sale/fragrances",
//     "https://www.gulahmedshop.com/salt-western-wear/kids/**",
//     "https://www.gulahmedshop.com/salt-western-wear/kids",
//     "https://www.gulahmedshop.com/kids/**",
//     "https://www.gulahmedshop.com/kids",
//     "https://www.gulahmedshop.com/fragrances-perfumes/**",
//     "https://www.gulahmedshop.com/fragrances-perfumes",
//     "https://www.gulahmedshop.com/sale/**",
//     "https://www.gulahmedshop.com/sale",
//   ],
//   sapphire: [
//     "https://pk.sapphireonline.pk/collections/new-in-kids/**",
//     "https://pk.sapphireonline.pk/collections/new-in-kids",
//     "https://pk.sapphireonline.pk/collections/kids/**",
//     "https://pk.sapphireonline.pk/collections/kids",
//     "https://pk.sapphireonline.pk/collections/new-in-fragrances/**",
//     "https://pk.sapphireonline.pk/collections/new-in-fragrances",
//     "https://pk.sapphireonline.pk/collections/cosmetics/**",
//     "https://pk.sapphireonline.pk/collections/cosmetics",
//     "https://pk.sapphireonline.pk/collections/fragrances/**",
//     "https://pk.sapphireonline.pk/collections/fragrances",
//     "https://pk.sapphireonline.pk/pages/shop-by-scent",
//     "https://pk.sapphireonline.pk/pages/the-edit",
//     "https://pk.sapphireonline.pk/collections/girls-eastern/**",
//     "https://pk.sapphireonline.pk/collections/girls-eastern",
//     "https://pk.sapphireonline.pk/collections/girls-kurtas/**",
//     "https://pk.sapphireonline.pk/collections/girls-kurtas",
//     "https://pk.sapphireonline.pk/collections/girls-outfits/**",
//     "https://pk.sapphireonline.pk/collections/girls-outfits",
//     "https://pk.sapphireonline.pk/collections/girls-fusion/**",
//     "https://pk.sapphireonline.pk/collections/girls-fusion",
//     "https://pk.sapphireonline.pk/pages/mommy-and-me/**",
//     "https://pk.sapphireonline.pk/pages/mommy-and-me",
//     "https://pk.sapphireonline.pk/collections/boys-eastern/**",
//     "https://pk.sapphireonline.pk/collections/boys-eastern",
//     "https://pk.sapphireonline.pk/collections/boys-kurta-shalwar/**",
//     "https://pk.sapphireonline.pk/collections/boys-kurta-shalwar",
//     "https://pk.sapphireonline.pk/collections/boys-waistcoats/**",
//     "https://pk.sapphireonline.pk/collections/boys-waistcoats",
//     "https://pk.sapphireonline.pk/collections/boys-trousers/**",
//     "https://pk.sapphireonline.pk/collections/boys-trousers",
//     "https://pk.sapphireonline.pk/collections/boys-bedding/**",
//     "https://pk.sapphireonline.pk/collections/boys-bedding",
//     "https://pk.sapphireonline.pk/collections/girls-bedding/**",
//     "https://pk.sapphireonline.pk/collections/girls-bedding",
//     "https://pk.sapphireonline.pk/collections/cot-sets/**",
//     "https://pk.sapphireonline.pk/collections/cot-sets",
//     "https://pk.sapphireonline.pk/collections/face/**",
//     "https://pk.sapphireonline.pk/collections/face",
//     "https://pk.sapphireonline.pk/collections/lips/**",
//     "https://pk.sapphireonline.pk/collections/lips",
//     "https://pk.sapphireonline.pk/collections/eyes/**",
//     "https://pk.sapphireonline.pk/collections/eyes",
//     "https://pk.sapphireonline.pk/collections/nails/**",
//     "https://pk.sapphireonline.pk/collections/nails",
//     "https://pk.sapphireonline.pk/collections/makeup-tools/**",
//     "https://pk.sapphireonline.pk/collections/makeup-tools",
//     "https://pk.sapphireonline.pk/collections/fragrance-rose-collection/**",
//     "https://pk.sapphireonline.pk/collections/fragrance-rose-collection",
//     "https://pk.sapphireonline.pk/collections/fragrance-discovery-sets/**",
//     "https://pk.sapphireonline.pk/collections/fragrance-discovery-sets",
//     "https://pk.sapphireonline.pk/collections/womens-perfumes/**",
//     "https://pk.sapphireonline.pk/collections/womens-perfumes",
//     "https://pk.sapphireonline.pk/collections/man-perfumes/**",
//     "https://pk.sapphireonline.pk/collections/man-perfumes",
//     "https://pk.sapphireonline.pk/collections/womens-body-mists/**",
//     "https://pk.sapphireonline.pk/collections/womens-body-mists",
//     "https://pk.sapphireonline.pk/collections/men-s-body-mists/**",
//     "https://pk.sapphireonline.pk/collections/men-s-body-mists",
//     "https://pk.sapphireonline.pk/collections/floral-fragrances/**",
//     "https://pk.sapphireonline.pk/collections/floral-fragrances",
//     "https://pk.sapphireonline.pk/collections/fruity-fragrances/**",
//     "https://pk.sapphireonline.pk/collections/fruity-fragrances",
//     "https://pk.sapphireonline.pk/collections/oriental-fragrances/**",
//     "https://pk.sapphireonline.pk/collections/oriental-fragrances",
//     "https://pk.sapphireonline.pk/collections/woody-fragrances/**",
//     "https://pk.sapphireonline.pk/collections/woody-fragrances",
//   ],
//   bareeze: ["https://bareeze.com/catalogue/bareeze-lookbook.pdf"],
//   junaidJamshed: [
//     "https://www.junaidjamshed.com/new-arrivals/boys-girls-winter-tales-24/**",
//     "https://www.junaidjamshed.com/womens/mama-me/**",
//     "https://www.junaidjamshed.com/boys-girls-collection/**",
//     "https://www.junaidjamshed.com/boys-girls/**",
//     "https://www.junaidjamshed.com/fragrances/**",
//     "https://www.junaidjamshed.com/makeup/**",
//     "https://www.junaidjamshed.com/skin-care/**",
//     "https://www.junaidjamshed.com/catalogue/**",
//     "https://www.junaidjamshed.com/sale/teen-girls/**",
//     "https://www.junaidjamshed.com/sale/kid-girls/**",
//     "https://www.junaidjamshed.com/vibe-tribe-24/**",
//     "https://www.junaidjamshed.com/new-arrivals/featured-collection/expression-series-all-ages-of-him.html",
//     "https://www.junaidjamshed.com/sale.html",
//     "https://www.junaidjamshed.com/sale/**",
//     "https://www.junaidjamshed.com/sale/women-unstitched.html",
//     "https://www.junaidjamshed.com/sale/women-pretwear.html",
//   ],
//   asimJofa: [
//     "https://asimjofa.com/collections/kids-pret/**",
//     "https://asimjofa.com/collections/kids-pret",
//     "https://asimjofa.com/collections/asim-jofa-kids-collection/**",
//     "https://asimjofa.com/collections/asim-jofa-kids-collection",
//     "https://asimjofa.com/collections/kids-unstitched/**",
//     "https://asimjofa.com/collections/kids-unstitched",
//     "https://asimjofa.com/collections/kids-ready-to-wear/**",
//     "https://asimjofa.com/collections/kids-ready-to-wear",
//   ],
//   alkaramStudio: [
//     "https://www.alkaramstudio.com/collections/sale-kids/**",
//     "https://www.alkaramstudio.com/collections/sale-kids",
//     "https://www.alkaramstudio.com/collections/sale-boys/**",
//     "https://www.alkaramstudio.com/collections/sale-boys",
//     "https://www.alkaramstudio.com/collections/sale-girls/**",
//     "https://www.alkaramstudio.com/collections/sale-girls",
//     "https://www.alkaramstudio.com/collections/new-in-kids/**",
//     "https://www.alkaramstudio.com/collections/new-in-kids",
//     "https://www.alkaramstudio.com/collections/new-in-boys/**",
//     "https://www.alkaramstudio.com/collections/new-in-boys",
//     "https://www.alkaramstudio.com/collections/new-in-girls/**",
//     "https://www.alkaramstudio.com/collections/new-in-girls",
//     "https://www.alkaramstudio.com/collections/beauty/**",
//     "https://www.alkaramstudio.com/collections/beauty",
//     "https://www.alkaramstudio.com/collections/maybelline/**",
//     "https://www.alkaramstudio.com/collections/maybelline",
//     "https://www.alkaramstudio.com/collections/fragrance/**",
//     "https://www.alkaramstudio.com/collections/fragrance",
//     "https://www.alkaramstudio.com/collections/nail-colors/**",
//     "https://www.alkaramstudio.com/collections/nail-colors",
//     "https://www.alkaramstudio.com/collections/mak-kids/**",
//     "https://www.alkaramstudio.com/collections/mak-kids",
//     "https://www.alkaramstudio.com/collections/mak-girl/**",
//     "https://www.alkaramstudio.com/collections/mak-girl",
//     "https://www.alkaramstudio.com/collections/mak-boys/**",
//     "https://www.alkaramstudio.com/collections/mak-boys",
//   ],
// };

// const extractors = {
//   "pk.khaadi.com": async (page: Page) => {
//     try {
//       // Additional extraction logic
//       // Wait for the main content to load
//       // await page.waitForSelector(".details-pdp");

//       // Extract text from the specified selectors
//       const brand = await page.$eval(".details-pdp > div.product-brand", (el) =>
//         el.textContent?.trim()
//       );
//       const productName = await page.$eval("h2.product-name", (el) =>
//         el.textContent?.trim()
//       );
//       const specifications = await page.$$eval(".spec-list span", (els) =>
//         els.map((el) => el.textContent?.trim()).join(", ")
//       );

//       // Concatenate all extracted text into a single description
//       const description = `${brand} ${productName} ${specifications}`;

//       const imageUrls = await page.$$eval("a.mz-thumb", (anchors) =>
//         anchors
//           .map((anchor) => {
//             const dataImage = anchor.getAttribute("data-image");
//             return dataImage
//               ? dataImage.startsWith("//")
//                 ? "https:" + dataImage
//                 : dataImage
//               : null;
//           })
//           .filter((url) => url !== null)
//       );

//       return { description, imageUrls };
//     } catch (error) {
//       return {};
//     }
//   },
//   "sanasafinaz.com": async (page: Page) => {
//     // things to improve:
//     // remove ids such as SS23BSP214F from description
//     try {
//       const paragraphs = page.locator("[itemprop='description'] p");

//       const texts = await paragraphs.allTextContents();

//       const originalDescription = texts.join(" ");

//       const description = originalDescription.replace(/Not Included/gi, "");

//       const imageUrls = await page.$$eval("a.mt-thumb-switcher", (anchors) =>
//         anchors
//           .map((anchor) => {
//             const dataImage = anchor.getAttribute("data-image");
//             return dataImage ? dataImage : null;
//           })
//           .filter((url) => url !== null)
//       );

//       return { description, imageUrls };
//     } catch (error) {
//       return {};
//     }
//   },
//   "mariab.pk": async (page: Page) => {
//     // things to improve:
//     // Remove ids such as SF-W24-34 from product names without removing the color name. e.g. if SF-W24-34-Navy Blue-Small, Navy Blue-Small should remain
//     try {
//       const description = (
//         await page.locator("h1, p.gygygy").allTextContents()
//       ).join("");

//       const imageHandles = await page.$$(".product__thumb img");
//       const imageUrls = [];

//       for (const imageHandle of imageHandles) {
//         const srcset = await imageHandle.getAttribute("srcset");
//         if (srcset) {
//           // Split the srcset string into individual image descriptors
//           const sources = srcset.split(",").map((src) => {
//             const [url, descriptor] = src.trim().split(" ");
//             return { url, descriptor };
//           });
//           // Sort sources by descriptor to get the highest resolution
//           sources.sort((a, b) => {
//             const aRes = parseInt(a.descriptor, 10);
//             const bRes = parseInt(b.descriptor, 10);
//             return bRes - aRes;
//           });
//           // Take the highest resolution image
//           let src = sources[0].url;
//           if (src.startsWith("//")) {
//             src = "https:" + src;
//           }
//           imageUrls.push(src);
//         } else {
//           let src = await imageHandle.getAttribute("src");
//           if (src) {
//             if (src.startsWith("//")) {
//               src = "https:" + src;
//             }
//             imageUrls.push(src);
//           }
//         }
//       }

//       return { description, imageUrls };
//     } catch (error) {
//       return {};
//     }
//   },
//   "gulahmedshop.com": async (page: Page) => {
//     // things to improve:
//     try {
//       const startingDescription = await page.evaluate(() => {
//         const baseElement = document.querySelector("span.base");
//         const descriptionDivs = document.querySelectorAll(".description div");

//         const baseText = baseElement ? baseElement.textContent?.trim() : "";
//         const descriptionTexts = Array.from(descriptionDivs)
//           .map((div) => div.textContent)
//           .join(" ");

//         return `${baseText} ${descriptionTexts}`.trim();
//       });

//       // Extract additional attributes from the table, excluding the "Discount Percentage" row
//       const additionalAttributes = await page.evaluate(() => {
//         const rows = document.querySelectorAll(
//           "table.data.table.additional-attributes tbody tr"
//         );
//         return Array.from(rows)
//           .filter((row) => !row.textContent?.includes("Discount Percentage"))
//           .map((row) => {
//             const label = row.querySelector("th")?.textContent?.trim();
//             const value = row.querySelector("td")?.textContent?.trim();
//             return label && value ? `${label} ${value}` : null;
//           })
//           .filter((text) => text !== null)
//           .join(", ");
//       });

//       // Combine the initial description with the additional attributes
//       const description =
//         `${startingDescription} ${additionalAttributes}`.trim();

//       const imageUrlsWithPotentialDuplicates = await page.$$eval(
//         "a.mt-thumb-switcher",
//         (anchors) =>
//           anchors
//             .map((anchor) => {
//               const dataImage = anchor.getAttribute("data-image");
//               return dataImage
//                 ? dataImage.startsWith("//")
//                   ? "https:" + dataImage
//                   : dataImage
//                 : null;
//             })
//             .filter((url) => url !== null)
//       );

//       const imageUrls = [...new Set(imageUrlsWithPotentialDuplicates)];

//       return { description, imageUrls };
//     } catch (error) {
//       return {};
//     }
//   },
//   "nishatlinen.com": async (page: Page) => {
//     // things to improve:
//     try {
//       // Retrieve the current page URL
//       const currentURL = page.url();

//       // Check if the URL contains the word 'products'
//       if (!currentURL.includes("products")) {
//         return {}; // Exit the function if 'products' is not in the URL
//       }

//       // Extract text from the 'h1' element
//       const h1Text = await page.textContent("h1");

//       // Extract text from all 'div' elements with the class 't4s-rte'
//       const divTexts = await page.$$eval("div.t4s-rte", (divs) =>
//         divs.map((div) => div.textContent?.trim()).join(" ")
//       );

//       // Combine the extracted texts into a single description
//       const description = `${h1Text?.trim()} ${divTexts}`.trim();

//       const imageUrls = await page.$$eval(
//         ".t4s-carousel__nav-item img",
//         (images) => {
//           const urls = images.map((img) => {
//             // Extract the highest-resolution URL from the srcset attribute
//             const srcset =
//               img.getAttribute("data-srcset") || img.getAttribute("srcset");
//             if (srcset) {
//               const srcsetUrls = srcset
//                 .split(",")
//                 .map((src) => src.trim().split(" ")[0]);
//               return "https:" + srcsetUrls[srcsetUrls.length - 1]; // Get the last URL, which is usually the highest resolution
//             }
//             // Fallback to the src attribute if srcset is not available
//             return img.getAttribute("src");
//           });
//           // Remove duplicates
//           return [...new Set(urls)];
//         }
//       );

//       return { description, imageUrls };
//     } catch (error) {
//       return {};
//     }
//   },
//   "pk.sapphireonline.pk": async (page: Page) => {
//     // things to improve:
//     try {
//       // Retrieve the current page URL
//       const currentURL = page.url();

//       // Check if the URL contains the word 'products'
//       if (!currentURL.includes("products")) {
//         return {}; // Exit the function if 'products' is not in the URL
//       }

//       const description = await page.evaluate(() => {
//         const container = document.querySelector("#content1");
//         if (!container) return ""; // Handle cases where the container is not found

//         return container.innerHTML
//           .split(/<br\s*\/?>/i) // Split by <br> tags
//           .map((text) => text.replace(/<\/?[^>]+(>|$)/g, "").trim()) // Remove HTML tags and trim whitespace
//           .filter((text) => text) // Remove empty strings
//           .join("\n"); // Preserve line breaks
//       });

//       // Extract URLs of the highest-resolution images
//       const imageUrls = await page.$$eval(
//         "div[data-product-single-media-wrapper] img", // Select the image elements within the specified container
//         (images) =>
//           images
//             .map(
//               (img) => "https:" + img.getAttribute("data-master") // Extract the `data-master` attribute for the highest resolution image
//             )
//             .filter(Boolean) // Remove null/undefined values
//       );

//       return { description, imageUrls };
//     } catch (error) {
//       // console.error(error);
//       return {};
//     }
//   },
//   "bareeze.com": async (page: Page) => {
//     // things to improve:
//     // crawl keeps failing after 150 links. maybe because of infinte scroll pagination but not sure.
//     // remove ids like SKU: MC1206-Brown besides the color
//     try {
//       //infinite scroll function for bareeze's infinite scroll

//       // Function to perform infinite scrolling
//       async function infiniteScroll(page: Page) {
//         let previousHeight;
//         while (true) {
//           // Scroll down to the bottom of the page
//           await page.evaluate(() => {
//             window.scrollBy(0, window.innerHeight);
//           });
//           // Wait for new content to load
//           await page.waitForTimeout(3000); // Adjust timeout as needed
//           // Check if we've reached the bottom of the page
//           const currentHeight = await page.evaluate(
//             () => document.body.scrollHeight
//           );
//           if (currentHeight === previousHeight) {
//             break;
//           }
//           previousHeight = currentHeight;
//         }
//       }

//       // Perform infinite scroll to load all content
//       await infiniteScroll(page);

//       // Define the selectors you want to target
//       const selectors = [
//         "h1",
//         "div.product-sku",
//         ".accordion-description-content",
//       ];

//       // Initialize an array to hold the text contents
//       let textContents = [];

//       // Iterate over each selector
//       for (const selector of selectors) {
//         // Retrieve all elements matching the current selector
//         const elements = await page.locator(selector).elementHandles();

//         // Extract text content from each element
//         for (const element of elements) {
//           const text = await element.textContent();
//           if (text) {
//             // Trim and add the text to the array
//             textContents.push(text.trim());
//           }
//         }
//       }

//       // Join all text contents with a space separator
//       const description = textContents.join(" ");

//       const imageUrls = await page.evaluate(() => {
//         // Select all img tags inside the specified container
//         const images = document.querySelectorAll("div.ImagesGrid img");

//         // Extract the src attribute from each img tag
//         return Array.from(images)
//           .map((img) => img.getAttribute("src")) // Get the src attribute
//           .filter((src) => src); // Ensure no null or undefined values
//       });

//       return { description, imageUrls };
//     } catch (error) {
//       // console.error(error);
//       return {};
//     }
//   },
//   // "junaidjamshed.com": async (page: Page) => {
//   //   // things to improve:
//   //   // doesnt work, crawler shuts down after first page
//   //   try {
//   //     // Get the title text
//   //     const title = await page.locator("h1.page-title").innerText();

//   //     // Get the description text
//   //     const descriptionText = await page
//   //       .locator('div.value[itemprop="description"]')
//   //       .innerText();

//   //     // Get additional information from the table
//   //     const additionalInfoRows = await page.locator(
//   //       "table#product-attribute-specs-table tbody tr"
//   //     );
//   //     const additionalInfoTexts = [];

//   //     const rowCount = await additionalInfoRows.count();

//   //     for (let i = 0; i < rowCount; i++) {
//   //       const row = additionalInfoRows.nth(i);
//   //       const thText = await row.locator("th").innerText();
//   //       const tdText = await row.locator("td").innerText();
//   //       additionalInfoTexts.push(`${thText}: ${tdText}`);
//   //     }

//   //     const additionalInfo = additionalInfoTexts.join("\n");

//   //     // Combine all the text into a single description constant
//   //     const description = `${title}\n\n${descriptionText}\n\n${additionalInfo}`;

//   //     const imageUrls = await page.evaluate(() => {
//   //       const container = document.querySelector(
//   //         ".MagicToolboxSelectorsContainer"
//   //       );
//   //       if (!container) return [];

//   //       // Get all <a> elements within the container
//   //       const links = container.querySelectorAll("a.mt-thumb-switcher");

//   //       // Extract 'data-image' or 'href' attributes
//   //       return Array.from(links)
//   //         .map(
//   //           (link) =>
//   //             link.getAttribute("href") || link.getAttribute("data-image")
//   //         )
//   //         .filter((url) => url); // Ensure only valid URLs are returned
//   //     });

//   //     return { description, imageUrls };
//   //   } catch (error) {
//   //     // console.error(error);
//   //     return {};
//   //   }
//   // },
//   "asimjofa.com": async (page: Page) => {
//     // things to improve:
//     // remove id like AJCD-08
//     try {
//       // Extract text from the specified elements
//       const title = await page.$eval("h1.t4s-product__title", (el) =>
//         el.textContent?.trim()
//       );
//       const details = await page.$$eval(".t4s-pr__custom-liquid .skus", (els) =>
//         els.map((el) => el.textContent?.trim()).join(" ")
//       );
//       const partialDescription = await page.$eval(".panel", (el) =>
//         el.textContent?.trim()
//       );

//       // Combine the extracted text into a single description
//       const description = `${title}\n\n${details}\n\n${partialDescription}`;

//       const imageUrls = await page.$$eval(
//         '#pinchdiv [data-product-single-media-wrapper][data-media-type="image"] img[data-master]',
//         (imgs) => imgs.map((img) => "https:" + img.getAttribute("data-master"))
//       );

//       return { description, imageUrls };
//     } catch (error) {
//       return {};
//     }
//   },
//   "alkaramstudio.com": async (page: Page) => {
//     // things to improve:
//     // Remove ids from description without removing the color text in them
//     // out of memory error
//     try {
//       const description = await page.$eval(
//         "#t4s-tab-destemplate--16602647167156__main",
//         (el: HTMLElement) => {
//           // Retrieve the text content of the element
//           let text = el.innerText;

//           // Replace multiple whitespace characters with a single space
//           text = text.replace(/\s+/g, " ").trim();

//           return text;
//         }
//       );

//       const imageUrls = await page.$$eval(
//         '[data-thumb__scroller="template--16602647167156__main"] .t4s-carousel__nav-item img',
//         (imgs) => {
//           return imgs.map((img) => {
//             let src = img.getAttribute("src");
//             let url = src?.replace(/&width=\d+/, "");
//             if (url?.startsWith("//")) {
//               url = "https:" + url;
//             }
//             return url;
//           });
//         }
//       );

//       return { description, imageUrls };
//     } catch (error) {
//       return {};
//     }
//   },
//   // Define extractors for other domains
// };

// const cheerioExtractors = {
//   "junaidjamshed.com": async ($: CheerioRoot) => {
//     // things to improve:
//     // doesnt work, crawler shuts down after first page
//     try {
//       const title = $("h1.page-title").text() || "";
//       const desc = $('div.value[itemprop="description"]').text() || "";

//       const additionalInfoTexts: string[] = [];
//       $("table#product-attribute-specs-table tbody tr").each(
//         (index, element) => {
//           const thText = $(element).find("th").text();
//           const tdText = $(element).find("td").text();
//           additionalInfoTexts.push(`${thText}: ${tdText}`);
//         }
//       );
//       const additionalInfo = additionalInfoTexts.join("\n");
//       let description = `${title}\n\n${desc}\n\n${additionalInfo}`;

//       description = description.trim();

//       let imageUrls: string[] = [];
//       $("a.mt-thumb-switcher").each((index, element) => {
//         imageUrls.push(
//           $(element).attr("href") || $(element).attr("data-image") || ""
//         );
//       });
//       imageUrls = imageUrls.filter(Boolean);
//       return { description, imageUrls };
//     } catch (error) {
//       console.error(error);
//       return {};
//     }
//   },
//   "pk.khaadi.com": async ($: CheerioRoot) => {
//     try {
//       // Extract brand
//       const brand = $(".details-pdp > div.product-brand").text().trim() || "";

//       // Extract productName
//       const productName = $("h2.product-name").text().trim() || "";

//       // Extract specifications
//       const specifications = $(".spec-list span")
//         .map((index, el) => $(el).text().trim())
//         .get()
//         .join(", ");

//       // Concatenate all extracted text into a single description
//       const description = `${brand} ${productName} ${specifications}`.trim();

//       // Extract image URLs

//       let imageUrls: string[] = [];

//       $("div.pro-detail--thumbs.col-3.thumbs-event div.item a").each(
//         (index, element) => {
//           const dataImage = $(element).attr("data-image");
//           if (dataImage) {
//             imageUrls.push(dataImage);
//           }
//         }
//       );

//       // console.log("description", description);
//       // console.log("imageUrls", imageUrls);
//       return { description, imageUrls };
//     } catch (error) {
//       console.error(error);
//       return {};
//     }
//   },
//   "sanasafinaz.com": async ($: CheerioRoot) => {
//     // things to improve:
//     // remove ids such as SS23BSP214F from description
//     try {
//       // // Extract paragraphs under [itemprop='description']
//       // const paragraphs = $("[itemprop='description'] p");
//       // const texts = paragraphs.map((i, el) => $(el).text().trim()).get();
//       // const originalDescription = texts.join(" ");

//       // // Remove "Not Included" from description
//       // let description = originalDescription.replace(/Not Included/gi, "");

//       // // Remove IDs like SS23BSP214F from description
//       // description = description.replace(/\b[A-Z]{2}\d+[A-Z]?\b/g, "").trim();

//       let description = "";

//       // Select the description div
//       const descriptionDiv = $('div.value[itemprop="description"]');

//       let disclaimerText = ""; // Variable to store the disclaimer

//       // Extract text from paragraphs and text nodes outside the table
//       descriptionDiv.contents().each((index, element) => {
//         if (element.type === "text") {
//           const text = $(element).text().trim();
//           if (text) {
//             description += text + "\n\n";
//           }
//         } else if (element.type === "tag" && element.name === "p") {
//           const text = $(element).text().trim();
//           if (text) {
//             // Check if this paragraph contains the disclaimer
//             if (text.toLowerCase().startsWith("disclaimer:")) {
//               disclaimerText = text; // Save the disclaimer to append at the end
//             } else {
//               description += text + "\n\n";
//             }
//           }
//         }
//       });

//       // Extract text from the table
//       const tableRows = descriptionDiv.find("table tbody tr");
//       const tableTextLines: string[] = [];

//       tableRows.each((index, row) => {
//         const cells = $(row).find("td");
//         const cellTexts = cells.map((i, cell) => $(cell).text().trim()).get();
//         if (cellTexts.length === 2) {
//           tableTextLines.push(`${cellTexts[0]}: ${cellTexts[1]}`);
//         } else {
//           tableTextLines.push(cellTexts.join(" "));
//         }
//       });

//       const tableText = tableTextLines.join("\n");

//       // Append the table text to the description
//       description += tableText + "\n\n";

//       // Append the disclaimer at the end, if it exists
//       if (disclaimerText) {
//         description += disclaimerText + "\n\n";
//       }

//       description = description.trim();

//       // Extract image URLs
//       let imageUrls: string[] = [];
//       $("a.mt-thumb-switcher").each((index, element) => {
//         const dataImage = $(element).attr("data-image");
//         if (dataImage) {
//           imageUrls.push(dataImage);
//         }
//       });
//       imageUrls = imageUrls.filter(Boolean);

//       // console.log("description", description);
//       // console.log("imageUrls", imageUrls);

//       return { description, imageUrls };
//     } catch (error) {
//       console.error(error);
//       return {};
//     }
//   },
//   "mariab.pk": async ($: CheerioRoot) => {
//     // things to improve:
//     // Remove IDs such as SF-W24-34 from product names without removing the color name.
//     // e.g., if SF-W24-34-Navy Blue-Small, "Navy Blue-Small" should remain
//     try {
//       // Extract the description
//       let description = $("h1, p.gygygy").text().trim();

//       // Remove IDs like SF-W24-34 from the description
//       // This regex matches patterns like 'SF-W24-34' at the beginning or middle of the string
//       description = description
//         .replace(/\b[A-Z]{2}-[A-Z0-9]+-\d+\b[\s-]*/g, "")
//         .trim();

//       const imageUrls: string[] = [];

//       // Select all 'a' tags within 'div.product__thumb-item'
//       $("div.product__thumb-item a").each((index, element) => {
//         let href = $(element).attr("href");
//         if (href) {
//           // Add 'https:' prefix if the URL starts with '//'
//           if (href.startsWith("//")) {
//             href = "https:" + href;
//           }
//           imageUrls.push(href);
//         }
//       });

//       // console.log("description", description);
//       // console.log("imageUrls", imageUrls);

//       return { description, imageUrls };
//     } catch (error) {
//       // console.error(error);
//       return {};
//     }
//   },
//   "gulahmedshop.com": async ($: CheerioRoot) => {
//     // things to improve:
//     // some words were combined.
//     try {
//       // // Extract the starting description
//       // const baseText = $("span.base").text().trim() || "";
//       // const descriptionDivs = $(".description div");
//       // const descriptionTexts = descriptionDivs
//       //   .map((i, el) => $(el).text().trim())
//       //   .get()
//       //   .join(" ");

//       // const startingDescription = `${baseText} ${descriptionTexts}`.trim();

//       // // Extract additional attributes from the table, excluding the "Discount Percentage" row
//       // const additionalAttributes = $(
//       //   "table.data.table.additional-attributes tbody tr"
//       // )
//       //   .filter((i, row) => !$(row).text().includes("Discount Percentage"))
//       //   .map((i, row) => {
//       //     const label = $(row).find("th").text().trim();
//       //     const value = $(row).find("td").text().trim();
//       //     return label && value ? `${label} ${value}` : null;
//       //   })
//       //   .get()
//       //   .filter((text) => text !== null)
//       //   .join(", ");

//       // // Combine the initial description with the additional attributes
//       // const description =
//       //   `${startingDescription} ${additionalAttributes}`.trim();

//       let description = "";

//       // Extract the text from the <span class="base"> element
//       const baseText = $("span.base").text().trim();
//       description += baseText + "\n\n";

//       // Extract the description from all <div class="product attribute description">
//       const descriptionDivs = $("div.product.attribute.description");

//       const descriptionLines: string[] = [];

//       descriptionDivs.each((index, descriptionDiv) => {
//         const valueDiv = $(descriptionDiv).find("div.value").first();

//         // Process the contents of valueDiv
//         valueDiv.contents().each((i, element) => {
//           if (element.type === "tag") {
//             const tagName = element.name;
//             if (tagName === "p") {
//               const text = $(element).text().trim();
//               if (text) {
//                 descriptionLines.push(text);
//               }
//             } else if (tagName === "ul") {
//               // For each <li> inside this <ul>
//               $(element)
//                 .children("li")
//                 .each((i, li) => {
//                   const liText = $(li).text().trim();
//                   if (liText) {
//                     descriptionLines.push("- " + liText);
//                   }
//                 });
//             } else {
//               // For any other tags, get the text
//               const text = $(element).text().trim();
//               if (text) {
//                 descriptionLines.push(text);
//               }
//             }
//           } else if (element.type === "text") {
//             const text = $(element).text().trim();
//             if (text) {
//               descriptionLines.push(text);
//             }
//           }
//         });
//       });

//       const descriptionContent = descriptionLines.join("\n");

//       description += descriptionContent + "\n\n";

//       // Extract the table rows, excluding the "Discount Percentage" row
//       const contentDiv = $("div.data.item.content"); // Adjusted to select contentDiv for table
//       const tableRows = contentDiv.find(
//         "table#product-attribute-specs-table tbody tr"
//       );
//       const tableTextLines: string[] = [];

//       tableRows.each((index, row) => {
//         const cells = $(row).find("th, td");
//         const label = $(cells[0]).text().trim();
//         const value = $(cells[1]).text().trim();

//         if (label !== "Discount Percentage:") {
//           tableTextLines.push(`${label} ${value}`);
//         }
//       });

//       const tableText = tableTextLines.join("\n");

//       description += tableText;

//       description = description.trim();

//       // Extract image URLs, ensuring no duplicates
//       const imageUrlsWithPotentialDuplicates = $("a.mt-thumb-switcher")
//         .map((i, anchor) => {
//           let dataImage = $(anchor).attr("data-image");
//           if (dataImage) {
//             if (dataImage.startsWith("//")) {
//               dataImage = "https:" + dataImage;
//             }
//             return dataImage;
//           }
//           return null;
//         })
//         .get()
//         .filter((url) => url !== null);

//       const imageUrls = [...new Set(imageUrlsWithPotentialDuplicates)];

//       // console.log("description", description);
//       // console.log("imageUrls", imageUrls);

//       return { description, imageUrls };
//     } catch (error) {
//       console.error(error);
//       return {};
//     }
//   },
//   "nishatlinen.com": async ($: CheerioRoot) => {
//     try {
//       let description = "";

//       // Extract text from the <h1> element
//       const h1Text = $("h1.t4s-product__title").text().trim();
//       description += h1Text + "\n\n";

//       // Select the <div> with class 't4s-rte t4s-tab-content'
//       const contentDiv = $("div.t4s-rte.t4s-tab-content");

//       // Replace <br> tags with newlines within contentDiv
//       contentDiv.find("br").replaceWith("\n");

//       // Extract the text content from contentDiv
//       const contentText = contentDiv.text().trim();

//       description += contentText;

//       description = description.trim();

//       const imageUrls: string[] = [];

//       // Select all <div> elements with class 't4s-carousel__nav-item'
//       $("div.t4s-carousel__nav-item").each((index, element) => {
//         // Find the <img> element within the current <div>
//         const img = $(element).find("img");

//         if (img.length > 0) {
//           // Try to get 'data-srcset' or 'srcset' attribute
//           const srcset = img.attr("data-srcset") || img.attr("srcset");

//           if (srcset) {
//             // Split the srcset into individual image descriptors
//             const sources = srcset.split(",").map((src) => {
//               const [url, descriptor] = src.trim().split(" ");
//               return { url, descriptor };
//             });

//             // Sort the sources by descriptor to get the highest resolution
//             sources.sort((a, b) => {
//               // Extract numerical value from descriptor (e.g., '80w' -> 80)
//               const aRes = parseInt(a.descriptor, 10);
//               const bRes = parseInt(b.descriptor, 10);
//               return bRes - aRes;
//             });

//             // Get the highest resolution image URL
//             let highResUrl = sources[0].url;

//             // Ensure the URL is absolute
//             if (highResUrl.startsWith("//")) {
//               highResUrl = "https:" + highResUrl;
//             } else if (highResUrl.startsWith("/")) {
//               const baseUrl = "https://nishatlinen.com"; // Replace with the actual base URL
//               highResUrl = baseUrl + highResUrl;
//             }

//             imageUrls.push(highResUrl);
//           } else {
//             // Fallback to 'src' attribute if 'srcset' is not available
//             let src = img.attr("src");
//             if (src) {
//               if (src.startsWith("//")) {
//                 src = "https:" + src;
//               } else if (src.startsWith("/")) {
//                 const baseUrl = "https://nishatlinen.com"; // Replace with the actual base URL
//                 src = baseUrl + src;
//               }
//               imageUrls.push(src);
//             }
//           }
//         }
//       });

//       // Remove duplicates if any
//       const uniqueImageUrls = [...new Set(imageUrls)];

//       console.log("description", description);
//       console.log("imageUrls", uniqueImageUrls);

//       return { description, imageUrls: uniqueImageUrls };
//     } catch (error) {
//       console.error(error);
//       return {};
//     }
//   },
//   "asimjofa.com": async ($: CheerioRoot) => {
//     // things to improve:
//     // remove id like AJCD-08
//     try {
//       // Extract text from the specified elements
//       let title = $("h1.t4s-product__title").text().trim();

//       // Remove IDs like 'AJCD-08' from the title
//       title = title.replace(/\b[A-Z]{2,}-\d+\b/g, "").trim();

//       const details = $(".t4s-pr__custom-liquid .skus")
//         .map((i, el) => $(el).text().trim())
//         .get()
//         .join(" ");

//       const partialDescription = $(".panel").text().trim();

//       // Combine the extracted text into a single description
//       let description = `${title}\n\n${details}\n\n${partialDescription}`;

//       const unwantedTextPattern = /Local Delivery[\s\S]*?Buyers Protection/g;

//       // Remove the unwanted text from the description
//       description = description.replace(unwantedTextPattern, "").trim();

//       // Extract image URLs
//       const imageUrls = $(
//         '#pinchdiv [data-product-single-media-wrapper][data-media-type="image"] img[data-master]'
//       )
//         .map((i, img) => {
//           const dataMaster = $(img).attr("data-master");
//           if (dataMaster) {
//             return dataMaster.startsWith("//")
//               ? "https:" + dataMaster
//               : dataMaster;
//           }
//           return null;
//         })
//         .get()
//         .filter(Boolean); // Remove any null or undefined values

//       return { description, imageUrls };
//     } catch (error) {
//       return {};
//     }
//   },
// };

// // PlaywrightCrawler crawls the web using a headless
// // browser controlled by the Playwright library.
// const crawler = new PlaywrightCrawler({
//   useSessionPool: true,
//   persistCookiesPerSession: true,
//   // Use the requestHandler to process each of the crawled pages.
//   async requestHandler({ request, page, enqueueLinks, log }) {
//     const title = await page.title();
//     log.info(`Title of ${request.loadedUrl} is '${title}'`);

//     const { hostname } = new URL(request.url);
//     const domain = hostname.replace("www.", "");

//     const extractor = extractors[domain as keyof typeof extractors];

//     // Save results as JSON to ./storage/datasets/default
//     if (extractor) {
//       const data = await extractor(page);
//       if (data.description && data.imageUrls.length) {
//         await Dataset.pushData({
//           domain: domain,
//           url: request.url,
//           ...data,
//         });
//         console.log("data", data);
//       }
//     } else {
//       log.warning(`No extractor defined for domain: ${domain}`);
//     }

//     // Extract links from the current page
//     // and add them to the crawling queue.

//     await enqueueLinks({
//       strategy: "same-hostname",

//       globs: [
//         // ...globs.khaadi,
//         // ...globs.sanaSafinaz,
//         // ...globs.mariaB,
//         // ...globs.gulAhmed,
//         // ...globs.junaidJamshed,
//         // ...globs.asimJofa,
//         ...globs.nishatlinen,
//         ...globs.sapphire,
//         ...globs.bareeze,
//         ...globs.alkaramStudio,
//       ],
//       exclude: [
//         // ...exclusions.khaadi,
//         // ...exclusions.sanaSafinaz,
//         // ...exclusions.mariaB,
//         // ...exclusions.gulAhmed,
//         // ...exclusions.junaidJamshed,
//         // ...exclusions.asimJofa,
//         ...exclusions.sapphire,
//         ...exclusions.bareeze,
//         ...exclusions.alkaramStudio,
//       ],
//       //   transformRequestFunction: (request) => {
//       //     console.log(`Enqueuing URL: ${request.url}`);
//       //     return request;
//       // },
//     });
//   },
//   // Comment this option to scrape the full website.
//   //   maxRequestsPerCrawl: 20,
//   // Uncomment this option to see the browser window.
//   // headless: false,
// });

// const cheerioCrawler = new CheerioCrawler({
//   useSessionPool: true,
//   persistCookiesPerSession: true,
//   // Use the requestHandler to process each of the crawled pages.
//   async requestHandler({ request, $, enqueueLinks, log }) {
//     const title = $("title").text();
//     log.info(`Title of ${request.loadedUrl} is '${title}'`);

//     const { hostname } = new URL(request.url);
//     const domain = hostname.replace("www.", "");

//     const cheerioExtractor =
//       cheerioExtractors[domain as keyof typeof cheerioExtractors];

//     // Save results as JSON to ./storage/datasets/default
//     if (cheerioExtractor) {
//       const data = await cheerioExtractor($);
//       if (data.description && data.imageUrls.length) {
//         await Dataset.pushData({
//           domain: domain,
//           url: request.url,
//           ...data,
//         });
//         console.log("data", data);
//       }
//     } else {
//       log.warning(`No extractor defined for domain: ${domain}`);
//     }

//     // Extract links from the current page
//     // and add them to the crawling queue.

//     await enqueueLinks({
//       strategy: "same-hostname",

//       globs: [
//         ...globs.khaadi,
//         ...globs.sanaSafinaz,
//         ...globs.mariaB,
//         ...globs.gulAhmed,
//         ...globs.junaidJamshed,
//         ...globs.asimJofa,
//         // ...globs.nishatlinen,
//         // ...globs.sapphire,
//         // ...globs.bareeze,

//         // ...globs.alkaramStudio,
//       ],
//       exclude: [
//         ...exclusions.khaadi,
//         ...exclusions.sanaSafinaz,
//         ...exclusions.mariaB,
//         ...exclusions.gulAhmed,
//         ...exclusions.junaidJamshed,
//         ...exclusions.asimJofa,
//         // ...exclusions.sapphire,
//         // ...exclusions.bareeze,

//         // ...exclusions.alkaramStudio,
//       ],
//       //   transformRequestFunction: (request) => {
//       //     console.log(`Enqueuing URL: ${request.url}`);
//       //     return request;
//       // },
//     });
//   },
//   // Comment this option to scrape the full website.
//   //   maxRequestsPerCrawl: 20,
//   // Uncomment this option to see the browser window.
//   // headless: false,
// });

// // List of initial URLs to crawl
// const playWrightStartUrls: string[] = [
//   "https://nishatlinen.com/",
//   "https://pk.sapphireonline.pk/",
//   "https://bareeze.com/",
//   "https://www.alkaramstudio.com/",
// ];
// // const cheerioStartUrls: string[] = [
// //   "https://www.junaidjamshed.com/women-collections",
// //   "https://pk.khaadi.com/",
// //   "https://www.sanasafinaz.com/pk/",
// //   "https://www.mariab.pk/",
// //   "https://www.gulahmedshop.com/",
// //   "https://asimjofa.com/",
// // ];

// const promiseList = [];

// // if (cheerioStartUrls.length) {
// //   promiseList.push(cheerioCrawler.run(cheerioStartUrls));
// // }

// if (playWrightStartUrls.length) {
//   promiseList.push(crawler.run(playWrightStartUrls));
// }

// if (promiseList.length) {
//   await Promise.all(promiseList);
// }

// // Add first URL to the queue and start the crawl.

// await Actor.exit();

import { Dataset } from 'crawlee';
import fs from 'fs';
import path from 'path';

// Directory containing your JSON files
const jsonDirectory = './json-files';

// Function to load JSON files into Crawlee's dataset
async function loadJsonFilesToDataset() {
    const files = fs.readdirSync(jsonDirectory);

    for (const file of files) {
        if (path.extname(file) === '.json') {
            const filePath = path.join(jsonDirectory, file);
            const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            // Ensure data is an array of objects
            const dataArray = Array.isArray(data) ? data : [data];

            // Push each object to the dataset
            for (const item of dataArray) {
                await Dataset.pushData(item);
            }
        }
    }
}

// Execute the function
loadJsonFilesToDataset()
    .then(async () => {
        console.log('All JSON files have been loaded into the dataset.');
        // Export the entire dataset to a CSV file named 'OUTPUT'
await Dataset.exportToCSV('pakistani_fashion_dataset.csv');
    })
    .catch((error) => {
        console.error('An error occurred:', error);
    });



// import { Dataset } from 'crawlee';

