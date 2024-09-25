import React, { useState, useEffect } from 'react';
import Driver from '../assets/Driverid.png';
import { RxCross2 } from "react-icons/rx";

import { useDispatch } from 'react-redux';
import { logOut } from '../../Store/Slice';
import { LogOut } from '../../Firebase/Auth';
import { useNavigate } from 'react-router-dom';

function DriverIdCard({ method, User }) {
    const [data, setData] = useState(null);

  const  dispatch = useDispatch()
  const navigate = useNavigate()


    const handleLogout = async () => {
        try {
          const response = await LogOut();
         
            dispatch(logOut());
            navigate('/type');
         
        } catch (error) {
          console.error("Logout failed: ", error);
        }
      };

    useEffect(() => {
        if (User && User.documents && User.documents.length > 0) {
            setData(User.documents[0]);
        }
    }, [User]);

    return (
        <div className='idCardContainer'>
            <button className='back' onClick={() => method(false)}><RxCross2 /></button>
            <div className='IdCard'>
                <div className='idCardHeader'>
                    <img src={Driver} alt="" />
                    <h1>{data ? data.driver_name : ''}</h1>
                </div>
                <div className='idCardFooter'>
                    <h3>DL No.</h3>
                    <span>{data ? data.DL : ''}</span>
                    <div className='driverinfo'>
                        <span><b>Age: </b> {data ? data.age : ''}</span>
                        <span><b>Email: </b> {data ? data.driver_email : ''}</span>
                    </div>
                    <button className='LogOut' onClick={handleLogout}>
            Log Out
          </button>
                </div>
            </div>
        </div>
    );
}

export default DriverIdCard;
