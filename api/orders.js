// Vercel Serverless Function (Node.js)
// API Endpoint for UAE Orders

export default function handler(req, res) {
  const orders = [
    { id: '#UAE-9021', customer: 'Ahmed Al-Maktoum', city: 'Dubai', total: 1250, status: 'Delivered' },
    { id: '#UAE-9022', customer: 'Sarah Rashid', city: 'Abu Dhabi', total: 850, status: 'Processing' }
  ];

  if (req.method === 'GET') {
    return res.status(200).json(orders);
  }

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
