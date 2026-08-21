# Zustand Revision

> A concise revision guide for Zustand in React.

---

# 1. What is Zustand?

**Zustand** is a lightweight state-management library for React.

It allows you to store:

* Global state
* State updates
* Actions
* Async operations

without needing Context Providers.

Basic flow:

```text
Component
   ↓
Zustand Store
   ↓
State / Actions
   ↓
Component re-renders
```

---

# 2. Create a Store

```js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  isLoading: false,

  setUser: (user) => {
    set({
      user: user,
    });
  },
}));
```

`create()` creates a React hook that can be used inside components.

---

# 3. State

State is simply the data stored inside the store.

```js
create((set) => ({
  user: null,
  isLoading: false,
  error: null,
}));
```

Example:

```js
user: null
isLoading: false
error: null
```

---

# 4. Updating State

Use `set()`.

```js
set({
  isLoading: true,
});
```

Example:

```js
set({
  user: response,
  isLoading: false,
});
```

You don't need:

```js
setState()
```

or:

```js
dispatch()
```

---

# 5. Actions

Actions are functions stored inside the Zustand store.

```js
export const useUserStore = create((set) => ({
  user: null,

  setUser: (user) => {
    set({
      user,
    });
  },
}));
```

The action:

```js
setUser()
```

changes the state.

---

# 6. Reading State in Components

You can access the store directly:

```js
const { user, setUser } = useUserStore();
```

Then:

```js
console.log(user);
```

and:

```js
setUser(newUser);
```

---

# 7. Selectors

Instead of getting the entire store:

```js
const { user } = useUserStore();
```

you can select only what you need:

```js
const user = useUserStore((state) => state.user);
```

This is useful for controlling re-renders.

---

# 8. Async Actions

Zustand actions can be asynchronous.

Example:

```js
fetchUser: async () => {
  try {
    set({
      isLoading: true,
      error: null,
    });

    const response = await getUserRequest();

    set({
      user: response,
      isLoading: false,
    });

    return response;
  } catch (error) {
    set({
      error: error.message,
      isLoading: false,
    });
  }
},
```

Typical flow:

```text
Action starts
    ↓
isLoading = true
    ↓
API Request
    ↓
Success
    ↓
Update State
    ↓
isLoading = false
```

---

# 9. API + Zustand

A clean architecture is:

```text
Component
    ↓
Hook
    ↓
Zustand Store
    ↓
API Function
    ↓
Backend
```

Example:

### API

```js
export const getProfileRequest = async () => {
  const response = await api.get("/profile");

  return response.data;
};
```

### Store

```js
fetchProfile: async () => {
  const response = await getProfileRequest();

  set({
    profile: response,
  });

  return response;
},
```

### Component

```js
const { profile, fetchProfile } = useProfile();

await fetchProfile();
```

---

# 10. Zustand Store with CRUD

A typical Profile store:

```js
export const useProfileStore = create((set) => ({
  profile: null,
  isLoading: false,
  error: null,

  fetchProfile: async () => {},

  updateProfile: async (payload) => {},

  uploadAvatar: async (payload) => {},

  deleteProfile: async () => {},
}));
```

The store contains:

```text
State
+
Actions
```

---

# 11. Returning Data from Actions

This is useful when the component needs the API result immediately.

```js
fetchProfile: async () => {
  const response = await getProfileRequest();

  set({
    profile: response,
  });

  return response;
},
```

Then:

```js
const latestProfile = await fetchProfile();

console.log(latestProfile);
```

---

# 12. Important: State Update vs Local Variable

After:

```js
await uploadAvatar(formData);
```

don't assume the local `profile` variable immediately changes inside the same function.

For example:

```js
await uploadAvatar(formData);

console.log(profile);
```

may still contain the old value.

Why?

```text
Zustand updates state
        ↓
React schedules re-render
        ↓
Component renders again
        ↓
New profile value
```

If you need the new value immediately:

```js
const latestProfile = await fetchProfile();

console.log(latestProfile);
```

---

# 13. Initial `null` State

A common pattern:

```js
profile: null
```

Therefore this can fail:

```js
profile.avatar
```

Use:

```js
profile?.avatar
```

or conditionally render:

