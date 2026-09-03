
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
│     │  ├─ Products
│     │  │  ├─ api
│     │  │  │  └─ Product.api.js
│     │  │  ├─ component
│     │  │  │  └─ Product-card.jsx
│     │  │  ├─ hooks
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
│     │  └─ Profile
│     │     ├─ api
│     │     │  └─ profile.api.js
│     │     ├─ Component
│     │     │  ├─ Address_manager.jsx
│     │     │  ├─ AvatarUploader.jsx
│     │     │  ├─ Order-History.jsx
│     │     │  ├─ Profile-SideBar.jsx
│     │     │  ├─ ProfileForm.jsx
│     │     │  ├─ ProfileSettings.jsx
│     │     │  └─ UserCard.jsx
│     │     ├─ Hooks
│     │     │  ├─ useAddressManager.js
│     │     │  ├─ useAvatarUploader.js
│     │     │  ├─ useOrderhistory.js
│     │     │  ├─ useProfile.js
│     │     │  ├─ useProfileForm.js
│     │     │  └─ useShowCard.js
│     │     ├─ pages
│     │     │  └─ ProfilePage.jsx
│     │     ├─ routes
│     │     │  └─ profile.routes.js
│     │     ├─ Store
│     │     │  └─ profile.store.js
│     │     ├─ Styles
│     │     │  └─ Profile.css
│     │     └─ Utils
│     │        └─ useFetchProfile.js
│     ├─ index.js
│     ├─ Pages
│     │  └─ Homepage.jsx
│     ├─ routes
│     │  └─ index.jsx
│     └─ shared
│        ├─ Assets
│        ├─ Components
│        │  ├─ Footer.jsx
│        │  └─ Navbar.jsx
│        ├─ Layout
│        │  └─ MainLayout.jsx
│        ├─ services
│        │  └─ axiosInstance.js
│        └─ Styles
│           └─ Shared.css
├─ Database
│  ├─ Database-design
│  │  ├─ Database-Design(Modified).mwb
│  │  └─ Database-Design(Modified).mwb.bak
│  ├─ DB_Creation.sql
│  ├─ Joins.sql
│  ├─ Products
│  │  └─ Queries.sql
│  ├─ Profile
│  │  ├─ Procedures
│  │  │  ├─ Add_Card_procedure.sql
│  │  │  ├─ Add_userAddress.sql
│  │  │  └─ Get_Profile_stats.sql
│  │  └─ Views
│  │     ├─ user_address.sql
│  │     ├─ user_card.sql
│  │     └─ user_orders.sql
│  └─ Views.sql
├─ package-lock.json
├─ package.json
├─ react_ui_libraries_reference.md
├─ server
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ server.js
│  └─ src
│     ├─ app.js
│     ├─ Features
│     │  ├─ Auth
│     │  │  ├─ auth.controller.js
│     │  │  ├─ auth.repository.js
│     │  │  ├─ auth.routes.js
│     │  │  ├─ auth.service.js
│     │  │  └─ auth.validation.js
│     │  ├─ Product
│     │  │  ├─ Product.controller.js
│     │  │  ├─ Product.repository.js
│     │  │  ├─ Product.routes.js
│     │  │  └─ Product.services.js
│     │  └─ Profile
│     │     ├─ profile.controller.js
│     │     ├─ profile.repository.js
│     │     ├─ profile.routes.js
│     │     └─ profile.service.js
│     ├─ shared
│     │  ├─ Database
│     │  │  ├─ DB.js
│     │  │  └─ Seeding_DB.js
│     │  ├─ Middleware
│     │  │  ├─ auth.middleware.js
│     │  │  └─ upload.middleware.js
│     │  └─ utils
│     │     ├─ generateToken.js
│     │     └─ sendEmail.js
│     └─ uploads
│        └─ avatars
│           ├─ 1788385163106-811654438.png
│           ├─ 1788385213513-933690097.png
│           ├─ 1788407115251-153654957.jpg
│           └─ 1788407243500-303820493.png
└─ Things to Revise on it
   ├─ GITHUB.md
   ├─ problems.md
   ├─ Project Current-state.md
   ├─ Project_bluePrint.md
   └─ Zustand.md

```