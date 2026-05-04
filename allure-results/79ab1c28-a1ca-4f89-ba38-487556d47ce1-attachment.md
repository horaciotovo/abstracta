# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: products\product-listing.spec.ts >> Demoblaze Product Listing >> should verify all products have consistent data structure
- Location: tests\products\product-listing.spec.ts:50:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('ul.pagination').getByRole('button', { name: 'Next' })
    - locator resolved to <button value="9" id="next2" class="page-link">Next</button>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - text:            
  - navigation [ref=e2]:
    - link "PRODUCT STORE" [ref=e3] [cursor=pointer]:
      - /url: index.html
      - img [ref=e4]
      - text: PRODUCT STORE
    - list [ref=e6]:
      - listitem [ref=e7]:
        - link "Home (current)" [ref=e8] [cursor=pointer]:
          - /url: index.html
          - text: Home
          - generic [ref=e9]: (current)
      - listitem [ref=e10]:
        - link "Contact" [ref=e11] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e12]:
        - link "About us" [ref=e13] [cursor=pointer]:
          - /url: "#"
      - listitem [ref=e14]:
        - link "Cart" [ref=e15] [cursor=pointer]:
          - /url: cart.html
      - listitem [ref=e16]:
        - link "Log in" [ref=e17] [cursor=pointer]:
          - /url: "#"
      - listitem
      - listitem
      - listitem [ref=e18]:
        - link "Sign up" [ref=e19] [cursor=pointer]:
          - /url: "#"
    - generic [ref=e21]:
      - list [ref=e22]:
        - listitem [ref=e23] [cursor=pointer]
        - listitem [ref=e24] [cursor=pointer]
        - listitem [ref=e25] [cursor=pointer]
      - img "Second slide" [ref=e28]
      - button "Previous" [ref=e29] [cursor=pointer]:
        - generic [ref=e31]: Previous
      - button "Next" [ref=e32] [cursor=pointer]:
        - generic [ref=e34]: Next
  - generic [ref=e36]:
    - generic [ref=e38]:
      - link "CATEGORIES" [ref=e39] [cursor=pointer]:
        - /url: ""
      - link "Phones" [ref=e40] [cursor=pointer]:
        - /url: "#"
      - link "Laptops" [ref=e41] [cursor=pointer]:
        - /url: "#"
      - link "Monitors" [ref=e42] [cursor=pointer]:
        - /url: "#"
    - generic [ref=e43]:
      - generic [ref=e44]:
        - generic [ref=e46]:
          - link [ref=e47] [cursor=pointer]:
            - /url: prod.html?idp_=1
          - generic [ref=e48]:
            - heading "Samsung galaxy s6" [level=4] [ref=e49]:
              - link "Samsung galaxy s6" [ref=e50] [cursor=pointer]:
                - /url: prod.html?idp_=1
            - heading "$360" [level=5] [ref=e51]
            - paragraph [ref=e52]: The Samsung Galaxy S6 is powered by 1.5GHz octa-core Samsung Exynos 7420 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage cannot be expanded.
        - generic [ref=e54]:
          - link [ref=e55] [cursor=pointer]:
            - /url: prod.html?idp_=2
          - generic [ref=e56]:
            - heading "Nokia lumia 1520" [level=4] [ref=e57]:
              - link "Nokia lumia 1520" [ref=e58] [cursor=pointer]:
                - /url: prod.html?idp_=2
            - heading "$820" [level=5] [ref=e59]
            - paragraph [ref=e60]: The Nokia Lumia 1520 is powered by 2.2GHz quad-core Qualcomm Snapdragon 800 processor and it comes with 2GB of RAM.
        - generic [ref=e62]:
          - link [ref=e63] [cursor=pointer]:
            - /url: prod.html?idp_=3
          - generic [ref=e64]:
            - heading "Nexus 6" [level=4] [ref=e65]:
              - link "Nexus 6" [ref=e66] [cursor=pointer]:
                - /url: prod.html?idp_=3
            - heading "$650" [level=5] [ref=e67]
            - paragraph [ref=e68]: The Motorola Google Nexus 6 is powered by 2.7GHz quad-core Qualcomm Snapdragon 805 processor and it comes with 3GB of RAM.
        - generic [ref=e70]:
          - link [ref=e71] [cursor=pointer]:
            - /url: prod.html?idp_=4
          - generic [ref=e72]:
            - heading "Samsung galaxy s7" [level=4] [ref=e73]:
              - link "Samsung galaxy s7" [ref=e74] [cursor=pointer]:
                - /url: prod.html?idp_=4
            - heading "$800" [level=5] [ref=e75]
            - paragraph [ref=e76]: The Samsung Galaxy S7 is powered by 1.6GHz octa-core it comes with 4GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 200GB via a microSD card.
        - generic [ref=e78]:
          - link [ref=e79] [cursor=pointer]:
            - /url: prod.html?idp_=5
          - generic [ref=e80]:
            - heading "Iphone 6 32gb" [level=4] [ref=e81]:
              - link "Iphone 6 32gb" [ref=e82] [cursor=pointer]:
                - /url: prod.html?idp_=5
            - heading "$790" [level=5] [ref=e83]
            - paragraph [ref=e84]: It comes with 1GB of RAM. The phone packs 16GB of internal storage cannot be expanded. As far as the cameras are concerned, the Apple iPhone 6 packs a 8-megapixel primary camera on the rear and a 1.2-megapixel front shooter for selfies.
        - generic [ref=e86]:
          - link [ref=e87] [cursor=pointer]:
            - /url: prod.html?idp_=6
          - generic [ref=e88]:
            - heading "Sony xperia z5" [level=4] [ref=e89]:
              - link "Sony xperia z5" [ref=e90] [cursor=pointer]:
                - /url: prod.html?idp_=6
            - heading "$320" [level=5] [ref=e91]
            - paragraph [ref=e92]: Sony Xperia Z5 Dual smartphone was launched in September 2015. The phone comes with a 5.20-inch touchscreen display with a resolution of 1080 pixels by 1920 pixels at a PPI of 424 pixels per inch.
        - generic [ref=e94]:
          - link [ref=e95] [cursor=pointer]:
            - /url: prod.html?idp_=7
          - generic [ref=e96]:
            - heading "HTC One M9" [level=4] [ref=e97]:
              - link "HTC One M9" [ref=e98] [cursor=pointer]:
                - /url: prod.html?idp_=7
            - heading "$700" [level=5] [ref=e99]
            - paragraph [ref=e100]: The HTC One M9 is powered by 1.5GHz octa-core Qualcomm Snapdragon 810 processor and it comes with 3GB of RAM. The phone packs 32GB of internal storage that can be expanded up to 128GB via a microSD card.
        - generic [ref=e102]:
          - link [ref=e103] [cursor=pointer]:
            - /url: prod.html?idp_=8
          - generic [ref=e104]:
            - heading "Sony vaio i5" [level=4] [ref=e105]:
              - link "Sony vaio i5" [ref=e106] [cursor=pointer]:
                - /url: prod.html?idp_=8
            - heading "$790" [level=5] [ref=e107]
            - paragraph [ref=e108]: Sony is so confident that the VAIO S is a superior ultraportable laptop that the company proudly compares the notebook to Apple's 13-inch MacBook Pro. And in a lot of ways this notebook is better, thanks to a lighter weight.
        - generic [ref=e110]:
          - link [ref=e111] [cursor=pointer]:
            - /url: prod.html?idp_=9
          - generic [ref=e112]:
            - heading "Sony vaio i7" [level=4] [ref=e113]:
              - link "Sony vaio i7" [ref=e114] [cursor=pointer]:
                - /url: prod.html?idp_=9
            - heading "$790" [level=5] [ref=e115]
            - paragraph [ref=e116]: REVIEW Sony is so confident that the VAIO S is a superior ultraportable laptop that the company proudly compares the notebook to Apple's 13-inch MacBook Pro. And in a lot of ways this notebook is better, thanks to a lighter weight, higher-resolution display, more storage space, and a Blu-ray drive.
      - list [ref=e118]:
        - listitem [ref=e119]:
          - button "Previous" [ref=e120]
        - listitem [ref=e121]:
          - button "Next" [ref=e122] [cursor=pointer]
  - generic [ref=e124]:
    - generic [ref=e127]:
      - heading "About Us" [level=4] [ref=e128]
      - paragraph [ref=e129]: We believe performance needs to be validated at every stage of the software development cycle and our open source compatible, massively scalable platform makes that a reality.
    - generic [ref=e132]:
      - heading "Get in Touch" [level=4] [ref=e133]
      - paragraph [ref=e134]: "Address: 2390 El Camino Real"
      - paragraph [ref=e135]: "Phone: +440 123456"
      - paragraph [ref=e136]: "Email: demo@blazemeter.com"
    - heading "PRODUCT STORE" [level=4] [ref=e140]:
      - img [ref=e141]
      - text: PRODUCT STORE
  - contentinfo [ref=e142]:
    - paragraph [ref=e143]: Copyright © Product Store
