import React, {useEffect, useState} from 'react';
import API from '../api';
import ProductCard from './ProductCard';

export default function Home(){
  const [products, setProducts] = useState([]);
  useEffect(()=>{ API.get('/products').then(r=>setProducts(r.data)).catch(console.error); },[]);
  return (
    <div className="container py-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1>ShoeStore</h1>
        <div>
          <a className="btn btn-outline-primary me-2" href="/cart">Cart</a>
          <a className="btn btn-primary" href="/login">Login</a>
        </div>
      </header>

      <div className="row">
        {products.map(p=> (
          <div key={p.id} className="col-sm-6 col-md-4 mb-4">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}