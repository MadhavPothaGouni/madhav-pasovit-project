require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");
const products = [
  { name: "Classic White Tee", description: "Soft cotton t-shirt", price: 499, image: "https://picsum.photos/seed/tee1/600/600", category: "Men", sizes: ["S","M","L","XL"], stock: 50 },
  { name: "Black Hoodie", description: "Warm cotton hoodie", price: 1299, image: "https://picsum.photos/seed/hood1/600/600", category: "Men", sizes: ["M","L","XL"], stock: 30 },
  { name: "Blue Denim Jeans", description: "Slim fit jeans", price: 1599, image: "https://picsum.photos/seed/jeans1/600/600", category: "Men", sizes: ["30","32","34","36"], stock: 40 },
  { name: "Floral Dress", description: "Summer floral dress", price: 1999, image: "https://picsum.photos/seed/dress1/600/600", category: "Women", sizes: ["S","M","L"], stock: 25 },
  { name: "Leather Jacket", description: "Faux leather biker jacket", price: 3499, image: "https://picsum.photos/seed/jacket1/600/600", category: "Unisex", sizes: ["M","L","XL"], stock: 15 },
  { name: "Casual Chinos", description: "Comfort chinos", price: 1199, image: "https://picsum.photos/seed/chinos1/600/600", category: "Men", sizes: ["30","32","34","36"], stock: 45 },
  { name: "Maxi Skirt", description: "Flowy maxi skirt", price: 1099, image: "https://picsum.photos/seed/skirt1/600/600", category: "Women", sizes: ["S","M","L"], stock: 30 },
  { name: "Striped Polo", description: "Cotton polo tee", price: 699, image: "https://picsum.photos/seed/polo1/600/600", category: "Men", sizes: ["S","M","L","XL"], stock: 60 },
  { name: "Sports Shorts", description: "Breathable shorts", price: 599, image: "https://picsum.photos/seed/shorts1/600/600", category: "Men", sizes: ["S","M","L"], stock: 80 },
  { name: "Yoga Leggings", description: "Stretchy leggings", price: 999, image: "https://picsum.photos/seed/leggings1/600/600", category: "Women", sizes: ["S","M","L"], stock: 70 },
  { name: "Trench Coat", description: "Classic trench coat", price: 3999, image: "https://picsum.photos/seed/coat1/600/600", category: "Women", sizes: ["M","L"], stock: 10 },
  { name: "Denim Jacket", description: "Vintage denim jacket", price: 2499, image: "https://picsum.photos/seed/denim1/600/600", category: "Unisex", sizes: ["M","L","XL"], stock: 22 },
  { name: "Summer Shorts", description: "Lightweight shorts", price: 549, image: "https://picsum.photos/seed/shorts2/600/600", category: "Women", sizes: ["S","M","L"], stock: 55 },
  { name: "Henley Shirt", description: "Long-sleeve henley", price: 799, image: "https://picsum.photos/seed/henley1/600/600", category: "Men", sizes: ["S","M","L"], stock: 40 },
  { name: "Bomber Jacket", description: "Light bomber jacket", price: 2799, image: "https://picsum.photos/seed/bomber1/600/600", category: "Men", sizes: ["M","L","XL"], stock: 18 },
  { name: "Puffer Vest", description: "Insulated vest", price: 1899, image: "https://picsum.photos/seed/vest1/600/600", category: "Unisex", sizes: ["S","M","L"], stock: 20 },
  { name: "Wrap Dress", description: "Elegant wrap dress", price: 2199, image: "https://picsum.photos/seed/dress2/600/600", category: "Women", sizes: ["S","M","L"], stock: 27 },
  { name: "Corduroy Pants", description: "Vintage corduroy", price: 1399, image: "https://picsum.photos/seed/pants1/600/600", category: "Men", sizes: ["30","32","34"], stock: 35 },
  { name: "Graphic Tee", description: "Printed graphic t-shirt", price: 599, image: "https://picsum.photos/seed/tee2/600/600", category: "Unisex", sizes: ["S","M","L","XL"], stock: 90 },
  { name: "Wrap Scarf", description: "Cozy scarf", price: 399, image: "https://picsum.photos/seed/scarf1/600/600", category: "Accessories", sizes: [], stock: 100 }
];

const importData = async () => {
  try {
    await connectToDB();

    await Product.deleteMany();
    await Product.insertMany(products);

    console.log("Products seeded!");
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

const connectToDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("ERROR: MONGO_URI is not set in .env.");
    process.exit(1);
  }

  await mongoose.connect(uri);
};

importData();
