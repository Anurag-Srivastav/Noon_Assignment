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
    ],
    tags: ["Selling fast"],
    description:
      "A feature-rich smart watch to track your fitness, heart rate, and notifications.",
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
    ],
    tags: ["Top rated", "Adjustable"],
    description:
      "Adjustable aluminum tablet stand with 360° rotation and stable base.",
  },
];

export const PRODUCTS = {
  products: productItems,
  forYou: forYouItems,
};
