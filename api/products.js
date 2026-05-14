// Vercel Serverless Function (Node.js)
// API Endpoint for Products

export default function handler(req, res) {
  // Mock Database for UAE Products
  const products = [
    { id: 1, name: "Lumina Air Gen 2", price: 299, category: "Tech", stock: 45 },
    { id: 2, name: "Titanium Charger", price: 149, category: "Accessories", stock: 120 },
    { id: 3, name: "Minimalist Desk Pad", price: 89, category: "Lifestyle", stock: 32 }
  ];

  if (req.method === 'GET') {
    return res.status(200).json(products);
  }

  if (req.method === 'POST') {
    // Logic to add a new product
    const newProduct = req.body;
    return res.status(201).json({ message: "Product Added Successfully", product: newProduct });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
