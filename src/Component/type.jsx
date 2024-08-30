import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import driver from '../assets/driver.png';
import passenger from '../assets/passenger.png';
import management from '../assets/management-icon.png';
import Poster from '../assets/poster.jpg';
import { RxCross2 } from "react-icons/rx";

function Type() {
    const [poster, setPoster] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setPoster(true);
        }, 3000);

        
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='type-container'>
            <h1>Choose The Type</h1>
            <div className='type-list'>
                <Link className='link' to='/login'>
                    <div className='type-card'>
                        <img src={driver} alt="Driver" className='types' />
                        <h2>Driver</h2>
                    </div>
                </Link>
                <Link className='link' to='/signUp/passenger'>
                    <div className='type-card'>
                        <img src={passenger} alt="Passenger" className='types' />
                        <h2>Passenger</h2>
                    </div>
                </Link>
                <Link className='link' to='/login'>
                    <div className='type-card'>
                        <img src={management} alt="Management" className='types' />
                        <h2>Management</h2>
                    </div>
                </Link>
            </div>

            {poster && (
                <div className='poster'>
                    <button onClick={() => setPoster(false)}>
                        <RxCross2 />
                    </button>
                    <img src={Poster} alt="Poster" className='Pimage' />
                </div>
            )}
        </div>
    );
}

export default Type;
