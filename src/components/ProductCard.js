import React from 'react';
export default function ProductCard({product}){
  const addToCart = ()=>{
    const cart = JSON.parse(localStorage.getItem('cart')||'[]');
    cart.push({product_id: product.id, qty:1, price: product.price, title: product.title});
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  }
  return (
    <div className="card h-100 shadow-sm">
      <a href={'/product/' + product.id}><img src={product.image_url} className="card-img-top" alt={product.image_alt} title={product.image_description} loading="lazy" /></a>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.brand} — ${product.price}</p>
        <div className="mt-auto">
          <button onClick={addToCart} className="btn btn-primary w-100">Add to cart</button>
        </div>
      </div>
    </div>
  );
}