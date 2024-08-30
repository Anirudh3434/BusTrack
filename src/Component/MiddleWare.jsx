import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUserRole , getCurrentUser, getCurrentUserName } from '../../Firebase/Auth';
import { setRole , setName } from '../../Store/Slice';
import { useDispatch } from 'react-redux';

function MiddleWare() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const redirect = async () => { 
            try {
                const userName = await getCurrentUserName()
                console.log(userName);
                
                if(userName){
                    dispatch(setName(userName))
                }
                const userRole = await getCurrentUserRole();
                console.log(userRole);
                dispatch(setRole(userRole));

                if (userRole === 'Admin') {
                    navigate('/admin');
                } else if (userRole === 'passenger') {
                    navigate('/Home');
                } else if (userRole === 'driver') {
                    navigate('/driverDashbroad');
                } else {
                    // Handle unexpected roles or unauthenticated users
                    navigate('/login');
                }
            } catch (error) {
                console.error('Error in fetching role:', error);
                
                navigate('/error'); 
            }
        };

        redirect();
    }, [dispatch, navigate]);

    return (
        <div className='loader'>
            <h1>Loading...</h1>
        </div>
    );
}

export default MiddleWare;
