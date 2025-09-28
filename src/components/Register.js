import React, {useState} from 'react';
import API from '../api';
export default function Register(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const submit = async e =>{
    e.preventDefault();
    try{ await API.post('/auth/register',{name,email,password}); alert('Registered - please login'); window.location.href='/login'; }
    catch(e){ alert('Register failed'); }
  }
  return (
    <div className="container py-4">
      <h2>Register</h2>
      <form onSubmit={submit} style={{maxWidth:400}}>
        <input className="form-control mb-2" value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" />
        <input className="form-control mb-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="form-control mb-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button className="btn btn-primary">Register</button>
      </form>
    </div>
  );
}