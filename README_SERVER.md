Server README - ShoeStore
------------------------
1. Create a MySQL database and run the SQL file:
   mysql -u root -p < server/sql/schema.sql
2. Copy .env.example to .env and fill DB credentials and JWT_SECRET.
3. Install dependencies and start server:
   cd server
   npm install
   npm run dev    # requires nodemon, or npm start
4. Server runs on PORT (default 5000). API endpoints:
   POST /api/auth/register
   POST /api/auth/login
   GET  /api/products
   GET  /api/products/:id
   POST /api/orders  (protected)
   GET  /api/orders/mine (protected)
   Admin routes: /api/admin/* (protected + admin role)
Note: Replace placeholder admin password hash with a bcrypt hash of your chosen password.