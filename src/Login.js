import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const { username, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', {
        username,
        password
      });
      const { token } = res.data;
      localStorage.setItem('token', token);
      navigate('/');
    } catch (err) {
      console.error('Login Error:', err.response.data);
      // Display error message to the user (customize as needed)
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-40 ">
      <h1 className="text-3xl font-bold mb-4 text-center ">Login</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          required
        />
        <br />
        <button type="submit"  className="w-full bg-indigo-500 text-white py-2 px-4 rounded-lg hover:bg-indigo-600 focus:outline-none ">Login</button>
      </form>
    </div>
  );
};

export default Login;
