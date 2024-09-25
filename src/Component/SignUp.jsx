import React, { useState, useSyncExternalStore } from 'react'
import { signUp } from '../../Firebase/Auth'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate, useParams } from 'react-router-dom'

function SignUp() {

  const navigate = useNavigate()
  
  const type = useParams()
  const role  = type.type

  
  

  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [loading , setLoading] = useState(false)

  const createAccount = async (e) => {
    e.preventDefault(); 

    if (!name || !email || !password) {
        toast.error('Please fill in all fields', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Bounce
        });
        return;
    }

    try {
        const user = await signUp(email, password, name , role);
        if (user) {
            toast.success('Account created successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                transition: Bounce
            });
            navigate('/LogIn')
           
        }
    } catch (error) {
        toast.error(error.message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
            transition: Bounce
        });
       
    }
    finally{
     setLoading(false);
    }
};

  return (

    
     <div className="container">
       <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition={Bounce}
            />
       <div className='auth-container'>
       <h1>
        Sign Up
      </h1>
      <form>
        <label htmlFor="">Name</label>
        <input 
        type="text" 
        id="name" 
        name="name"
        value={name}
        onChange={(e)=>setName(e.target.value)}
         placeholder="Enter your name"/>
        <br/>

        <label htmlFor="">Email</label>
        <input
         type="email" 
         id="email" 
         name="email"
         value={email}
         onChange={(e)=>setEmail(e.target.value)}
          placeholder="Enter your email"/>
        <br/>

        <label htmlFor="">Password</label>
        <input type="password" 
        id="password" 
        name="password" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        placeholder="Enter your password"/>
      
        <br />
        <button onClick={createAccount}>{loading? "Signing Up...": "Sign Up"}</button>
      </form>
      <span>Have an account <Link to='/LogIn'>Log in</Link> </span>
       </div>
     </div>
    
  )
}

export default SignUp
