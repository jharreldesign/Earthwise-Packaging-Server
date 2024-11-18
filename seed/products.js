const db = require("../db");
const Product = require("../models/product");

// Connect to the database
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const main = async () => {
  //Data
  const products = [
    {
      productName: '6" Classic Round Plate',
      productDescription:
        "Classic 6-inch round plate made from compostable sugarcane fiber.",
      productPrice: 12.99,
      productImage: "https://example.com/images/6-classic-round-plate.jpg",
      productQuantity: 150,
      productSku: "PLATE-6RND-01",
      manufacturerSku: "MAN-PLATE-6RND-01",
      productCategory: "Plates",
    },
    {
      productName: '10" Oval Compostable Plate',
      productDescription:
        "Elegant 10-inch oval plate crafted from sustainable natural fibers.",
      productPrice: 18.99,
      productImage: "https://example.com/images/10-oval-compostable-plate.jpg",
      productQuantity: 100,
      productSku: "PLATE-10OVL-01",
      manufacturerSku: "MAN-PLATE-10OVL-01",
      productCategory: "Plates",
    },
    {
      productName: '8" Wooden Boat',
      productDescription:
        "Durable and eco-friendly 8-inch wooden boat for serving food.",
      productPrice: 9.99,
      productImage: "https://example.com/images/8-wooden-boat.jpg",
      productQuantity: 200,
      productSku: "BOAT-8WOOD-01",
      manufacturerSku: "MAN-BOAT-8WOOD-01",
      productCategory: "Serveware",
    },
    {
      productName: '11" x 11" Square Cheese Board',
      productDescription:
        "Large balsa wood cheese board for stylish food presentations.",
      productPrice: 22.99,
      productImage: "https://example.com/images/11x11-square-cheese-board.jpg",
      productQuantity: 80,
      productSku: "BOARD-11SQ-01",
      manufacturerSku: "MAN-BOARD-11SQ-01",
      productCategory: "Serveware",
    },
    {
      productName: '7.5" Wrapped Straw | 5mm | PLA | Bulk | Green',
      productDescription:
        "Eco-friendly 7.5-inch wrapped PLA straws in green color, ideal for bulk usage.",
      productPrice: 6.99,
      productImage: "https://example.com/images/7-5-wrapped-straw.jpg",
      productQuantity: 500,
      productSku: "STRAW-7PLA-01",
      manufacturerSku: "MAN-STRAW-7PLA-01",
      productCategory: "Straws",
    },
    {
      productName:
        '5.5" PHA Drinking Straws | Unwrapped | Cocktail | Natural White',
      productDescription:
        "Biodegradable 5.5-inch unwrapped PHA straws, perfect for cocktails.",
      productPrice: 5.99,
      productImage: "https://example.com/images/5-5-pha-straw.jpg",
      productQuantity: 600,
      productSku: "STRAW-5PHA-01",
      manufacturerSku: "MAN-STRAW-5PHA-01",
      productCategory: "Straws",
    },
    {
      productName: '8.5" Boba Straw | 10mm | Angle Cut PLA | Bulk | Green',
      productDescription:
        "Wide 8.5-inch PLA boba straw with angle cut, ideal for bubble tea lovers.",
      productPrice: 8.99,
      productImage: "https://example.com/images/8-5-boba-straw.jpg",
      productQuantity: 400,
      productSku: "STRAW-8BOBA-01",
      manufacturerSku: "MAN-STRAW-8BOBA-01",
      productCategory: "Straws",
    },
    {
      productName: '7" Yellow Fork | Plantware® High-Heat Utensils',
      productDescription:
        "Durable 7-inch yellow fork made from plant-based high-heat materials.",
      productPrice: 10.99,
      productImage: "https://example.com/images/7-yellow-fork.jpg",
      productQuantity: 300,
      productSku: "UTENSIL-FORK-01",
      manufacturerSku: "MAN-UTENSIL-FORK-01",
      productCategory: "Utensils",
    },
    {
      productName: '6" Yellow Spoon | Plantware® High-Heat Utensils',
      productDescription:
        "Sturdy 6-inch yellow spoon designed for high-heat applications.",
      productPrice: 10.99,
      productImage: "https://example.com/images/6-yellow-spoon.jpg",
      productQuantity: 300,
      productSku: "UTENSIL-SPOON-01",
      manufacturerSku: "MAN-UTENSIL-SPOON-01",
      productCategory: "Utensils",
    },
    {
      productName: '6" Yellow Knife | Plantware® High-Heat Utensils',
      productDescription:
        "Reliable 6-inch yellow knife crafted for plant-based high-heat usage.",
      productPrice: 10.99,
      productImage: "https://example.com/images/6-yellow-knife.jpg",
      productQuantity: 300,
      productSku: "UTENSIL-KNIFE-01",
      manufacturerSku: "MAN-UTENSIL-KNIFE-01",
      productCategory: "Utensils",
    },
    {
      productName: '6.7" Bamboo Cutlery Set | Fork/Knife/Spoon/Napkin',
      productDescription:
        "Eco-friendly bamboo cutlery set including fork, knife, spoon, and napkin.",
      productPrice: 15.99,
      productImage: "https://example.com/images/6-7-bamboo-cutlery-set.jpg",
      productQuantity: 200,
      productSku: "CUTLERY-BAMBOO-01",
      manufacturerSku: "MAN-CUTLERY-BAMBOO-01",
      productCategory: "Cutlery Sets",
    },
    {
      productName:
        "8 oz Compostable Hot Cup | Double Wall | PLA Lined | Responsible Products®",
      productDescription:
        "8 oz double-wall hot cup lined with PLA for compostable use.",
      productPrice: 9.99,
      productImage: "https://example.com/images/8oz-compostable-hot-cup.jpg",
      productQuantity: 500,
      productSku: "CUP-HOT8-01",
      manufacturerSku: "MAN-CUP-HOT8-01",
      productCategory: "Cups",
    },
    {
      productName:
        "12 oz Compostable Hot Cup | Double Wall | PLA Lined | Responsible Products®",
      productDescription:
        "12 oz double-wall hot cup with compostable PLA lining.",
      productPrice: 12.99,
      productImage: "https://example.com/images/12oz-compostable-hot-cup.jpg",
      productQuantity: 400,
      productSku: "CUP-HOT12-01",
      manufacturerSku: "MAN-CUP-HOT12-01",
      productCategory: "Cups",
    },
    {
      productName: "12 oz Cold Cup | Compostable Corn Plastic",
      productDescription:
        "Durable 12 oz cold cup made from compostable corn plastic.",
      productPrice: 8.99,
      productImage: "https://example.com/images/12oz-cold-cup.jpg",
      productQuantity: 600,
      productSku: "CUP-COLD12-01",
      manufacturerSku: "MAN-CUP-COLD12-01",
      productCategory: "Cups",
    },
    {
      productName: "16 oz Cold Cup | Compostable Corn Plastic",
      productDescription:
        "Eco-friendly 16 oz cold cup crafted from compostable corn plastic.",
      productPrice: 10.99,
      productImage: "https://example.com/images/16oz-cold-cup.jpg",
      productQuantity: 500,
      productSku: "CUP-COLD16-01",
      manufacturerSku: "MAN-CUP-COLD16-01",
      productCategory: "Cups",
    },
    {
      productName:
        "Sip Lid for 9-24 oz BlueStripe™ Cold Cup | Recycled Plastic",
      productDescription:
        "Sip lid designed for 9-24 oz cold cups, made with recycled plastic.",
      productPrice: 7.99,
      productImage: "https://example.com/images/sip-lid-bluestripe.jpg",
      productQuantity: 300,
      productSku: "LID-SIPBLUES-01",
      manufacturerSku: "MAN-LID-SIPBLUES-01",
      productCategory: "Lids",
    },
    {
      productName:
        "Fiber Lid for 10-22 oz No Tree® Hot or Cold Cups | No Added PFAS | Sip Lid",
      productDescription:
        "Fiber lid for hot or cold cups, free of added PFAS, with sip-friendly design.",
      productPrice: 8.99,
      productImage: "https://example.com/images/fiber-lid-no-tree.jpg",
      productQuantity: 350,
      productSku: "LID-FIBER-01",
      manufacturerSku: "MAN-LID-FIBER-01",
      productCategory: "Lids",
    },
  ];

  //Call
  let deleteResponse = await Product.deleteMany();
  console.log("Delete old seed - product", deleteResponse);
  let createResponse = await Product.insertMany(products);
  console.log("Create new seed - product", createResponse);
};
const run = async () => {
  await main();
  db.close();
};

run();
