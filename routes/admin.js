const express = require('express');
const router = express.Router();
const auth = require('../utils/authMiddleware');
const productCtrl = require('../controllers/productController');
const db = require('../db');

// admin middleware
const adminOnly = async (req,res,next)=>{
  try{
    if(!req.user) return res.status(401).json({message:'No token'});
    if(req.user.role !== 'admin') return res.status(403).json({message:'Admin only'});
    next();
  }catch(e){res.status(500).json({message:'Server error'})}
};

router.use(auth, adminOnly);

router.get('/orders', async (req,res)=>{
  try{
    const [rows] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  }catch(e){res.status(500).json({message:'Server error'})}
});

router.get('/sales-summary', async (req,res)=>{
  try{
    const [[total]] = await db.query('SELECT IFNULL(SUM(total),0) as total_sales FROM orders WHERE status IN ("paid","shipped")');
    const [[count]] = await db.query('SELECT COUNT(*) as orders_count FROM orders');
    res.json({ total_sales: total.total_sales || 0, orders_count: count.orders_count || 0 });
  }catch(e){res.status(500).json({message:'Server error'})}
});

// product CRUD
router.get('/products', productCtrl.list);
router.post('/products', productCtrl.create);
router.put('/products/:id', productCtrl.update);
router.delete('/products/:id', productCtrl.remove);

module.exports = router;