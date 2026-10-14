# UI Animations

The app uses [Framer Motion](https://www.framer.com/motion/) for interface transitions. The animations are presentational: they do not change cart, wishlist, pagination, or product data behavior.

## Add to cart

When a product is successfully added from a product card, product details, or the wishlist, its image flies from its current on-screen position to the shopping-cart icon in the navbar. The navbar cart icon also gives a short bounce. The animation uses the image and cart icon bounding rectangles, so it works across different screen sizes and scroll positions. Duplicate or failed additions do not trigger the animation.

The animation is shared through `src/shared/Store/cartAnimation.store.js` and displayed by `src/shared/Components/Navbar.jsx`.

## Cart and wishlist removals

Removing a cart row or wishlist item fades and slides the item left while reducing its height. Neighboring items use a layout transition to close the gap smoothly. The empty-state message appears when the final item has been removed. These exits occur after the underlying data updates.

## Product pagination

When the product list changes, the current grid fades and moves out, then the new grid fades and moves into place. This transition is implemented in `src/features/User/Products/Page/Productspage.jsx`.

## Home page scroll reveals

Home page sections fade in and rise slightly when they enter the viewport. Each section reveals once per page visit.
