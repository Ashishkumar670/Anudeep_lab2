import React, {useState} from 'react';
export default function Cart(){
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')||'[]'));
  const total = cart.reduce((s,i)=>s + i.price*i.qty,0);
  const checkout = ()=> window.location.href = '/checkout';
  return (
    <div className="container py-4">
      <h2>Your cart</h2>
      {cart.length===0 ? <p>Cart empty</p> : (
        <div>
          {cart.map((it, idx)=> (
            <div key={idx} className="d-flex justify-content-between py-2">
              <div>{it.title} x {it.qty}</div>
              <div>${(it.price*it.qty).toFixed(2)}</div>
            </div>
          ))}
          <hr/>
          <h4>Total: ${total.toFixed(2)}</h4>
          <button className="btn btn-success" onClick={checkout}>Checkout</button>
        </div>
      )}
    </div>
  );
}