# Masha Store — Colorful Clothing Store

This is a responsive static storefront starter configured for a mixed clothing catalog and both retail + wholesale enquiries.

## Current features
- Homepage, shop grid and category filters for T-shirts, hoodies, sweatshirts, joggers/track pants, tracksuits/cord sets, shirts and jackets
- Size selection on each demo product
- Shopping cart with quantities and subtotal
- WhatsApp order-message generation
- Wholesale enquiry link
- Mobile-responsive layout

## Next setup step
1. Extract this ZIP.
2. Open `index.html` in your browser to preview the storefront.
3. Open `app.js` in a text editor.
4. Replace `STORE.brand` with your chosen name when ready.
5. Replace `STORE.whatsappNumber` with your WhatsApp number, digits only, including country code (India: `91` + mobile number).
6. Edit the `products` list: real names, prices, categories, colors and sizes.
7. Replace the abstract CSS garment placeholders with real product images before sharing publicly.

## Free hosting
1. Sign in at https://github.com/ and create a public repository, e.g. `clothing-store`.
2. Upload `index.html`, `styles.css`, `app.js` and `README.md` at the repository root.
3. Go to **Settings → Pages**.
4. Select **Deploy from a branch**, choose branch `main` and folder `/(root)`, then Save.
5. Open the published URL shown in the Pages settings after deployment finishes.

## Important
This is a front-end prototype. WhatsApp order messages can be prepared after you add your number, but this does not automatically reserve inventory or securely store customer orders. The online payment button is a placeholder. GitHub Pages cannot run server-side code. Before accepting online payments, connect a reputable payment provider and a backend/serverless function; never expose payment secret keys in public JavaScript. Provider charges, identity checks, free-tier limits and legal/tax requirements may apply.