```

# Test source

```ts
  1   | import { Locator, Page } from '@playwright/test';
  2   | import { getEnvironmentConfig } from '../utils/config';
  3   | import { Product } from '../utils/dto/product.dto';
  4   | 
  5   | /**
  6   |  * DemoblazeProductPage represents the product listing page of Demoblaze.
  7   |  * It encapsulates all selectors and interactions for discovering and listing products.
  8   |  */
  9   | export class ProductListPage {
  10  |   readonly productLinks: Locator;
  11  |   readonly productContainers: Locator;
  12  |   readonly paginationContainer: Locator;
  13  |   readonly nextButton: Locator;
  14  | 
  15  |   /**
  16  |    * Creates an instance of DemoblazeProductPage.
  17  |    * @param page - The Playwright page object
  18  |    */
  19  |   constructor(readonly page: Page) {
  20  |     this.productLinks = this.page.locator('.hrefch');
  21  |     this.productContainers = this.page.locator('div.col-lg-4.col-md-6');
  22  |     this.paginationContainer = this.page.locator('ul.pagination');
  23  |     this.nextButton = this.paginationContainer.getByRole('button', { name: 'Next' });
  24  |   }
  25  | 
  26  |   /**
  27  |    * Navigates to the Demoblaze home page using the base URL from environment configuration.
  28  |    */
  29  |   async goto(): Promise<void> {
  30  |     const config = getEnvironmentConfig();
  31  |     await this.page.goto(config.baseUrl);
  32  |     await this.page.waitForLoadState('domcontentloaded');
  33  |   }
  34  | 
  35  |   /**
  36  |    * Waits for the product list to be fully loaded on the page.
  37  |    */
  38  |   async waitForProductsToLoad(): Promise<void> {
  39  |     await this.productLinks.first().waitFor({ state: 'visible' });
  40  |   }
  41  | 
  42  |   /**
  43  |    * Retrieves all products from the store with their name, price, and href.
  44  |    * @returns An array of Product objects containing name, price, and href
  45  |    */
  46  |   async getAllProducts(): Promise<Product[]> {
  47  |     await this.waitForProductsToLoad();
  48  | 
  49  |     const products = await this.page.evaluate(() => {
  50  |       const productItems = Array.from(
  51  |         document.querySelectorAll('div.col-lg-4.col-md-6')
  52  |       );
  53  | 
  54  |       return productItems.map((item) => {
  55  |         const nameElement = item.querySelector('h4.card-title a.hrefch');
  56  |         const priceElement = item.querySelector('.card-block h5');
  57  |         const linkElement = item.querySelector('a.hrefch');
  58  | 
  59  |         const name = nameElement?.textContent?.trim() || '';
  60  |         const price = priceElement?.textContent?.trim() || '';
  61  |         const href = linkElement?.getAttribute('href') || '';
  62  | 
  63  |         return {
  64  |           name,
  65  |           price,
  66  |           href,
  67  |         };
  68  |       });
  69  |     });
  70  | 
  71  |     return products;
  72  |   }
  73  | 
  74  |   /**
  75  |    * Gets the count of products currently displayed on the page.
  76  |    * @returns The number of products visible
  77  |    */
  78  |   async getProductCount(): Promise<number> {
  79  |     await this.waitForProductsToLoad();
  80  |     const count = await this.productContainers.count();
  81  |     return count;
  82  |   }
  83  | 
  84  |   /**
  85  |    * Navigates to the next page of products.
  86  |    * @returns True if navigation was successful, false if there is no next page
  87  |    */
  88  |   async goToNextPage(): Promise<boolean> {
  89  |     // Check if the Next button is disabled
  90  |     const isDisabled = await this.nextButton.evaluate((el) => {
  91  |       return el.classList.contains('disabled');
  92  |     }).catch(() => true);
  93  | 
  94  |     if (isDisabled) {
  95  |       return false;
  96  |     }
  97  | 
  98  |     // Click the Next button
> 99  |     await this.nextButton.click();
      |                           ^ Error: locator.click: Test timeout of 30000ms exceeded.
  100 |     await this.waitForProductsToLoad();
  101 |     return true;
  102 |   }
  103 | 
  104 |   /**
  105 |    * Retrieves all products from multiple pages up to a specified page number.
  106 |    * @param pageCount - The number of pages to retrieve products from
  107 |    * @returns An array of Product objects from all specified pages
  108 |    */
  109 |   async getAllProductsFromMultiplePages(pageCount: number): Promise<Product[]> {
  110 |     const allProducts: Product[] = [];
  111 | 
  112 |     for (let i = 0; i < pageCount; i++) {
  113 |       const products = await this.getAllProducts();
  114 |       allProducts.push(...products);
  115 | 
  116 |       // Navigate to next page if not on the last page
  117 |       if (i < pageCount - 1) {
  118 |         const hasNext = await this.goToNextPage();
  119 |         if (!hasNext) {
  120 |           break;
  121 |         }
  122 |       }
  123 |     }
  124 | 
  125 |     return allProducts;
  126 |   }
  127 | 
  128 |   /**
  129 |    * Clicks on the first product in the list to view its details.
  130 |    */
  131 |   async clickFirstProduct(): Promise<void> {
  132 |     await this.productLinks.first().click();
  133 |   }
  134 | 
  135 |   /**
  136 |    * Clicks on a product by its exact name.
  137 |    * @param productName - The exact name of the product to click
  138 |    */
  139 |   async clickProductByName(productName: string): Promise<void> {
  140 |     await this.page.getByRole('link', { name: productName, exact: true }).click();
  141 |   }
  142 | }
  143 | export { Product };
  144 | 
  145 | 
```