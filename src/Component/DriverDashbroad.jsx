import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../Firebase/Auth';
import { FaBus } from 'react-icons/fa';
import service from '../../Appwrite/Database';
import { CgProfile } from "react-icons/cg";
import DriverIdCard from './DriverIdCard';
import motivation from '../../motivation';
import { FaArrowRightLong } from "react-icons/fa6";
import busService from '../../Appwrite/BusDatabase';

function DriverDashboard() {
    const [User, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(false);
    const [bus, setBus] = useState([]);
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(4);
    const [time, setTime] = useState('');
    const [lat , setLat] = useState(0.0)
    const [long  , setLong] = useState(0.0)



   

    const startRide = (id) => {
        const updateLocation = async () => {
            try {
                navigator.geolocation.getCurrentPosition(
                    async (position) => {
                        const current_latitude = position.coords.latitude;
                        const current_longitude = position.coords.longitude;

                        await busService.updateBus(id, { current_latitude : current_latitude , current_longitude : current_longitude});
                        console.log("Bus location updated");
                    },
                    (error) => {
                        console.error("Error getting location:", error);
                    },
                    { enableHighAccuracy: true }
                );
            } catch (error) {
                console.error("Error updating location:", error);
            }
        };

       let stop = setInterval(updateLocation, 5000);
    };

    useEffect(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' });
        setTime(timeString);

        const timeInterval = setInterval(() => {
            const updatedTimeString = new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' });
            setTime(updatedTimeString);
        }, 60000);

        return () => clearInterval(timeInterval);
    }, []);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getCurrentUser();
                if (userData) {
                    setUser(userData);
                    setEmail(userData.email);
                } else {
                    console.warn('No user data found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchRideData = async () => {
            if (email) {
                try {
                    const response = await service.getDriver(email);
                    if (response) {
                        setData(response);
                        setBus(response.documents[0].bus);
                    } else {
                        console.warn('No ride data found for the user');
                    }
                } catch (error) {
                    console.error('Error fetching ride data:', error);
                }
            }
        };

        fetchRideData();
    }, [email]);

    useEffect(() => {
        const interval = setInterval(() => {
            setStart(prevStart => (prevStart + 4) % motivation.length);
            setEnd(prevEnd => (prevEnd + 4) % motivation.length);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className='DriverDashboadContainer'>
            <div className='driverNav'>
                <h2><FaBus /> Driver Dashboard</h2>
                <div className='profile'>
                    <span>{User && User.displayName}</span>
                    <button 
                        style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                        onClick={() => setId(true)}
                    >
                        <div className='profileicon'>
                            <CgProfile />
                        </div>
                    </button>
                </div>
            </div>

            <h1>Hi {User && User.displayName}! Comment by Passenger for you 😊</h1>

            <div className='motivation'>
                {motivation.slice(start, end).map((element, index) => (
                    <div key={index} className='motivationCard'>
                        <span>{element.line}</span>
                    </div>
                ))}
            </div>

            <h2>Your Rides</h2>

            <div className='BusDetail'>
                {
                    bus && bus.map((element, index) => (
                        <div key={index} className='BusDetailCard'>
                            <h3>{element.busNo}</h3>
                            <div className='row'>
                                <span>{element.From}</span>
                                <span><FaArrowRightLong /></span>
                                <span>{element.To}</span>
                            </div>
                            <span>Type: {element.model}</span>
                            <div className='row'>
                                <p>{element.time}</p>
                                <p>{element.date}</p>
                            </div>

                          
                            {element.time <= time && (
                                <button onClick={() => { startRide(element.$id) }}>
                                   Start
                                </button>
                            )}

                          
                            </div>
                        
                    ))
                }
            </div>

            {id && <DriverIdCard method={setId} User={data} />}
        </div>
    );
}

export default DriverDashboard;
