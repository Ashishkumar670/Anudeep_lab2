const db = require('../db');

module.exports = {
  place: async (req, res) => {
    try {
      const { items, shipping, total } = req.body;
      if (!items || !items.length) return res.status(400).json({ message: 'No items' });
      const [r] = await db.query('INSERT INTO orders (user_id, total, shipping_address, status, created_at) VALUES (?,?,?,?,NOW())', [req.user.id, total, JSON.stringify(shipping), 'pending']);
      const orderId = r.insertId;
      for (const it of items) {
        await db.query('INSERT INTO order_items (order_id, product_id, qty, price) VALUES (?,?,?,?)', [orderId, it.product_id, it.qty, it.price]);
      }
      res.json({ message: 'Order placed', orderId });
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
  },
  listForUser: async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [req.user.id]);
      res.json(rows);
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
  }
};