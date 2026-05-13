/**
 * 🏆 EXPANDED USA-STYLE DROPSHIPPING PRODUCT DATABASE
 * Categories: New Arrivals, Best Sellers, Trending Tech, Chargers & Gadgets, Home Essentials, Viral Products
 */

export const featuredProducts = [
  // ─── TRENDING TECH ───
  {
    id: 1,
    name: "MagSafe 3-in-1 PowerStation Pro",
    category: "Trending Tech",
    price: 59.99,
    oldPrice: 99.99,
    discount: "40%",
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?w=800&q=80",
    tag: "Viral Product",
    badge: "Bestseller",
    rating: 4.9,
    reviews: 2847,
    stock: 48,
    description: "The ultimate charging hub for your Apple ecosystem. Fast-charge iPhone, Watch, and AirPods simultaneously.",
    specs: ["15W MagSafe Fast Charge", "Qi-Compatible", "Premium Zinc Alloy", "Overheat Protection"],
    warranty: "Lifetime Warranty",
    video: "https://v.lemonlight.com/640x360.mp4"
  },
  {
    id: 2,
    name: "Anti-Gravity Aura Humidifier",
    category: "Trending Tech",
    price: 74.99,
    oldPrice: 124.99,
    discount: "40%",
    image: "https://images.unsplash.com/photo-1585611183913-9154a438848d?w=800&q=80",
    tag: "Viral Product",
    badge: "Trending",
    rating: 4.8,
    reviews: 1934,
    stock: 31,
    description: "Levitating water drops that defy gravity while purifying your air. Perfect for high-end desk setups.",
    specs: ["Ultrasonic Mist", "LED Clock Display", "Auto Shut-off", "USB-C Powered"]
  },

  // ─── CHARGERS & GADGETS ───
  {
    id: 3,
    name: "65W GaN Crystal Charger",
    category: "Chargers & Gadgets",
    price: 39.99,
    oldPrice: 69.99,
    discount: "42%",
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&q=80",
    tag: "Viral Product",
    badge: "Hot Choice",
    rating: 4.7,
    reviews: 856,
    stock: 120,
    description: "The world's smallest 65W GaN charger with a transparent futuristic design."
  },
  {
    id: 4,
    name: "Invisible Desktop Wireless Charger",
    category: "Chargers & Gadgets",
    price: 45.99,
    oldPrice: 79.99,
    discount: "43%",
    image: "https://images.unsplash.com/photo-1610940882244-116086f6f9fc?w=800&q=80",
    tag: "Viral Product",
    badge: "Innovative",
    rating: 4.9,
    reviews: 1102,
    stock: 55,
    description: "Turns any desk into a wireless charger. Mounts under the table and charges through wood/glass."
  },

  // ─── NEW ARRIVALS ───
  {
    id: 5,
    name: "Ultra Slim RGB Mechanical Keyboard",
    category: "New Arrivals",
    price: 89.99,
    oldPrice: 149.99,
    discount: "40%",
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=800&q=80",
    tag: "Viral Product",
    badge: "New",
    rating: 4.8,
    reviews: 420,
    stock: 25,
    description: "Anodized aluminum body with low-profile mechanical switches. The peak of desk aesthetics."
  },
  {
    id: 6,
    name: "Minimalist Leather Desk Mat Pro",
    category: "New Arrivals",
    price: 34.99,
    oldPrice: 59.99,
    discount: "41%",
    image: "https://images.unsplash.com/photo-1541140532154-b024d715b909?w=800&q=80",
    tag: "Viral Product",
    badge: "New",
    rating: 4.7,
    reviews: 630,
    stock: 80,
    description: "Premium vegan leather mat that protects your desk and improves mouse precision."
  },

  // ─── BEST SELLERS ───
  {
    id: 7,
    name: "Orbit Floating Globe Lamp",
    category: "Best Sellers",
    price: 99.99,
    oldPrice: 169.99,
    discount: "41%",
    image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=800&q=80",
    tag: "Viral Product",
    badge: "Best Seller",
    rating: 4.9,
    reviews: 3500,
    stock: 12,
    description: "Magnetic levitation globe that rotates in mid-air. The ultimate conversation piece."
  },

  // ─── HOME ESSENTIALS ───
  {
    id: 8,
    name: "Smart Motion Sensor LED Strip",
    category: "Home Essentials",
    price: 24.99,
    oldPrice: 44.99,
    discount: "45%",
    image: "https://images.unsplash.com/photo-1550985543-f47f38aee65e?w=800&q=80",
    tag: "Viral Product",
    badge: "Useful",
    rating: 4.8,
    reviews: 2100,
    stock: 200,
    description: "Automatically lights up your stairs or closet when you walk by. Tool-free installation."
  },
  {
    id: 9,
    name: "Aesthetic Flame Diffuser",
    category: "Home Essentials",
    price: 49.99,
    oldPrice: 89.99,
    discount: "44%",
    image: "https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&q=80",
    tag: "Viral Product",
    badge: "Viral",
    rating: 4.8,
    reviews: 4300,
    stock: 90,
    description: "Ultrasonic aromatherapy with a unique flame effect. 7-color ambient lighting."
  }
];

export const reviews = [
  { id: 1, name: "John D.", location: "New York, USA", rating: 5, comment: "Absolutely stunning product! The quality exceeded my expectations. Shipping was incredibly fast.", date: "2 days ago" },
  { id: 2, name: "Sarah M.", location: "California, USA", rating: 5, comment: "Perfect for my home office setup. I've bought 3 items from Lumina and all are top notch.", date: "1 week ago" },
  { id: 3, name: "Michael R.", location: "Texas, USA", rating: 5, comment: "The anti-gravity humidifier is magic! My friends always ask about it. 10/10 recommend.", date: "3 days ago" },
  { id: 4, name: "Emma W.", location: "Florida, USA", rating: 4, comment: "Great gadgets, very modern design. Customer support was very helpful with my tracking.", date: "5 days ago" }
];
