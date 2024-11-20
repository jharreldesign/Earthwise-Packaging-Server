const db = require("../db");
const { Review, Product } = require("../models/product");
const User = require("../models/user");

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const run = async () => {
  await Product.deleteMany({});
  await Review.deleteMany({});
  await User.deleteMany({});
  try {
    const users = [
      {
        name: "Alex Johnson",
        username: "PixelNomad92",
        email: "alex.johnson92@example.com",
        phoneNumber: "555-123-4567",
        street: "123 Elm Street",
        state: "California",
        zip: 90210,
        companyName: "Nomad Ventures",
      },
      {
        name: "Taylor Smith",
        username: "NebulaRiderX",
        email: "taylor.smithx@example.com",
        phoneNumber: "555-987-6543",
        street: "456 Oak Avenue",
        state: "Texas",
        zip: 73301,
        companyName: "Galactic Explorers LLC",
      },
      {
        name: "Jordan Lee",
        username: "FrostByte_47",
        email: "jordan.lee47@example.com",
        phoneNumber: "555-567-8901",
        street: "789 Pine Road",
        state: "New York",
        zip: 10001,
        companyName: "Frozen Systems Inc.",
      },
      {
        name: "Morgan Rivera",
        username: "QuantumKoala",
        email: "morgan.rivera@example.com",
        phoneNumber: "555-345-6789",
        street: "321 Maple Street",
        state: "Florida",
        zip: 33101,
        companyName: "Quantum Innovations",
      },
      {
        name: "Casey Brown",
        username: "ShadowCrafter",
        email: "casey.brown@example.com",
        phoneNumber: "555-234-5678",
        street: "987 Birch Lane",
        state: "Washington",
        zip: 98101,
        companyName: "Crafted Shadows Co.",
      },
      {
        name: "Jamie Patel",
        username: "EchoWolf77",
        email: "jamie.patel77@example.com",
        phoneNumber: "555-678-1234",
        street: "654 Cedar Circle",
        state: "Illinois",
        zip: 60601,
        companyName: "Echo Dynamics",
      },
      {
        name: "Riley Nguyen",
        username: "LunarPhoenix",
        email: "riley.nguyen@example.com",
        phoneNumber: "555-890-2345",
        street: "741 Redwood Drive",
        state: "Oregon",
        zip: 97201,
        companyName: "Phoenix Rising Ltd.",
      },
      {
        name: "Sydney Carter",
        username: "SolarFlare99",
        email: "sydney.carter99@example.com",
        phoneNumber: "555-234-8901",
        street: "963 Aspen Court",
        state: "Nevada",
        zip: 89501,
        companyName: "Solar Solutions",
      },
      {
        name: "Parker Diaz",
        username: "CometChaser",
        email: "parker.diaz@example.com",
        phoneNumber: "555-678-4321",
        street: "852 Spruce Way",
        state: "Colorado",
        zip: 80201,
        companyName: "Comet Enterprises",
      },
      {
        name: "Jordan Bell",
        username: "EcoTrailBlazer",
        email: "jordan.bell@example.com",
        phoneNumber: "555-345-9876",
        street: "369 Cypress Boulevard",
        state: "Arizona",
        zip: 85001,
        companyName: "Trail Blazer Co.",
      },
      {
        name: "Drew Thompson",
        username: "TerraGuardian",
        email: "drew.thompson@example.com",
        phoneNumber: "555-567-6543",
        street: "159 Hemlock Lane",
        state: "Michigan",
        zip: 48101,
        companyName: "TerraTech LLC",
      },
      {
        name: "Avery Lopez",
        username: "NovaAscend",
        email: "avery.lopez@example.com",
        phoneNumber: "555-789-1230",
        street: "753 Alder Avenue",
        state: "Utah",
        zip: 84101,
        companyName: "Nova Innovations",
      },
      {
        name: "Chris Parker",
        username: "GalacticNova",
        email: "chris.parker@example.com",
        phoneNumber: "555-890-5674",
        street: "258 Willow Grove",
        state: "Georgia",
        zip: 30301,
        companyName: "Galactic Systems Inc.",
      },
    ];
    const createdUsers = await User.insertMany(users);
    console.log("Users seeded.");

    const reviews = [
      {
        recommend: true,
        text: `Fast shipping and great quality! 10/10`,
        author: [createdUsers[0]._id],
      },
      {
        recommend: true,
        text: `Cheap, easy to use, and extremely fast shipping!`,
        author: [createdUsers[1]._id],
      },
      {
        recommend: true,
        text: `Go eco!`,
        author: [createdUsers[2]._id],
      },
      {
        recommend: true,
        text: `Honestly, I expected this product to be the absolute worst. It blew me away!
              First let me talk about the shipping. It really felt like I just ordered it and within the same time.
              The package arrived! As for the product? Wow! Amazing quality and I got a bang for my buck!
              If you're a shop owner I recommend to buy these!`,
        author: [createdUsers[3]._id],
      },
      {
        recommend: false,
        text: `Shipping was terrible! Items came broken! I want refund!`,
        author: [createdUsers[4]._id],
      },
      {
        recommend: false,
        text: `I literally got nothing in my mail and it's been over a year...`,
        author: [createdUsers[5]._id],
      },
      {
        recommend: false,
        text: `I enjoy polluting`,
        author: [createdUsers[6]._id],
      },
      {
        recommend: true,
        text: `Absolutely love the design and material of this product. It fits perfectly in my sustainable lifestyle!`,
        author: [createdUsers[7]._id],
      },
      {
        recommend: true,
        text: `Eco-friendly and durable. I'm impressed with the quality for the price.`,
        author: [createdUsers[8]._id],
      },
      {
        recommend: true,
        text: `Got this as a gift for a friend. They couldn't stop praising it! Highly recommend.`,
        author: [createdUsers[9]._id],
      },
      {
        recommend: true,
        text: `I use this product every day in my business. Never had a complaint from customers!`,
        author: [createdUsers[10]._id],
      },
      {
        recommend: false,
        text: `The packaging was flimsy, and the product got damaged during delivery.`,
        author: [createdUsers[11]._id],
      },
      {
        recommend: false,
        text: `Not what I expected. The description was misleading.`,
        author: [createdUsers[12]._id],
      },
      {
        recommend: true,
        text: `Sleek design and environmentally conscious. Win-win!`,
        author: [createdUsers[8]._id],
      },
      {
        recommend: true,
        text: `One of the best sustainable products I've ever purchased. Will buy again.`,
        author: [createdUsers[4]._id],
      },
      {
        recommend: false,
        text: `This might have been the worst product. I've EVER bought from this site. Never buying again!`,
        author: [createdUsers[11]._id],
      },
      {
        recommend: true,
        text: `I love it all! Design, quality, and just the product itself! If I had a lot of money. I would buy these out until they're out of stock!`,
        author: [createdUsers[2]._id],
      },
    ];
    const createdReviews = await Review.insertMany(reviews);
    console.log("Reviews seeded.");

    const products = [
      {
        productName: '6" Classic Round Plate',
        productDescription:
          "Classic 6-inch round plate made from compostable sugarcane fiber.",
        productPrice: 12.99,
        productImage:
          "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Fproducts%2F20210315_tellus-plate-6-inch-a_1024x1024_2x_8eacf5d2-210e-48e8-bed2-bbfef9804e88.webp%3Fv%3D1674506065&w=3840&q=75",
        productQuantity: 150,
        productSku: "PLATE-6RND-01",
        manufacturerSku: "MAN-PLATE-6RND-01",
        productCategory: "Plates",
        reviews: [createdReviews[0]],
      },
      {
        productName: '10" Oval Compostable Plate',
        productDescription:
          "Elegant 10-inch oval plate crafted from sustainable natural fibers.",
        productPrice: 18.99,
        productImage:
          "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Ffiles%2FPL-SC-U10O-LFS_01.png%3Fv%3D1701371899&w=3840&q=75",
        productQuantity: 100,
        productSku: "PLATE-10OVL-01",
        manufacturerSku: "MAN-PLATE-10OVL-01",
        productCategory: "Plates",
        reviews: [createdReviews[1]],
      },
      {
        productName: '8" Wooden Boat',
        productDescription:
          "Durable and eco-friendly 8-inch wooden boat for serving food.",
        productPrice: 9.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Ffiles%2FVT-BT-08_2048x_cfd4c30c-1312-4c34-92ed-7c529bae8cbe.webp%3Fv%3D1694808128&w=3840&q=75",
        productQuantity: 200,
        productSku: "BOAT-8WOOD-01",
        manufacturerSku: "MAN-BOAT-8WOOD-01",
        productCategory: "Serveware",
        reviews: [createdReviews[2]],
      },
      {
        productName: '11" x 11" Square Cheese Board',
        productDescription:
          "Large balsa wood cheese board for stylish food presentations.",
        productPrice: 22.99,
        productImage:
          "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Ffiles%2FCB-SQ-1x1.webp%3Fv%3D1692718384&w=3840&q=75",
        productQuantity: 80,
        productSku: "BOARD-11SQ-01",
        manufacturerSku: "MAN-BOARD-11SQ-01",
        productCategory: "Serveware",
        reviews: [createdReviews[3]],
      },
      {
        productName: '7.5" Wrapped Straw | 5mm | PLA | Bulk | Green',
        productDescription:
          "Eco-friendly 7.5-inch wrapped PLA straws in green color, ideal for bulk usage.",
        productPrice: 6.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Ffiles%2FRenewable_CompostableStrawsGreenWrapped7.75in5mm.png%3Fv%3D1695843521&w=1200&q=75",
        productQuantity: 500,
        productSku: "STRAW-7PLA-01",
        manufacturerSku: "MAN-STRAW-7PLA-01",
        productCategory: "Straws",
        reviews: [createdReviews[4]],
      },
      {
        productName:
          '5.5" PHA Drinking Straws | Unwrapped | Cocktail | Natural White',
        productDescription:
          "Biodegradable 5.5-inch unwrapped PHA straws, perfect for cocktails.",
        productPrice: 5.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Ffiles%2FEP-STPHA513__45181__58115.png%3Fv%3D1727803214&w=1200&q=75",
        productQuantity: 600,
        productSku: "STRAW-5PHA-01",
        manufacturerSku: "MAN-STRAW-5PHA-01",
        productCategory: "Straws",
        reviews: [createdReviews[5]],
      },
      {
        productName: '8.5" Boba Straw | 10mm | Angle Cut PLA | Bulk | Green',
        productDescription:
          "Wide 8.5-inch PLA boba straw with angle cut, ideal for bubble tea lovers.",
        productPrice: 8.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Ffiles%2F8.5inBobaStraw_Unwrapped_Green_10mm.png%3Fv%3D1695746689&w=1200&q=75",
        productQuantity: 400,
        productSku: "STRAW-8BOBA-01",
        manufacturerSku: "MAN-STRAW-8BOBA-01",
        productCategory: "Straws",
        reviews: [createdReviews[6]],
      },
      {
        productName: '7" Yellow Fork | Plantware® High-Heat Utensils',
        productDescription:
          "Durable 7-inch yellow fork made from plant-based high-heat materials.",
        productPrice: 10.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Ffiles%2FFO-PS-6.png%3Fv%3D1705948928&w=1200&q=75",
        productQuantity: 300,
        productSku: "UTENSIL-FORK-01",
        manufacturerSku: "MAN-UTENSIL-FORK-01",
        productCategory: "Utensils",
        reviews: [createdReviews[7]],
      },
      {
        productName: '6" Yellow Spoon | Plantware® High-Heat Utensils',
        productDescription:
          "Sturdy 6-inch yellow spoon designed for high-heat applications.",
        productPrice: 10.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Ffiles%2FEP-S013Y.png%3Fv%3D1695745102&w=1200&q=75",
        productQuantity: 300,
        productSku: "UTENSIL-SPOON-01",
        manufacturerSku: "MAN-UTENSIL-SPOON-01",
        productCategory: "Utensils",
        reviews: [createdReviews[8]],
      },
      {
        productName: '6" Yellow Knife | Plantware® High-Heat Utensils',
        productDescription:
          "Reliable 6-inch yellow knife crafted for plant-based high-heat usage.",
        productPrice: 10.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Ffiles%2FEP-S011Y.png%3Fv%3D1695745160&w=1200&q=75",
        productQuantity: 300,
        productSku: "UTENSIL-KNIFE-01",
        manufacturerSku: "MAN-UTENSIL-KNIFE-01",
        productCategory: "Utensils",
        reviews: [createdReviews[9]],
      },
      {
        productName: '6.7" Bamboo Cutlery Set | Fork/Knife/Spoon/Napkin',
        productDescription:
          "Eco-friendly bamboo cutlery set including fork, knife, spoon, and napkin.",
        productPrice: 15.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Ffiles%2FFO-PS-6.png%3Fv%3D1705948928&w=1200&q=75",
        productQuantity: 200,
        productSku: "CUTLERY-BAMBOO-01",
        manufacturerSku: "MAN-CUTLERY-BAMBOO-01",
        productCategory: "Cutlery Sets",
        reviews: [createdReviews[10]],
      },
      {
        productName:
          "8 oz Compostable Hot Cup | Double Wall | PLA Lined | Responsible Products®",
        productDescription:
          "8 oz double-wall hot cup lined with PLA for compostable use.",
        productPrice: 9.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Ffiles%2FRP-RDC08.webp%3Fv%3D1685543005&w=1200&q=75",
        productQuantity: 500,
        productSku: "CUP-HOT8-01",
        manufacturerSku: "MAN-CUP-HOT8-01",
        productCategory: "Cups",
        reviews: [createdReviews[11]],
      },
      {
        productName:
          "12 oz Compostable Hot Cup | Double Wall | PLA Lined | Responsible Products®",
        productDescription:
          "12 oz double-wall hot cup with compostable PLA lining.",
        productPrice: 12.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Ffiles%2FRP-RDC12_2000x_278844e7-706f-4bbf-9fe7-e00e58f792c8.webp%3Fv%3D1684948465&w=1200&q=75",
        productQuantity: 400,
        productSku: "CUP-HOT12-01",
        manufacturerSku: "MAN-CUP-HOT12-01",
        productCategory: "Cups",
        reviews: [createdReviews[12]],
      },
      {
        productName: "12 oz Cold Cup | Compostable Corn Plastic",
        productDescription:
          "Durable 12 oz cold cup made from compostable corn plastic.",
        productPrice: 8.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Fproducts%2FRP-PLA16_58fe1fdf-f462-49af-8a6a-79c60b81293e.jpg%3Fv%3D1680235469&w=1200&q=75",
        productQuantity: 600,
        productSku: "CUP-COLD12-01",
        manufacturerSku: "MAN-CUP-COLD12-01",
        productCategory: "Cups",
        reviews: [createdReviews[13]],
      },
      {
        productName: "16 oz Cold Cup | Compostable Corn Plastic",
        productDescription:
          "Eco-friendly 16 oz cold cup crafted from compostable corn plastic.",
        productPrice: 10.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Fproducts%2FRP-PLA16.jpg%3Fv%3D1680230987&w=1200&q=75",
        productQuantity: 500,
        productSku: "CUP-COLD16-01",
        manufacturerSku: "MAN-CUP-COLD16-01",
        productCategory: "Cups",
        reviews: [createdReviews[14]],
      },
      {
        productName:
          "Sip Lid for 9-24 oz BlueStripe™ Cold Cup | Recycled Plastic",
        productDescription:
          "Sip lid designed for 9-24 oz cold cups, made with recycled plastic.",
        productPrice: 7.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Ffiles%2FEP-FLCS-R.jpg%3Fv%3D1697477972&w=1200&q=75",
        productQuantity: 300,
        productSku: "LID-SIPBLUES-01",
        manufacturerSku: "MAN-LID-SIPBLUES-01",
        productCategory: "Lids",
        reviews: [createdReviews[15]],
      },
      {
        productName:
          "Fiber Lid for 10-22 oz No Tree® Hot or Cold Cups | No Added PFAS | Sip Lid",
        productDescription:
          "Fiber lid for hot or cold cups, free of added PFAS, with sip-friendly design.",
        productPrice: 8.99,
        productImage: "https://greenpaperproducts.com/_next/image?url=https%3A%2F%2Fcdn.shopify.com%2Fs%2Ffiles%2F1%2F0612%2F3690%2F4162%2Fproducts%2FCUL-FB-8G_01_cb804144-21f1-436c-9772-41a6d55e7d6c.png%3Fv%3D1673036739&w=1200&q=75",
        productQuantity: 350,
        productSku: "LID-FIBER-01",
        manufacturerSku: "MAN-LID-FIBER-01",
        productCategory: "Lids",
        reviews: [createdReviews[16]],
      },
    ];
    let createdProducts = await Product.insertMany(products);
    console.log("Products seeded.");

    console.log("Deleted current data.");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    db.close();
  }
};

run();
