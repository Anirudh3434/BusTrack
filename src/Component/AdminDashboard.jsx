import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import fetchWeather from '../../weather';
import { TiWeatherSunny } from "react-icons/ti";
import { IoLocation } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";

import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

function AdminDashboard() {
    const [weatherInfo, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [Time, setTime] = useState('');


    

 

    const now = new Date(); 
    setInterval(() => {
        const timeString = now.toLocaleTimeString(); 
        setTime(timeString);
    }, 1000);
    const timeString = now.toLocaleTimeString(); 
    const dateString = now.toLocaleDateString();

    useEffect(() => {

 

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    try {
                        const weather = await fetchWeather(lat, lon);
                        if (weather) {
                            setWeather(weather);
                        }
                    } catch (error) {
                        setError('Error fetching weather data.');
                        console.error('Error fetching weather data:', error);
                    }
                },
                (error) => {
                    setError('Error getting location. Please check your settings.');
                    console.error('Error getting location:', error.message);
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
            console.error('Geolocation is not supported by this browser.');
        }
    }, []);

    return (
        <div className='AdminMainContainer' style={{ display: 'flex', width: '100%' , height: '100vh', backgroundColor: 'white' }}>
           <Sidebar />
     
          <div className='content' style={{  padding: '20px', width: '100%' }}>
                <h1>Admin Dashboard</h1>
             <Outlet>
                
             </Outlet>
                
            </div>
            <div className='other-info'>
              
               {
                weatherInfo && (
                    <div style={{display: 'flex', flexDirection: 'column' , alignItems: 'center'}}>
                        
                                 <div className='card-temp'>
                                         <span><TiWeatherSunny/></span>
                                         <span>{weatherInfo.main.temp}°C</span>
                                           
                                 </div>

                                 <div className='row'>
                                            <div className='row-card-full'>
                                                <span><IoLocation/></span>
                                                <span className='card-location'>{weatherInfo.name}</span>
                                            </div>
                                 </div>

                                 <div className='row'>
                                            <div className='row-card'>
                                                <span><WiHumidity/></span>
                                                <span className='card-location'>{weatherInfo.main.humidity}</span>
                                            </div>
                                            <div className='row-card'>
                                                <span><FaWind/></span>
                                                <span className='card-location'>{weatherInfo.wind.speed}km/h </span>
                                            </div>
                                 </div>

                                 <div className='card-time'>
                                       <span>{timeString}</span> 
                                       <span>{dateString}</span>
                                 </div>
                      
                        </div>
                )
               }
              

           
            </div>
     
          <div className='mobile'>
            <GoAlertFill className='icon'/>
            <span>Please switch to Desktop! Admin only for desktop view</span>
          </div>
        </div>
    );
}

export default AdminDashboard;
