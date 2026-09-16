# Problem: `selectedAddress` Is Not Shared

## Problem

`BillingDetails` and `OrderSummary` both call:

```js
useBillingDetails();
```

But inside the hook:

```js
const [selectedAddress, setSelectedAddress] = useState(null);
```

Each component gets its **own state**:

```text
BillingDetails → selectedAddress #1
OrderSummary   → selectedAddress #2
```

So when the user selects an address in `BillingDetails`, only `selectedAddress #1` changes.

`OrderSummary` still has:

```js
selectedAddress === null
```

That's why:

```js
selectedAddress.address_id
```

doesn't work.

---

## Why the Guard Doesn't Solve It?

This:

```js
if (!selectedAddress) {
  return;
}
```

only prevents the error.

It doesn't solve the real problem: **the state is not shared.**

---

## Solution

Move `selectedAddress` to the existing Zustand `useProfileStore`.

### `profile.store.js`

```js
selectedAddress: null,

setSelectedAddress: (address) => {
  set({ selectedAddress: address });
},
```

### `useBillingDetails.js`

Remove:

```js
const [selectedAddress, setSelectedAddress] = useState(null);
```

And get it from Zustand:

```js
const {
  profile,
  userAddresses,
  fetchUserAddresses,
  selectedAddress,
  setSelectedAddress,
} = useProfileStore();
```

Now both components use the same state:

```text
              useProfileStore
                    ↓
             selectedAddress
               ↙       ↘
              ↓         ↓
     BillingDetails  OrderSummary
```

---

## Result

When the user selects an address:

```js
handleSelectAddress(address, index);
```

Zustand updates the shared state.

Then `OrderSummary` gets the same address:

```js
selectedAddress.address_id
```

and can create the order:

```js
CreateOrder({
  address_id: selectedAddress.address_id,
  total_price: subtotal,
  status: "pending",
});
```

---

## Key Concept

> **Custom hooks share logic, not local state.**

For shared state between components, use:

- Lifted State
- Context API
- Zustand / Redux

Since the project already uses Zustand, **Zustand is the cleanest solution here.**
