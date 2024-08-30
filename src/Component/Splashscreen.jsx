import React, { useEffect } from 'react'
import  logo from '../assets/logo.png'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Splashscreen() {
    const navigate = useNavigate()

    const auth = useSelector((state)=>state.auth.status)

    useEffect(() => {
        setTimeout(() => {
        if(auth == 'logged_in'){
          navigate('/middleAuth')
        }
           else{
            navigate('/type')
           }
        }, 3000);
      }, []);
      

    return (
        <div className='Splashscreen-container'>
            <img src={logo} alt="" className='logo' />
        </div>
    )
}

export default Splashscreen

