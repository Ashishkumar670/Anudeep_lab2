import React, {useState} from 'react';
import API from '../api';
export default function Login(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const submit = async e =>{
    e.preventDefault();
    try{
      const r = await API.post('/auth/login',{email,password});
      localStorage.setItem('token', r.data.token);
      localStorage.setItem('user', JSON.stringify(r.data.user));
      alert('Logged in');
      window.location.href = '/';
    }catch(e){ alert('Login failed'); }
  }
  return (
    <div className="container py-4">
      <h2>Login</h2>
      <form onSubmit={submit} style={{maxWidth:400}}>
        <input className="form-control mb-2" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
        <input type="password" className="form-control mb-2" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}