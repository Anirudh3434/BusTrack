import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function MiddleWare() {
    const navigate = useNavigate();
    const userRole = useSelector((state) => state.auth.role);

    useEffect(() => {
        const redirect = () => {
            console.log(userRole);

            if (userRole === 'Admin') {
                navigate('/admin');
            } else if (userRole === 'passenger') {
                navigate('/Home');
            } else if (userRole === 'driver') {
                navigate('/driverDashbroad');
            }
        };

        redirect();
    }, [userRole, navigate]);

    return (
        <div className='loader'>
            <h1>Loading...</h1>
        </div>
    );
}

export default MiddleWare;
