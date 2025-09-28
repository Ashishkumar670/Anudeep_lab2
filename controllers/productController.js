const db = require('../db');
module.exports = {
  list: async (req, res) => {
    try {
      const [rows] = await db.query('SELECT * FROM products ORDER BY created_at DESC');
      res.json(rows);
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
  },
  get: async (req, res) => {
    try {
      const id = req.params.id;
      const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
      res.json(rows[0]);
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
  },
  create: async (req, res) => {
    try {
      const { title, brand, sku, price, size_options, stock, image_url, image_alt, image_description, description } = req.body;
      const [result] = await db.query('INSERT INTO products (title,brand,sku,price,size_options,stock,image_url,image_alt,image_description,description,created_at) VALUES (?,?,?,?,?,?,?,?,?,?,NOW())',
        [title,brand,sku,price,size_options,stock,image_url,image_alt,image_description,description]);
      res.json({ id: result.insertId });
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const fields = req.body;
      const sets = Object.keys(fields).map(k=>`${k}=?`).join(', ');
      const values = Object.values(fields);
      values.push(id);
      await db.query(`UPDATE products SET ${sets} WHERE id = ?`, values);
      res.json({ message: 'Updated' });
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
  },
  remove: async (req, res) => {
    try {
      const id = req.params.id;
      await db.query('DELETE FROM products WHERE id = ?', [id]);
      res.json({ message: 'Deleted' });
    } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
  }
};