import React, {useState} from 'react';
import API from '../api';
export default function Checkout(){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  const total = cart.reduce((s,i)=>s + i.price*i.qty,0);
  const [loading,setLoading] = useState(false);
  const placeOrder = async () => {
    setLoading(true);
    try{
      const shipping = { address: '123 Demo St', city: 'City', postal: '00000' };
      const res = await API.post('/orders', { items: cart, shipping, total });
      localStorage.removeItem('cart');
      alert('Order placed: ' + res.data.orderId);
      window.location.href = '/';
    }catch(e){
      alert('Error placing order');
    }finally{setLoading(false)}
  }
  return (
    <div className="container py-4">
      <h2>Checkout</h2>
      <p>Items: {cart.length}</p>
      <h4>Total: ${total.toFixed(2)}</h4>
      <p>This demo uses a payment placeholder. Integrate Stripe by following README instructions.</p>
      <button className="btn btn-primary" onClick={placeOrder} disabled={loading}>{loading? 'Placing...' : 'Place Order'}</button>
    </div>
  );
}