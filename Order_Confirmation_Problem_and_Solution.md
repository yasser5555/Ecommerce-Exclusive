# Order Confirmation Loading Problem & Solution

## 1. Problem

The Order Confirmation page was entering an infinite loading state after creating an order.

The order creation itself was working correctly:

```text
CREATE ORDER RESPONSE
ORDER ID: 326
```

The order item was also inserted successfully:

```text
product_id: 2
quantity: 1
affectedRows: 1
insertId: 49
```

The database was verified and the corresponding `order_items` row existed.

Therefore, the problem was **not** in creating the order or inserting its products.

---

## 2. The Original Problem

The Order Confirmation page was using:

```js
orderHistory?.data?.[0]
```

This means:

> Get the first order from the user's order history.

But the first order is not necessarily the order that was just created.

For example:

```text
Order History:
314
315
316
...
326
```

If the newly created order is `326`, using:

```js
orderHistory.data[0]
```

would select order `314`.

---

## 3. Solution: Identify the Order by ID

The newly created `order_id` is already available after creating the order.

Instead of navigating to:

```js
navigate(`/orderConfirmation/n`, { replace: true });
```

navigate using the actual order ID:

```js
navigate(`/orderConfirmation/${order_id}`, { replace: true });
```

The route becomes:

```jsx
<Route
  path="/orderConfirmation/:order_id"
  element={<OrderConfirmationPage />}
/>
```

Then the page retrieves the ID:

```js
const { order_id } = useParams();
```

Now the page knows exactly which order it should display.

---

## 4. Asynchronous Data Loading

The page does not receive the order history immediately.

Initially, the logs showed:

```text
ORDER HISTORY: []
SELECTED ORDER: undefined
```

Then the request started:

```text
LOADING: true
```

After the API request completed:

```text
ORDER HISTORY: {
  msg: "Data Fetched Successfully",
  data: Array(13)
}
```

The returned order IDs were:

```text
314
315
316
317
318
319
320
321
322
323
324
325
326
```

The URL contained:

```text
order_id = 326
```

So order `326` was present in the fetched data.

---

## 5. Find the Correct Order

Instead of:

```js
const order = orderHistory?.data?.[0];
```

use:

```js
const orders = orderHistory?.data ?? [];

const order = orders.find(
  (item) => String(item.order_id) === String(order_id)
);
```

### Why `String()`?

`useParams()` returns URL parameters as strings:

```js
"326"
```

The API may return the ID as a number:

```js
326
```

This comparison:

```js
326 === "326"
```

is false.

Therefore:

```js
String(item.order_id) === String(order_id)
```

makes the comparison reliable.

---

## 6. Handle the Three UI States

The page should handle three states.

### Loading

```js
if (isloading) {
  return <div className="container">Loading...</div>;
}
```

### Order Not Found

```js
if (!order) {
  return <div className="container">Order not found</div>;
}
```

### Order Found

Render the confirmation page:

```jsx
return (
  <div className="container">
    <Introduction
      order={order}
      isLoading={false}
    />

    <div className="row g-4">
      <Orderedproducts
        order={order}
        paymentMethod={paymentMethod}
        shippingMethod={shippingMethod}
      />

      <DeliveryAddress
        profile={profile}
        selectedAddress={selectedAddress}
        paymentMethod={paymentMethod}
      />
    </div>
  </div>
);
```

This prevents child components from treating temporary `undefined` data as permanent loading.

---

## 7. Complete Data Flow

```text
Cart
  ↓
Create Order
  ↓
orders.id = 326
  ↓
Create Order Items
  ↓
order_items contains order_id = 326
  ↓
Navigate to /orderConfirmation/326
  ↓
OrderConfirmationPage
  ↓
useParams() → order_id = "326"
  ↓
Fetch user's orders
  ↓
Find order where order_id = 326
  ↓
Pass selected order through props
  ↓
Introduction
Orderedproducts
DeliveryAddress
```

---

## 8. Single Source of Truth

The `OrderConfirmationPage` should be the **Single Source of Truth** for the confirmation-page data.

It should handle:

- Fetching the order data.
- Selecting the correct order.
- Loading state.
- Order-not-found state.
- Passing data to child components.

The child components should only display the data they receive.

Example:

```jsx
<Orderedproducts order={order} />
```

instead of having `Orderedproducts` access the order store directly.

The data flow becomes:

```text
Store / API
     ↓
OrderConfirmationPage
     ↓
    Props
     ↓
Child Components
```

---

## 9. Important Lesson

The main issue was confusing:

```js
orderHistory
```

with:

```text
the specific order currently being confirmed
```

`orderHistory` contains multiple orders.

The Confirmation page needs **one specific order**.

Therefore, the order should be identified using its `order_id` rather than assuming:

```js
orderHistory.data[0]
```

is the newly created order.
