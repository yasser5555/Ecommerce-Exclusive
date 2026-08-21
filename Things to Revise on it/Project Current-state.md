# Project Current State — AI Context

# Authentication

## Auth Feature Structure

```text
auth/
├── api
├── components
├── hooks
├── layouts
├── pages
├── routes
└── store
```

Implemented:

* Login
* Register
* Forgot Password
* Reset Password
* Zustand Authentication Store
* JWT Auth
* React Router Issues

---

## React Router Issue

### Problem

You had:

```js
{
  path: "/auth",
  children: [
    {
      path: "/login",
    }
  ]
}
```

React Router threw:

```text
Absolute route path "/login" nested under path "/auth" is not valid
```

### Fix

Use a relative child route:

```js
{
  path: "login"
}
```

---

## Default Route

We made:

```text
/
↓
/auth/login
```

---

# Login Form

Implemented:

* Controlled inputs
* Zustand login action
* Toast notifications
* Redirect after success

```js
navigate("/profile", {
  replace: true,
});
```

---

# Register Form

Implemented:

* Name
* Email
* Password

Database-compatible payload:

```js
{
  name: "",
  email: "",
  password: ""
}
```

---

# Forgot Password Feature

Backend:

```text
POST /api/auth/forgot-password
POST /api/auth/reset-password/:token
```

Implemented:

* Reset token generation
* DB token storage
* Email sending
* Password reset page

## Email Customization

Built a custom Exclusive email with:

* Red branding
* Personalized greeting
* Reset Password button
* Expiration notice
* Fallback link

Fixed:

```html
href="${resetLink}"
```

instead of malformed links.

---

# Profile Backend

Implemented:

```text
GET /api/profile
PUT /api/profile
```

Architecture:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
Database
```

## Important Architecture Lesson

### Route

Maps the endpoint:

```js
router.post(...)
```

### Controller

Handles:

* `req`
* `res`
* `status()`
* `json()`

✅ Sends the HTTP response.

### Service

Handles business logic.

✅ No `res.status()`
✅ No direct HTTP response handling

### Repository

Handles database operations.

✅ No `req`
✅ No `res`

---

# Avatar Upload

Implemented avatar upload using:

```text
Multer
```

Endpoint:

```text
POST /api/profile/uploadAvatar
```

The uploaded file is stored under:

```text
uploads/avatars/
```

The database stores a relative path such as:

```text
uploads/avatars/1786398923422-676044744.png
```

---

# Avatar Upload Data Flow

The current working flow is:

```text
React
  ↓
FormData
  ↓
uploadAvatar()
  ↓
Axios
  ↓
Express
  ↓
Multer
  ↓
uploads/avatars/
  ↓
Database
  ↓
fetchProfile()
  ↓
Zustand
  ↓
React
  ↓
<img>
```

---

# Profile Frontend Architecture

The Profile feature uses Zustand.

Current structure is approximately:

```text
Profile/
├── api/
│   └── profile.api.js
├── Components/
│   ├── AvatarUploader.jsx
│   └── ProfileForm.jsx
├── Hooks/
│   └── useProfile.js
├── Styles/
│   └── Profile.css
└── Store/
    └── profile.store.js
```

The store contains:

```js
{
  profile: null,
  isLoading: false,
  error: null
}
```

---

# Profile API

Current API functions include:

```js
getProfileRequest()
updateProfileRequest()
uploadAvatarRequest()
updataAvatarRequest()
```

The API functions return:

```js
response.data
```

Therefore, when calling them:

```js
const response = await uploadAvatarRequest(payload);
```

`response` is already the API response data.

Do NOT assume:

```js
response.data
```

exists again.

---

# Avatar Upload Response

The backend returns something similar to:

```js
{
  message: "Avatar updated successfully",
  user: {
    id: 1,
    name: "...",
    email: "...",
    avatar: "uploads/avatars/image.png"
  }
}
```

Therefore, after uploading:

```js
set({
  profile: response.user,
  isLoading: false
});
```

The Zustand `profile` should represent the user directly:

```js
profile = {
  id: 1,
  name: "...",
  email: "...",
  avatar: "uploads/avatars/image.png"
}
```

Therefore:

```js
profile.avatar
```

is correct.

This is incorrect:

```js
profile.user.avatar
```

because `profile.user` does not exist after storing `response.user` in `profile`.

---

# `profile` Initially Being `null`

The Profile store starts with:

```js
profile: null
```

Therefore, this can cause an error during the initial render:

```js
profile.avatar
```

because `profile` may not exist yet.

Use:

```js
profile?.avatar
```

instead.

Example:

```jsx
<img
  src={
    profile?.avatar
      ? `http://localhost:5000/${profile.avatar}`
      : "default-avatar.png"
  }
/>
```

---

# Avatar Refresh Issue

After uploading the avatar:

```js
await uploadAvatar(formData);
```

the `profile` variable inside the currently executing function may still contain the previous value.

This is because Zustand updates the state and React performs a new render afterward.

Therefore, when the latest profile is needed immediately inside the same function:

```js
const latestProfile = await fetchProfile();

