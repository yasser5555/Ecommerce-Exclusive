 
const express = require("express");
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");
const db = require("./DB");
const app = express();
app.use(express.json());
// =====================================================
// POST /seed
// =====================================================
app.post("/seed", async (req, res) => {
  let connection;
  try {
    console.log("🌱 Starting database seed...");
    connection = await db.getConnection();
    await connection.beginTransaction();
    // =====================================================
    // 1. CATEGORIES
    // =====================================================
    console.log("📂 Creating categories...");
    const categories = [
      "Electronics",
      "Laptops",
      "Smartphones",
      "Accessories",
      "Gaming",
      "Home Appliances",
      "Fashion",
      "Sports",
      "Books",
      "Furniture",
    ];

    const categoryIds = [];

    for (const category of categories) {
      const [result] = await connection.execute(
        `
        INSERT INTO categories (name)
        VALUES (?)
        `,
        [category],
      );

      categoryIds.push(result.insertId);
    }

    console.log("✅ Categories created");

    // =====================================================
    // 2. USERS
    // =====================================================

    console.log("👤 Creating users...");

    const users = [];

    for (let i = 1; i <= 100; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      // -----------------------------------------------
      // LOGIN
      // -----------------------------------------------

      const email = `razorcross${i}@gmail.com`;

      // Password = Email
      const hashedPassword = await bcrypt.hash(email, 10);

      // Your database uses INT
      const phoneNumber = 2010000000 + i;

      const gender = faker.helpers.arrayElement(["male", "female"]);

      const [result] = await connection.execute(
        `
        INSERT INTO users
        (
          avatar,
          first_name,
          last_name,
          gender,
          phone_number,
          email,
          password
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          faker.image.avatar(),
          firstName,
          lastName,
          gender,
          phoneNumber,
          email,
          hashedPassword,
        ],
      );

      users.push({
        id: result.insertId,
        email,
      });
    }

    console.log("✅ 100 users created");

    // =====================================================
    // 3. PRODUCTS
    // =====================================================

    console.log("🛍️ Creating products...");

    const products = [];

    for (let i = 0; i < 100; i++) {
      const categoryId = faker.helpers.arrayElement(categoryIds);

      const oldPrice = faker.number.float({
        min: 100,
        max: 5000,
        fractionDigits: 2,
      });

      const hasDiscount = faker.datatype.boolean({
        probability: 0.6,
      });

      const discountPrice = hasDiscount
        ? Number(
            (
              oldPrice *
              faker.number.float({
                min: 0.7,
                max: 0.9,
              })
            ).toFixed(2),
          )
        : 0;

      const stock = faker.number.int({
        min: 0,
        max: 150,
      });

      const title = faker.commerce.productName();

      const description = faker.commerce.productDescription();

      const [result] = await connection.execute(
        `
        INSERT INTO products
        (
          category_id,
          title,
          description,
          Discount_price,
          old_price,
          stock,
          product_image
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)
        `,
        [
          categoryId,
          title,
          description,
          discountPrice,
          oldPrice,
          stock,
          faker.image.urlLoremFlickr({
            category: "product",
          }),
        ],
      );

      /*
       * Store the product information because
       * we need it later when creating order_items.
       */

      products.push({
        id: result.insertId,
        price: discountPrice > 0 ? discountPrice : oldPrice,
      });
    }

    console.log("✅ 100 products created");

    // =====================================================
    // 4. CREDIT CARDS
    // =====================================================

    console.log("💳 Creating credit cards...");

    const mastercardBanks = ["CIB", "QNB Alahli", "HSBC Egypt", "AlexBank"];

    const visaBanks = [
      "National Bank of Egypt",
      "Banque Misr",
      "ADIB Egypt",
      "Arab African International Bank",
    ];

    for (const user of users) {
      // -------------------------------
      // Mastercard
      // -------------------------------

      await connection.execute(
        `
        INSERT INTO credit_card
        (
          user_id,
          card_type,
          bank_name,
          last4,
          expiry_day,
          expiry_month,
          expiry_year,
          balance
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          user.id,
          "Mastercard",

          faker.helpers.arrayElement(mastercardBanks),

          faker.finance.creditCardNumber("####"),

          faker.number.int({
            min: 1,
            max: 28,
          }),

          faker.number.int({
            min: 1,
            max: 12,
          }),

          faker.number.int({
            min: 2027,
            max: 2031,
          }),

          faker.finance.amount({
            min: 500,
            max: 15000,
            dec: 2,
          }),
        ],
      );

      // -------------------------------
      // Visa
      // -------------------------------

      await connection.execute(
        `
        INSERT INTO credit_card
        (
          user_id,
          card_type,
          bank_name,
          last4,
          expiry_day,
          expiry_month,
          expiry_year,
          balance
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `,
        [
          user.id,
          "Visa",

          faker.helpers.arrayElement(visaBanks),

          faker.finance.creditCardNumber("####"),

          faker.number.int({
            min: 1,
            max: 28,
          }),

          faker.number.int({
            min: 1,
            max: 12,
          }),

          faker.number.int({
            min: 2027,
            max: 2031,
          }),

          faker.finance.amount({
            min: 500,
            max: 20000,
            dec: 2,
          }),
        ],
      );
    }

    console.log("✅ 200 credit cards created");

    // =====================================================
    // 5. ADDRESSES
    // =====================================================

    console.log("🏠 Creating addresses...");

    const cities = [
      "Cairo",
      "Alexandria",
      "Giza",
      "Port Said",
      "Mansoura",
      "Tanta",
      "Ismailia",
      "Suez",
      "Luxor",
      "Aswan",
    ];

    /*
     * We store addresses in memory.
     *
     * Structure:
     *
     * addressesByUser = {
     *   1: [address1, address2, address3, address4],
     *   2: [address5, address6, address7, address8]
     * }
     */

    const addressesByUser = {};

    for (const user of users) {
      addressesByUser[user.id] = [];

      // Generate 4 unique apartment numbers
      const apartmentNumbers = faker.helpers.uniqueArray(
        () =>
          faker.number.int({
            min: 1,
            max: 999,
          }),
        4,
      );

      for (let i = 0; i < 4; i++) {
        const [result] = await connection.execute(
          `
            INSERT INTO addresses
            (
              user_id,
              country,
              city,
              street_number,
              building_number,
              apartement_number
            )
            VALUES (?, ?, ?, ?, ?, ?)
            `,
          [
            user.id,

            "Egypt",

            faker.helpers.arrayElement(cities),

            faker.location.street(),

            faker.location.buildingNumber(),

            apartmentNumbers[i].toString(),
          ],
        );

        addressesByUser[user.id].push(result.insertId);
      }
    }

    console.log("✅ 400 addresses created");

    // =====================================================
    // 6. ORDERS
    // =====================================================

    console.log("📦 Creating orders...");

    let totalOrders = 0;
    let totalOrderItems = 0;

    const statuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    /*
     * Every user gets between 2 and 4 orders.
     *
     * 100 users × 2-4 orders
     * ≈ 200-400 orders
     */

    for (const user of users) {
      const numberOfOrders = faker.number.int({
        min: 2,
        max: 4,
      });

      for (let orderIndex = 0; orderIndex < numberOfOrders; orderIndex++) {
        // ---------------------------------------------
        // Select an address belonging to THIS user
        // ---------------------------------------------

        const userAddresses = addressesByUser[user.id];

        const addressId = faker.helpers.arrayElement(userAddresses);

        // ---------------------------------------------
        // Create order first
        // ---------------------------------------------

        const status = faker.helpers.arrayElement(statuses);

        /*
         * We initially use 0 for total_price.
         *
         * After creating order_items,
         * we'll calculate the actual total.
         */

        const [orderResult] = await connection.execute(
          `
            INSERT INTO orders
            (
              user_id,
              address_id,
              total_price,
              status
            )
            VALUES (?, ?, ?, ?)
            `,
          [user.id, addressId, 0, status],
        );

        const orderId = orderResult.insertId;

        // ---------------------------------------------
        // Create order items
        // ---------------------------------------------

        const numberOfItems = faker.number.int({
          min: 1,
          max: 4,
        });

        let orderTotal = 0;

        /*
         * Make sure the same product isn't added twice
         * to the same order.
         */

        const selectedProducts = faker.helpers.arrayElements(
          products,
          numberOfItems,
        );

        for (const product of selectedProducts) {
          const quantity = faker.number.int({
            min: 1,
            max: 5,
          });

          const itemPrice = Number(product.price);

          const itemTotal = itemPrice * quantity;

          orderTotal += itemTotal;

          await connection.execute(
            `
            INSERT INTO order_items
            (
              order_id,
              product_id,
              quantity,
              price
            )
            VALUES (?, ?, ?, ?)
            `,
            [orderId, product.id, quantity, itemPrice],
          );

          totalOrderItems++;
        }

        // ---------------------------------------------
        // Update order total
        // ---------------------------------------------

        await connection.execute(
          `
          UPDATE orders
          SET total_price = ?
          WHERE id = ?
          `,
          [Number(orderTotal.toFixed(2)), orderId],
        );

        totalOrders++;
      }
    }

    console.log(`✅ ${totalOrders} orders created`);

    console.log(`✅ ${totalOrderItems} order items created`);

    // =====================================================
    // COMMIT
    // =====================================================

    await connection.commit();

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message: "Database seeded successfully.",

      data: {
        users: 100,
        products: 100,
        categories: 10,
        credit_cards: 200,
        addresses: 400,
        orders: totalOrders,
        order_items: totalOrderItems,
      },
    });
  } catch (error) {
    console.error("❌ SEED ERROR:", error);

    // ---------------------------------------------
    // Rollback
    // ---------------------------------------------

    if (connection) {
      await connection.rollback();
    }

    return res.status(500).json({
      success: false,

      message: "Database seeding failed.",

      error: error.message,
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// =====================================================
// START SERVER
// =====================================================

const PORT = 5001;

app.listen(PORT, () => {
  console.log(`🌱 Seed server running at http://localhost:${PORT}`);
});
