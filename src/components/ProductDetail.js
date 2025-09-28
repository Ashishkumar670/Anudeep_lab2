import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import API from '../api';

export default function ProductDetail(){
  const { id } = useParams();
  const [p, setP] = useState(null);
  useEffect(()=>{ API.get('/products/' + id).then(r=>setP(r.data)).catch(console.error); },[id]);
  if(!p) return <div className="container py-4">Loading...</div>;
  const addToCart = ()=>{
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    cart.push({product_id: p.id, qty:1, price: p.price, title: p.title});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  }
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-6">
          <img src={p.image_url} alt={p.image_alt} title={p.image_description} className="img-fluid" loading="lazy" />
        </div>
        <div className="col-md-6">
          <h2>{p.title}</h2>
          <p><strong>Brand:</strong> {p.brand}</p>
          <p><strong>Price:</strong> ${p.price}</p>
          <p>{p.description}</p>
          <button className="btn btn-primary" onClick={addToCart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
}