console.log(latestProfile.avatar);
```

`latestProfile` contains the newly fetched data.

After the component re-renders, `profile` will also contain the updated avatar.

---

# Avatar Display Problem

The avatar was successfully:

* Uploaded
* Stored on the server
* Stored in the database
* Returned by the API
* Retrieved by `fetchProfile()`

However, the image was not rendering.

The returned path was:

```text
uploads/avatars/1786398923422-676044744.png
```

The frontend generated:

```text
http://localhost:5000/uploads/avatars/1786398923422-676044744.png
```

The problem was not React, Zustand, MySQL, or Multer.

The problem was the Express static-file configuration.

---

# Express Static File Problem

The incorrect configuration was:

```js
express.static(
  path.join(__dirname, "src/uploads")
)
```

Since:

```text
__dirname = server/src
```

Express was looking for:

```text
server/src/src/uploads
```

which did not exist.

---

# Final Solution

The correct configuration is:

```js
express.static(
  path.join(__dirname, "uploads")
)
```

This correctly points to:

```text
server/src/uploads
```

The final mapping becomes:

```text
Browser Request

/uploads/avatars/image.png
        ↓
Express
        ↓
server/src/uploads/avatars/image.png
        ↓
Image
```

---

# Important Concept

## Multer vs `express.static()`

These two have different responsibilities.

### Multer

Responsible for:

> Saving uploaded files.

```text
User
 ↓
Multer
 ↓
uploads/avatars/image.png
```

### `express.static()`

Responsible for:

> Making saved files accessible through a URL.

```text
Browser
 ↓
/uploads/avatars/image.png
 ↓
express.static()
 ↓
uploads/avatars/image.png
```

---

# Infinite Loading Investigation

We investigated:

## Auth Store

Changed:

```js
isLoading: true
```

to:

```js
isLoading: false
```

---

## Login Service

Checked:

```js
login()
```

and confirmed it wasn't the issue.

---

## Auth API

Checked:

```js
loginRequest()
```

and confirmed it wasn't the issue.

---

## Profile Page

Replaced with:

```jsx
function ProfilePage() {
  return "Profile Works ✅";
}
```

Infinite loading still happened.

Therefore, Profile Page wasn't the issue.

---

# The Real Infinite Loading Bug ✅

It was inside:

```text
ProtectedRoute.jsx
```

### Problem

The route was checking:

```text
/login
```

but the actual login route was:

```text
/auth/login
```

### Fixed Flow

```text
/
↓
/auth/login
↓
Login
↓
/profile
```

If there is no token:

```text
/profile
↓
/auth/login
```

After fixing `ProtectedRoute.jsx`:

✅ Infinite loading disappeared.

---

# Current Project Status

## Authentication

✅ Authentication Feature
✅ Register
✅ Login
✅ Forgot Password
✅ Reset Password
✅ JWT Authentication
✅ Zustand Persist
✅ Protected Routes
✅ React Router Configuration

## Profile

✅ Profile Backend
✅ Profile Frontend Skeleton
✅ GET Profile
✅ UPDATE Profile
✅ Avatar Upload
✅ Multer Configuration
✅ Avatar Database Path
✅ Zustand Profile Store
✅ Avatar Rendering
✅ Express Static Files
✅ Profile Refresh After Upload

## Bugs Fixed

✅ Nested React Router `/login` issue
✅ ProtectedRoute `/login` vs `/auth/login` issue
✅ Infinite loading
✅ `profile === null` rendering error
✅ `profile.user === undefined` issue
✅ `response.data === undefined` issue
✅ Avatar upload state update issue
✅ Avatar image URL issue
✅ Express `express.static()` path issue

---

# Most Important Lessons Learned

### 1. Always understand the shape of API responses

For example:

```js
{
  message: "...",
  user: {...}
}
```

means:

```js
response.user
```

not:

```js
response.data.user
```

if the API function already returns `response.data`.

### 2. Separate file storage from file serving

```text
Multer
→ Saves the file

express.static()
→ Serves the file
```

### 3. Understand React state updates

Updating Zustand does not change the already-running function's local `profile` variable immediately.

A new React render receives the updated state.

### 4. Be careful with route paths

These are different:

```text
/login
/auth/login
```

A protected route must redirect to the route that actually exists.

### 5. Understand `__dirname`

If:

```text
__dirname = server/src
```

then:

```js
path.join(__dirname, "uploads")
```

means:

```text
server/src/uploads
```

while:

```js
path.join(__dirname, "src/uploads")
```

means:

```text
server/src/src/uploads
```

---

# Current Avatar Architecture

```text
Frontend
│
├── AvatarUploader.jsx
│      │
│      └── FormData
│
├── useProfile.js
│      │
│      └── uploadAvatar()
│
├── profile.store.js
│      │
│      └── Zustand
│
└── profile.api.js
       │
       └── Axios
              │
              ▼
Backend
│
├── Route
│
├── Controller
│
├── Service
│
├── Repository
│
└── Multer
       │
       ▼
uploads/avatars/
       │
       ▼
Database
       │
       ▼
fetchProfile()
       │
       ▼
Zustand
       │
       ▼
React
       │
       ▼
<img src="http://localhost:5000/uploads/avatars/...">
       │
       ▼
Express static middleware
       │
       ▼
Image
```

---

# Final Project State

The Profile Avatar feature is currently working correctly.

The major issue that remained was the Express static path:

```js
path.join(__dirname, "src/uploads")
```

which was corrected to:

```js
path.join(__dirname, "uploads")
```

because `__dirname` already points to the `src` directory.

The authentication, routing, profile, Zustand state management, avatar upload, database storage, and avatar rendering flows are now functioning together.
