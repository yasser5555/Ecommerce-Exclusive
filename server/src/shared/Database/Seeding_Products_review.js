const express = require("express");
const { faker } = require("@faker-js/faker");
const db = require("./DB");

const app = express();

app.use(express.json());

// =====================================================
// POST /seed
// =====================================================

app.post("/seed_Reviews", async (req, res) => {
  let connection;
  try {
    console.log("🌱 Starting product reviews seed...");
    connection = await db.getConnection();
    await connection.beginTransaction();
    // =====================================================
    // 1. GET USERS
    // =====================================================
    console.log("👤 Loading users...");
    const [users] = await connection.execute(`
      SELECT id
      FROM users
      ORDER BY id
    `);
    if (users.length === 0) {
      throw new Error("No users found. Seed users first.");
    }

    console.log(`✅ ${users.length} users loaded`);

    // =====================================================
    // 2. GET PRODUCTS
    // =====================================================

    console.log("🛍️ Loading products...");

    const [products] = await connection.execute(`
      SELECT id
      FROM products
      ORDER BY id
    `);

    if (products.length === 0) {
      throw new Error("No products found. Seed products first.");
    }

    console.log(`✅ ${products.length} products loaded`);

    // =====================================================
    // 3. REVIEW COMMENTS
    // =====================================================

    const excellentReviews = [
      "Absolutely amazing product. Highly recommended!",
      "Excellent quality and exactly what I expected.",
      "One of the best products I have purchased.",
      "Amazing quality for the price.",
      "I am extremely satisfied with this product.",
      "Works perfectly and looks great.",
      "Better than I expected. Very happy with it.",
      "Fantastic product. I would definitely buy it again.",
      "The quality is excellent.",
      "Highly recommended. Great purchase!",
    ];

    const goodReviews = [
      "Very good product overall.",
      "Good quality and worth the price.",
      "I really like this product.",
      "Pretty good product and works as expected.",
      "Good experience overall.",
      "The product is better than I expected.",
      "Nice product and good quality.",
      "I would recommend this product.",
      "Good value for the money.",
      "Satisfied with my purchase.",
    ];

    const averageReviews = [
      "The product is okay overall.",
      "It is decent for the price.",
      "Not bad, but there is room for improvement.",
      "Average product. Nothing special.",
      "It works fine so far.",
      "The quality is acceptable.",
      "It is okay, but I expected a little more.",
      "Decent experience overall.",
      "The product matches the description.",
      "Good enough for the price.",
    ];

    const badReviews = [
      "The quality could be better.",
      "Not completely satisfied with the product.",
      "I expected better quality.",
      "The product has some issues.",
      "Not as good as I expected.",
      "The quality is lower than expected.",
      "I don't think it is worth the price.",
      "The product needs some improvements.",
      "I had a few problems with this product.",
      "Not the best experience.",
    ];

    const terribleReviews = [
      "Very disappointed with this product.",
      "The quality is really poor.",
      "It did not meet my expectations at all.",
      "I would not recommend this product.",
      "The product stopped working shortly after using it.",
      "Very poor quality for the price.",
      "I regret buying this product.",
      "The product is much worse than described.",
      "Not worth the money.",
      "Extremely disappointed.",
    ];

    // =====================================================
    // 4. REVIEW GENERATOR
    // =====================================================

    function generateRating() {
      /*
       * Weighted ratings.
       *
       * 1 ⭐  -> 5%
       * 2 ⭐⭐ -> 8%
       * 3 ⭐⭐⭐ -> 17%
       * 4 ⭐⭐⭐⭐ -> 30%
       * 5 ⭐⭐⭐⭐⭐ -> 40%
       */

      return faker.helpers.weightedArrayElement([
        { value: 1, weight: 5 },
        { value: 2, weight: 8 },
        { value: 3, weight: 17 },
        { value: 4, weight: 30 },
        { value: 5, weight: 40 },
      ]);
    }

    function generateComment(rating) {
      switch (rating) {
        case 5:
          return faker.helpers.arrayElement(excellentReviews);

        case 4:
          return faker.helpers.arrayElement(goodReviews);

        case 3:
          return faker.helpers.arrayElement(averageReviews);

        case 2:
          return faker.helpers.arrayElement(badReviews);

        case 1:
          return faker.helpers.arrayElement(terribleReviews);

        default:
          return "Good product.";
      }
    }

    // =====================================================
    // 5. CREATE REVIEWS
    // =====================================================

    console.log("⭐ Creating product reviews...");

    /*
     * We will create exactly 450 reviews.
     *
     * 100 products
     *
     * Every product gets at least 3 reviews.
     *
     * 100 × 3 = 300 reviews
     *
     * Then we add 150 random reviews.
     *
     * Total = 450 reviews
     */

    const MIN_REVIEWS_PER_PRODUCT = 3;
    const TOTAL_REVIEWS = 450;

    let totalReviews = 0;

    // -----------------------------------------------------
    // Track user/product combinations
    // -----------------------------------------------------

    /*
     * This prevents:
     *
     * User 1 → Product 1
     * User 1 → Product 1
     *
     * from happening twice.
     */

    const usedReviews = new Set();

    // =====================================================
    // 6. GUARANTEE 3 REVIEWS FOR EVERY PRODUCT
    // =====================================================

    console.log("🔒 Creating minimum reviews for every product...");

    for (const product of products) {
      let reviewsForProduct = 0;

      while (reviewsForProduct < MIN_REVIEWS_PER_PRODUCT) {
        const user = faker.helpers.arrayElement(users);

        const key = `${user.id}-${product.id}`;

        // Prevent duplicate user/product review
        if (usedReviews.has(key)) {
          continue;
        }

        usedReviews.add(key);

        const rating = generateRating();

        const comment = generateComment(rating);

        await connection.execute(
          `
          INSERT INTO product_reviews
          (
            user_id,
            product_id,
            comment,
            rating
          )
          VALUES (?, ?, ?, ?)
          `,
          [user.id, product.id, comment, rating],
        );

        totalReviews++;

        reviewsForProduct++;
      }
    }

    console.log("✅ Every product has at least 3 reviews");

    // =====================================================
    // 7. ADD EXTRA RANDOM REVIEWS
    // =====================================================

    console.log("🎲 Creating additional random reviews...");

    while (totalReviews < TOTAL_REVIEWS) {
      const user = faker.helpers.arrayElement(users);

      const product = faker.helpers.arrayElement(products);

      const key = `${user.id}-${product.id}`;

      // Prevent duplicate review
      if (usedReviews.has(key)) {
        continue;
      }

      usedReviews.add(key);

      const rating = generateRating();

      const comment = generateComment(rating);

      await connection.execute(
        `
        INSERT INTO product_reviews
        (
          user_id,
          product_id,
          comment,
          rating
        )
        VALUES (?, ?, ?, ?)
        `,
        [user.id, product.id, comment, rating],
      );

      totalReviews++;
    }

    console.log(`✅ ${totalReviews} reviews created`);

    // =====================================================
    // 8. COMMIT
    // =====================================================

    await connection.commit();

    // =====================================================
    // 9. RESPONSE
    // =====================================================

    return res.status(201).json({
      success: true,

      message: "Product reviews seeded successfully.",

      data: {
        users_used: users.length,
        products_used: products.length,
        reviews_created: totalReviews,
        minimum_reviews_per_product: MIN_REVIEWS_PER_PRODUCT,
      },
    });
  } catch (error) {
    console.error("❌ REVIEW SEED ERROR:", error);

    // =====================================================
    // ROLLBACK
    // =====================================================

    if (connection) {
      await connection.rollback();
    }

    return res.status(500).json({
      success: false,

      message: "Product reviews seeding failed.",

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
  console.log(`⭐ Review seed server running at http://localhost:${PORT}`);
});
