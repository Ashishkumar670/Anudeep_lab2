import React, {useEffect, useState} from 'react';
import API from '../api';
export default function AdminDashboard(){
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const [products, setProducts] = useState([]);
  const [summary, setSummary] = useState({});
  useEffect(()=>{
    if(!user || user.role !== 'admin') { window.location.href = '/login'; return; }
    API.get('/admin/products').then(r=>setProducts(r.data)).catch(console.error);
    API.get('/admin/sales-summary').then(r=>setSummary(r.data)).catch(()=>{});
  },[]);
  return (
    <div className="container py-4">
      <h2>Admin Dashboard</h2>
      <p>Welcome, {user?.name}</p>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3 mb-3">
            <h5>Sales</h5>
            <p>Total sales: ${summary.total_sales || 0}</p>
            <p>Orders: {summary.orders_count || 0}</p>
          </div>
        </div>
        <div className="col-md-8">
          <div className="card p-3">
            <h5>Products</h5>
            <table className="table">
              <thead><tr><th>Title</th><th>Brand</th><th>Price</th></tr></thead>
              <tbody>
                {products.map(p=> <tr key={p.id}><td>{p.title}</td><td>{p.brand}</td><td>${p.price}</td></tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <p className="mt-3">Admin features include product CRUD and order management via API endpoints. Use Postman or extend the UI to edit.</p>
    </div>
  );
}