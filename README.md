# Masha Store — Custom Storefront

## Included
- Graphic/printed fashion design direction with pink, lime, blue and bold typography
- Mixed clothing categories: T-shirts, hoodies, sweatshirts, joggers/track pants, tracksuits/cord sets, shirts and jackets
- Size selectors and cart
- WhatsApp order request and bulk enquiry placeholders
- Online payment button disabled until secure checkout is implemented

## Important before accepting real orders
All displayed products and prices are DEMO examples. Replace them with accurate inventory, prices, photos and sizes. Add your WhatsApp number in `app.js` (`STORE.whatsappNumber`) as digits only, including country code. Do not publish until contact details, shipping/returns policies and product information are accurate.

## Add your product photos
1. Create a folder named `images` in the repository.
2. Upload product photos into that folder, e.g. `graphic-tee.jpg`.
3. In `app.js`, set the corresponding product's `image` field to `images/graphic-tee.jpg`.
4. Commit the changes. GitHub Pages will redeploy.

## Publish updated files
1. Open your `clothing-store` repository on GitHub.
2. Click **Add file → Upload files**.
3. Upload the new `index.html`, `styles.css`, `app.js` and `README.md` from this folder to the repository root, replacing the existing versions.
4. Commit changes.
5. Wait for the Pages build to complete, then refresh the website with Ctrl+F5.

Online payments are intentionally disabled. GitHub Pages is static hosting; secure payments require a reputable provider plus backend/serverless handling. Never put payment secret keys in public JavaScript.