```jsx
{profile && (
  <h2>{profile.name}</h2>
)}
```

---

# 14. Updating Based on Previous State

When the new state depends on the old state:

```js
set((state) => ({
  count: state.count + 1,
}));
```

Example:

```js
increase: () => {
  set((state) => ({
    count: state.count + 1,
  }));
},
```

Use this instead of relying on an external/stale value.

---

# 15. Multiple State Updates

You can update multiple properties together:

```js
set({
  profile: response,
  isLoading: false,
  error: null,
});
```

---

# 16. Zustand + Persist

Zustand can persist state using middleware.

```js
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,

      setToken: (token) => {
        set({ token });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
```

The state is persisted between page reloads.

---

# 17. What Should Be Persisted?

Usually persist data that should survive a refresh:

```text
Authentication
User preferences
Theme
Cart
```

Be careful with temporary state such as:

```text
isLoading
error
temporary form state
modal state
```

Persisting temporary state can cause unexpected behavior.

---

# 18. Common Zustand Mistakes

## Mistake 1 — Wrong Response Shape

Backend:

```js
{
  user: {...}
}
```

Wrong:

```js
profile: response
```

if you expect `profile` to directly represent the user.

Correct:

```js
profile: response.user
```

Always understand the API response shape.

---

## Mistake 2 — Using `response.data` Twice

If API:

```js
return response.data;
```

Then store:

```js
const response = await apiFunction();
```

already contains the data.

Don't do:

```js
response.data
```

again unless it actually exists.

---

## Mistake 3 — Accessing Null State

Wrong:

```js
profile.avatar
```

when:

```js
profile === null
```

Better:

```js
profile?.avatar
```

---

## Mistake 4 — Putting Everything in Zustand

Don't automatically put every piece of state into Zustand.

Local UI state can stay in React:

```js
const [isOpen, setIsOpen] = useState(false);
```

Global/shared state is a better candidate for Zustand:

```text
Authentication
Cart
User Profile
Global Preferences
```

---

# 19. Zustand vs `useState`

### `useState`

Best for local component state:

```js
const [file, setFile] = useState(null);
```

Example:

```text
File selected
Modal open
Input value
Dropdown open
```

### Zustand

Best for shared/global state:

```js
profile
user
cart
token
```

Example:

```text
Component A
     ↓
   Zustand
     ↑
Component B
```

---

# 20. Recommended Feature Pattern

For a feature-based React project:

```text
Profile/
├── api/
│   └── profile.api.js
│
├── Components/
│   ├── AvatarUploader.jsx
│   └── ProfileForm.jsx
│
├── Hooks/
│   └── useProfile.js
│
├── Store/
│   └── profile.store.js
│
└── Styles/
    └── Profile.css
```

Responsibilities:

```text
Component
→ UI

Hook
→ Connect UI to store

Store
→ State + Actions

API
→ HTTP Requests
```

---

# 21. Simple Mental Model

Remember Zustand as:

```text
STORE
│
├── STATE
│     ├── profile
│     ├── isLoading
│     └── error
│
└── ACTIONS
      ├── fetchProfile()
      ├── updateProfile()
      └── uploadAvatar()
```

The component does:

```text
Read State
   ↓
Call Action
   ↓
Action calls API
   ↓
API returns data
   ↓
Action updates State
   ↓
React re-renders
```

---

# Quick Revision

## Create

```js
const useStore = create((set) => ({
  value: null,
}));
```

## Read

```js
const value = useStore((state) => state.value);
```

## Update

```js
set({
  value: newValue,
});
```

## Previous State

```js
set((state) => ({
  count: state.count + 1,
}));
```

## Async Action

```js
fetchData: async () => {
  const data = await apiRequest();

  set({
    data,
  });

  return data;
}
```

## Optional State

```js
user?.name
```

## Persist

```js
persist(store, {
  name: "storage-name",
});
```

---

# Final Mental Model

> **Zustand = Global State + Actions**

```text
Component
   ↓
Zustand Action
   ↓
API
   ↓
Backend
   ↓
Response
   ↓
Zustand State
   ↓
React Re-render
```

Keep the **UI in Components**, **HTTP requests in API files**, and **shared state/business actions in Zustand**.
