const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length) return res.status(400).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (name,email,password,role,created_at) VALUES (?,?,?,?,NOW())', [name, email, hash, 'user']);
    res.json({ message: 'Registered' });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, role: user.role, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) { console.error(err); res.status(500).json({ message: 'Server error' }); }
};

const me = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id,name,email,role,created_at FROM users WHERE id = ?', [req.user.id]);
    res.json({ user: rows[0] });
  } catch (err) { res.status(500).json({ message: 'Server error' }); }
};

module.exports = { register, login, me };