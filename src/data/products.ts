export type Product = {
  id: string;
  name: string;
  price: number;
  rating: number;
  images: string[]; // URLs or require()
  tags?: string[];
  description?: string;
};

const productItems: Product[] = [
  {
    id: "p1",
    name: "Wireless Headphones",
    price: 2499,
    rating: 4.5,
    images: [
      "https://images.pexels.com/photos/374777/pexels-photo-374777.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/339465/pexels-photo-339465.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Free delivery", "Selling fast"],
    description:
      "High-quality wireless headphones with noise cancellation and deep bass.",
  },

  {
    id: "p2",
    name: "Running Shoes",
    price: 3999,
    rating: 4.3,
    images: [
      "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1024831/pexels-photo-1024831.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Free delivery"],
    description:
      "Lightweight running shoes designed for comfort and long-distance performance.",
  },

  {
    id: "p3",
    name: "Smart Watch",
    price: 9999,
    rating: 4.7,
    images: [
      "https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Selling fast"],
    description:
      "A feature-rich smart watch to track your fitness, heart rate, and notifications.",
  },
  {
    id: "p4",
    name: "Bluetooth Speaker",
    price: 3499,
    rating: 4.8,
    images: [
      "https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/8000623/pexels-photo-8000623.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6069000/pexels-photo-6069000.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7169007/pexels-photo-7169007.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Bestseller", "Free delivery"],
    description:
      "Portable Bluetooth speaker with 360° sound, waterproof design, and 12-hour battery life.",
  },
  {
    id: "p5",
    name: "Gaming Keyboard",
    price: 5999,
    rating: 4.9,
    images: [
      "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7181250/pexels-photo-7181250.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Top rated", "RGB lighting"],
    description:
      "Mechanical gaming keyboard with RGB backlight, programmable keys, and anti-ghosting technology.",
  },
];

const forYouItems: Product[] = [
  {
    id: "fy1",
    name: "Bluetooth Speaker",
    price: 1899,
    rating: 4.6,
    images: [
      "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/8000623/pexels-photo-8000623.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1484771/pexels-photo-1484771.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/6069000/pexels-photo-6069000.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Free delivery", "Top rated"],
    description:
      "Portable Bluetooth speaker with 360° sound and 12-hour battery life.",
  },
  {
    id: "fy2",
    name: "Laptop Backpack",
    price: 1299,
    rating: 4.2,
    images: [
      "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2774568/pexels-photo-2774568.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1545998/pexels-photo-1545998.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Free delivery"],
    description:
      "Durable laptop backpack with multiple compartments and USB charging port.",
  },
  {
    id: "fy3",
    name: "Coffee Maker",
    price: 4499,
    rating: 4.8,
    images: [
      "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Selling fast"],
    description:
      "Programmable coffee maker with thermal carafe and auto-brew function.",
  },
  {
    id: "fy4",
    name: "Yoga Mat",
    price: 799,
    rating: 4.4,
    images: [
      "https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3984340/pexels-photo-3984340.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4056535/pexels-photo-4056535.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Free delivery", "Eco-friendly"],
    description:
      "Non-slip yoga mat made from natural rubber with alignment marks.",
  },
  {
    id: "fy5",
    name: "Desk Lamp",
    price: 1599,
    rating: 4.5,
    images: [
      "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1329711/pexels-photo-1329711.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1090638/pexels-photo-1090638.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1484516/pexels-photo-1484516.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2635038/pexels-photo-2635038.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Top rated"],
    description:
      "LED desk lamp with adjustable brightness and USB charging port.",
  },
  {
    id: "fy6",
    name: "Water Bottle",
    price: 599,
    rating: 4.7,
    images: [
      "https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4005511/pexels-photo-4005511.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3830752/pexels-photo-3830752.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Free delivery", "Bestseller"],
    description:
      "Insulated stainless steel water bottle that keeps drinks cold for 24 hours.",
  },
  {
    id: "fy7",
    name: "Wireless Mouse",
    price: 899,
    rating: 4.3,
    images: [
      "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2148219/pexels-photo-2148219.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7171735/pexels-photo-7171735.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Selling fast"],
    description:
      "Ergonomic wireless mouse with precision tracking and long battery life.",
  },
  {
    id: "fy8",
    name: "Phone Case",
    price: 499,
    rating: 4.1,
    images: [
      "https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4666750/pexels-photo-4666750.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/5081407/pexels-photo-5081407.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/5081914/pexels-photo-5081914.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Free delivery", "New arrival"],
    description:
      "Slim protective phone case with shock absorption and raised edges.",
  },
  {
    id: "fy9",
    name: "Tablet Stand",
    price: 1199,
    rating: 4.6,
    images: [
      "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1334598/pexels-photo-1334598.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["Top rated", "Adjustable"],
    description:
      "Adjustable aluminum tablet stand with 360° rotation and stable base.",
  },
];

const newArrivalsItems: Product[] = [
  {
    id: "na1",
    name: "Mechanical Keyboard",
    price: 5499,
    rating: 4.8,
    images: [
      "https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1772123/pexels-photo-1772123.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2582928/pexels-photo-2582928.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1336990/pexels-photo-1336990.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["New arrival", "Gaming"],
    description:
      "RGB mechanical keyboard with customizable keys and tactile feedback for gamers and typists.",
  },
  {
    id: "na2",
    name: "Portable Charger 20000mAh",
    price: 2299,
    rating: 4.6,
    images: [
      "https://images.pexels.com/photos/4224099/pexels-photo-4224099.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4195330/pexels-photo-4195330.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7242908/pexels-photo-7242908.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["New arrival", "Fast charging"],
    description:
      "High-capacity portable charger with dual USB ports and LED display for battery level.",
  },
  {
    id: "na3",
    name: "4K Webcam",
    price: 8999,
    rating: 4.7,
    images: [
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2606383/pexels-photo-2606383.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/63690/pexels-photo-63690.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["New arrival", "Top rated"],
    description:
      "Ultra HD 4K webcam with auto-focus, built-in microphone, and wide-angle lens for streaming.",
  },
  {
    id: "na4",
    name: "Gaming Mouse Pad XXL",
    price: 1299,
    rating: 4.5,
    images: [
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1194420/pexels-photo-1194420.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/9072316/pexels-photo-9072316.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["New arrival", "Extended"],
    description:
      "Extra-large gaming mouse pad with RGB lighting and anti-slip rubber base for desktop setup.",
  },
  {
    id: "na5",
    name: "Noise Cancelling Earbuds",
    price: 3499,
    rating: 4.9,
    images: [
      "https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4226881/pexels-photo-4226881.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/3825529/pexels-photo-3825529.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/8000623/pexels-photo-8000623.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["New arrival", "Best seller"],
    description:
      "True wireless earbuds with active noise cancellation and 24-hour battery life with charging case.",
  },
  {
    id: "na6",
    name: "USB-C Hub 7-in-1",
    price: 2799,
    rating: 4.4,
    images: [
      "https://images.pexels.com/photos/4226256/pexels-photo-4226256.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/5081914/pexels-photo-5081914.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/7242908/pexels-photo-7242908.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/4224099/pexels-photo-4224099.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    tags: ["New arrival", "Multi-port"],
    description:
      "Compact USB-C hub with HDMI, SD card reader, USB 3.0 ports, and 100W power delivery.",
  },
];

export const PRODUCTS = {
  products: productItems,
  forYou: forYouItems,
  newArrivals: newArrivalsItems,
};
