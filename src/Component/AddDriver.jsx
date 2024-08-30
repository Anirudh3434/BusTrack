import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../Firebase/Auth';
import service from '../../Appwrite/Database';

function AddDriver() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [DL, setDl] = useState('');
  const [role] = useState('driver');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name || !age || !email || !password || !DL) {
      alert('Please fill all the fields');
      return;
    }

    setLoading(true);

    try {
      const response = await signUp(email, password, name, role);
      if (response) {
        try {
          const data = {
            name: name.toUpperCase(),
            DL: DL.toUpperCase(),
            age: age,
            email: email,
            role: role,
          };

          await service.createDriver(data);
          alert('Driver added successfully');
          navigate('/admin');
        } catch (error) {
          alert('Error adding to database: ' + error);
          console.error(error);
        }
      }
    } catch (error) {
      alert(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='AddDriver'>
      <h2>Add Driver</h2>
    
    
      <form onSubmit={handleCreate}>
        <div className='driverContainer'>
          <div className='driverInfo'>
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type='text'
              placeholder='Enter Driver Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type='password'
              placeholder='Enter Driver Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='driverInfo'>
            <label htmlFor="name">Driver Name:</label>
            <input
              id="name"
              type='text'
              placeholder='Enter Driver Name'
              value={name}
              onChange={(e) => setName(e.target.value.toUpperCase())}
            />
            <label htmlFor="age">Age:</label>
            <input
              id="age"
              type='text'
              placeholder='Enter Driver Age'
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className='driverInfo'>
            <label htmlFor="DL">DL No.:</label>
            <input
              id="DL"
              type='text'
              placeholder='Enter Driver DL No.'
              value={DL}
              onChange={(e) => setDl(e.target.value.toUpperCase())}
            />
          </div>
          <button type='submit' disabled={loading}>
            {loading ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDriver;
