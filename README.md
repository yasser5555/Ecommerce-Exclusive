
```
Execlusive_Ecommerce
├─ client
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  ├─ README.md
│  └─ src
│     ├─ App.jsx
│     ├─ features
│     │  ├─ About
│     │  │  ├─ Components
│     │  │  │  ├─ BenefitsSection.jsx
│     │  │  │  ├─ hereoSection.jsx
│     │  │  │  ├─ StatsSection.jsx
│     │  │  │  └─ TeamSection.jsx
│     │  │  ├─ pages
│     │  │  │  └─ About.jsx
│     │  │  └─ routes
│     │  │     └─ About.routes.jsx
│     │  ├─ Admin
│     │  │  ├─ api
│     │  │  │  └─ admin.api.js
│     │  │  ├─ Component
│     │  │  │  └─ Sidebar.jsx
│     │  │  ├─ pages
│     │  │  │  ├─ AdminHome.jsx
│     │  │  │  ├─ Categories.jsx
│     │  │  │  ├─ Dashboard.jsx
│     │  │  │  ├─ Orders.jsx
│     │  │  │  ├─ Products.jsx
│     │  │  │  ├─ Reports.jsx
│     │  │  │  ├─ Settings.jsx
│     │  │  │  └─ Users.jsx
│     │  │  ├─ routes
│     │  │  │  └─ admin.routes.js
│     │  │  └─ Store
│     │  │     └─ Admin.store.js
│     │  ├─ auth
│     │  │  ├─ api
│     │  │  │  └─ auth.Api.js
│     │  │  ├─ Assets
│     │  │  │  └─ log_and_reg.png
│     │  │  ├─ components
│     │  │  │  ├─ ForgotPasswordForm.jsx
│     │  │  │  ├─ LoginForm.jsx
│     │  │  │  ├─ RegisterForm.jsx
│     │  │  │  └─ ResetPasswordForm.jsx
│     │  │  ├─ hooks
│     │  │  │  ├─ useAuth.js
│     │  │  │  ├─ useResetPassword.js
│     │  │  │  ├─ useUserLogin.js
│     │  │  │  └─ useUserRegister.js
│     │  │  ├─ layouts
│     │  │  │  └─ AuthLayout.jsx
│     │  │  ├─ pages
│     │  │  │  ├─ ForgotPasswordPage.jsx
│     │  │  │  ├─ LoginPage.jsx
│     │  │  │  ├─ RegisterPage.jsx
│     │  │  │  └─ ResetPasswordPage.jsx
│     │  │  ├─ routes
│     │  │  │  ├─ auth.routes.js
│     │  │  │  └─ ProtectedRoute.jsx
│     │  │  ├─ store
│     │  │  │  └─ auth.store.js
│     │  │  └─ Styles
│     │  │     ├─ login.css
│     │  │     └─ register.css
│     │  ├─ Cart
│     │  │  ├─ api
│     │  │  │  └─ Cart.api.js
│     │  │  ├─ Component
│     │  │  │  ├─ Cart-Summary.jsx
│     │  │  │  ├─ Cart-table.jsx
│     │  │  │  └─ Coupon.jsx
│     │  │  ├─ Hooks
│     │  │  │  ├─ useCart.jsx
│     │  │  │  ├─ useCartSummary.jsx
│     │  │  │  ├─ useCartTable.jsx
│     │  │  │  └─ useShoppingCart.jsx
│     │  │  ├─ Page
│     │  │  │  └─ shopping-cart.jsx
│     │  │  ├─ routes
│     │  │  │  └─ Cart.routes.js
│     │  │  ├─ store
│     │  │  │  └─ Cart.store.js
│     │  │  └─ styles
│     │  │     └─ ProductCard.css
│     │  ├─ Checkout
│     │  │  ├─ Components
│     │  │  │  ├─ Billing Details.jsx
│     │  │  │  └─ Order_Summary.jsx
│     │  │  ├─ Hooks
│     │  │  │  ├─ useBillingDetails.jsx
│     │  │  │  └─ useOrderSummary.jsx
│     │  │  ├─ Pages
│     │  │  │  └─ checkout.jsx
│     │  │  ├─ routes
│     │  │  │  └─ checkout.routes.jsx
│     │  │  └─ Store
│     │  │     └─ Checkout.store.js
│     │  ├─ Contact
│     │  │  ├─ Api
│     │  │  │  └─ Contact.api.js
│     │  │  ├─ Component
│     │  │  ├─ Hooks
│     │  │  ├─ Pages
│     │  │  │  └─ contact.jsx
│     │  │  ├─ routes
│     │  │  │  └─ contact.routes.js
│     │  │  └─ Store
│     │  │     └─ Contact.store.js
│     │  ├─ Home
│     │  │  ├─ Api
│     │  │  │  └─ Home.api.js
│     │  │  ├─ Components
│     │  │  │  ├─ FEATURED.jsx
│     │  │  │  ├─ heroSection.jsx
│     │  │  │  ├─ quick Catogeries.jsx
│     │  │  │  ├─ Recently Added.jsx
│     │  │  │  ├─ SHOPPING EXPERIENCE.jsx
│     │  │  │  ├─ TRENDING NOW.jsx
│     │  │  │  └─ why Choose us.jsx
│     │  │  ├─ Hooks
│     │  │  ├─ pages
│     │  │  │  └─ Home.jsx
│     │  │  ├─ routes
│     │  │  │  └─ Home.routes.jsx
│     │  │  └─ Store
│     │  │     └─ Home.store.js
│     │  ├─ Order
│     │  │  ├─ Api
│     │  │  │  └─ Order.api.js
│     │  │  ├─ Components
│     │  │  │  ├─ DeliveryAddress.jsx
│     │  │  │  ├─ Introduction.jsx
│     │  │  │  ├─ Orderedproducts.jsx
│     │  │  │  └─ SideBar.jsx
│     │  │  ├─ Hooks
│     │  │  │  └─ useMyOrders.js
│     │  │  ├─ Pages
│     │  │  │  ├─ MyOrders.jsx
│     │  │  │  ├─ OrderConfirmation.jsx
│     │  │  │  └─ OrderDetails.jsx
│     │  │  ├─ routes
│     │  │  │  └─ order.routes.jsx
│     │  │  └─ Store
│     │  │     └─ Orders.store.js
│     │  ├─ Products
│     │  │  ├─ api
│     │  │  │  └─ Product.api.js
│     │  │  ├─ component
│     │  │  │  ├─ Product-card.jsx
│     │  │  │  ├─ ProductFilterSidebar.jsx
│     │  │  │  └─ ProductReviews.jsx
│     │  │  ├─ hooks
│     │  │  │  ├─ useProductBar.js
│     │  │  │  ├─ useProductdetails.js
│     │  │  │  ├─ useProductPage.js
│     │  │  │  ├─ useProductReviews.js
│     │  │  │  └─ useProductStore.js
│     │  │  ├─ Page
│     │  │  │  ├─ Productdetails.jsx
│     │  │  │  └─ Productspage.jsx
│     │  │  ├─ routes
│     │  │  │  └─ Products.routes.js
│     │  │  ├─ store
│     │  │  │  └─ product.store.js
│     │  │  └─ styles
│     │  │     └─ ProductCard.css
│     │  ├─ Profile
│     │  │  ├─ api
│     │  │  │  └─ profile.api.js
│     │  │  ├─ Component
│     │  │  │  ├─ Address_manager.jsx
│     │  │  │  ├─ AvatarUploader.jsx
│     │  │  │  ├─ Profile-SideBar.jsx
│     │  │  │  ├─ ProfileForm.jsx
│     │  │  │  ├─ ProfileSettings.jsx
│     │  │  │  └─ UserCard.jsx
│     │  │  ├─ Hooks
│     │  │  │  ├─ useAddressManager.js
│     │  │  │  ├─ useAvatarUploader.js
│     │  │  │  ├─ useOrderhistory.js
│     │  │  │  ├─ useProfile.js
│     │  │  │  ├─ useProfileForm.js
│     │  │  │  └─ useShowCard.js
│     │  │  ├─ pages
│     │  │  │  └─ ProfilePage.jsx
│     │  │  ├─ routes
│     │  │  │  └─ profile.routes.js
│     │  │  ├─ Store
│     │  │  │  └─ profile.store.js
│     │  │  └─ Styles
│     │  │     └─ Profile.css
│     │  ├─ Settings
│     │  │  ├─ Pages
│     │  │  │  └─ Setting.jsx
│     │  │  └─ routes
│     │  │     └─ setting.routes.js
│     │  └─ Wishlist
│     │     ├─ api
│     │     │  └─ Wishlist.api.js
│     │     ├─ Component
│     │     │  └─ WishlistCard.jsx
│     │     ├─ Hooks
│     │     │  └─ useWishlist.js
│     │     ├─ pages
│     │     │  └─ Wishlist Page.jsx
│     │     ├─ routes
│     │     │  └─ Wishlist.routes.js
│     │     ├─ Store
│     │     │  └─ Wishlist.store.js
│     │     └─ Styles
│     │        └─ Profile.css
│     ├─ index.js
│     ├─ routes
│     │  └─ index.jsx
│     └─ shared
│        ├─ Components
│        │  ├─ Footer.jsx
│        │  └─ Navbar.jsx
│        ├─ Layout
│        │  ├─ AdminLayout.jsx
│        │  └─ MainLayout.jsx
│        ├─ services
│        │  └─ axiosInstance.js
│        ├─ Styles
│        │  └─ Shared.css
│        └─ Utils
│           ├─ useChangeTitle.js
│           ├─ useFetch.js
│           └─ useheavyFetch.js
├─ Database
│  ├─ Admin
│  │  ├─ Procedures
│  │  │  ├─ DeleteAdminProduct.sql
│  │  │  ├─ GetAdminDashboard.sql
│  │  │  ├─ GetAdminProduct.sql
│  │  │  ├─ search_product.sql
│  │  │  └─ Update_column.sql
│  │  └─ Quiries.sql
│  ├─ Cart
│  │  ├─ Quieries.sql
│  │  └─ Views
│  │     └─ user_cart_items.sql
│  ├─ Database-design
│  │  ├─ Database-Design(Modified).mwb
│  │  ├─ Database-Design(Modified).mwb.bak
│  │  ├─ Database-Design(Modified).mwb.beforefix
│  │  └─ DB_Design.pdf
│  ├─ DB_Creation.sql
│  ├─ Home
│  │  └─ queires.sql
│  ├─ Joins.sql
│  ├─ Orders
│  │  ├─ Procedure
│  │  │  ├─ Create_order.sql
│  │  │  ├─ GetuserOrder.sql
│  │  │  ├─ PayOrder.procedure.sql
│  │  │  └─ SearchForProduct in order.sql
│  │  ├─ Quieries.sql
│  │  └─ Views
│  │     ├─ user_order.sql
│  │     └─ user_order_history.sql
│  ├─ Products
│  │  ├─ joins.sql
│  │  ├─ Procedure
│  │  │  ├─ Filter_Product.sql
│  │  │  ├─ get_all_products.sql
│  │  │  ├─ get_product_by_id.sql
│  │  │  └─ Get_Product_position.sql
│  │  ├─ Product_Views.sql
│  │  └─ Queries.sql
│  ├─ Product_reviews
│  │  ├─ Quieries.sql
│  │  └─ Views
│  │     └─ Product_comments.sql
│  ├─ Profile
│  │  ├─ Procedures
│  │  │  ├─ Add_Card_procedure.sql
│  │  │  ├─ Add_userAddress.sql
│  │  │  └─ Get_Profile_stats.sql
│  │  └─ Views
│  │     ├─ user_address.sql
│  │     ├─ user_card.sql
│  │     └─ user_orders.sql
│  ├─ Views.sql
│  └─ WishList
│     ├─ Procedure
│     │  ├─ add_to_wishlist.sql
│     │  ├─ get_user_wishlist.sql
│     │  └─ remove_from_wishlist.sql
│     ├─ Quieries.sql
│     └─ Views
│        └─ WishList_page.sql
├─ package-lock.json
├─ package.json
├─ Project Description.md
└─ server
   ├─ .env
   ├─ package-lock.json
   ├─ package.json
   ├─ server.js
   └─ src
      ├─ app.js
      ├─ Features
      │  ├─ Admin
      │  │  ├─ Admin.controller.js
      │  │  ├─ Admin.repo.js
      │  │  ├─ Admin.routes.js
      │  │  └─ Admin.service.js
      │  ├─ Auth
      │  │  ├─ auth.controller.js
      │  │  ├─ auth.repository.js
      │  │  ├─ auth.routes.js
      │  │  ├─ auth.service.js
      │  │  └─ auth.validation.js
      │  ├─ Cart_items
      │  │  ├─ Cart_items.controller.js
      │  │  ├─ Cart_items.repository.js
      │  │  ├─ Cart_items.routes.js
      │  │  └─ Cart_items.services.js
      │  ├─ Contact
      │  │  ├─ contact.controller.js
      │  │  ├─ contact.routes.js
      │  │  └─ contact.service.js
      │  ├─ Home
      │  │  ├─ Home.controller.js
      │  │  ├─ Home.repo.js
      │  │  ├─ Home.routes.js
      │  │  └─ Home.services.js
      │  ├─ Orders
      │  │  ├─ Order.controller.js
      │  │  ├─ Order.repo.js
      │  │  ├─ Order.routes.js
      │  │  └─ Order.services.js
      │  ├─ Product
      │  │  ├─ Product.controller.js
      │  │  ├─ Product.repository.js
      │  │  ├─ Product.routes.js
      │  │  └─ Product.services.js
      │  ├─ Product_Reviews
      │  │  ├─ Product_Reviews.controller.js
      │  │  ├─ Product_Reviews.repository.js
      │  │  ├─ Product_Reviews.routes.js
      │  │  └─ Product_Reviews.service.js
      │  ├─ Profile
      │  │  ├─ profile.controller.js
      │  │  ├─ profile.repository.js
      │  │  ├─ profile.routes.js
      │  │  └─ profile.service.js
      │  └─ Wishlists
      │     ├─ wishlist.controller.js
      │     ├─ wishlist.repository.js
      │     ├─ wishlist.routes.js
      │     └─ wishlist.service.js
      ├─ shared
      │  ├─ Database
      │  │  ├─ DB.js
      │  │  └─ Seeding_Products_review.js
      │  ├─ Middleware
      │  │  ├─ auth.middleware.js
      │  │  └─ upload.middleware.js
      │  └─ utils
      │     ├─ generateToken.js
      │     └─ sendEmail.js
      └─ uploads
         ├─ avatars
         │  ├─ 1788385163106-811654438.png
         │  ├─ 1788385213513-933690097.png
         │  ├─ 1788407115251-153654957.jpg
         │  ├─ 1788407243500-303820493.png
         │  ├─ 1788745305450-36171925.jpg
         │  ├─ 1789510038732-9142696.png
         │  ├─ 1789861576334-820928510.png
         │  ├─ 1789865626600-944881227.jpg
         │  ├─ 1789865658500-312474556.jpg
         │  ├─ 1789865689830-31595252.jpg
         │  ├─ 1789865739181-360119743.jpg
         │  └─ 1789866068256-818095875.jpg
         └─ Products

```