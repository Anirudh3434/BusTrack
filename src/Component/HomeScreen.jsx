import React, { useEffect, useState } from 'react';
import { MdOutlineSwapCalls } from 'react-icons/md';
import { IoExitOutline } from "react-icons/io5";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Header from './Header';
import Logout from './Logout';
import busService from '../../Appwrite/BusDatabase';
import { FaArrowRightLong } from "react-icons/fa6";
import { useSelector } from 'react-redux';

function HomeScreen() {
  const [username, setUser] = useState(null);
  const [Bus, setBus] = useState(null);
  const [zoom, setZoom] = useState(5);
  const [maps, setMap] = useState(false);
  const [BusNo, setBusNo] = useState('');
  const [From, setFrom] = useState('');
  const [To, setTo] = useState('');
  const [logout, setLogout] = useState(false);

  const name = useSelector((state) => state.auth.name);

  useEffect(() => {
    if (name) {
      setUser(name);
    }
  }, [name]);

  useEffect(() => {
    let intervalId;
    if (maps && BusNo) {
      intervalId = setInterval(async () => {
        try {
          const response = await busService.getAllBusesNo(BusNo);
          if (response.documents && response.documents.length > 0) {
            setBus(response.documents[0]);
          }
        } catch (error) {
          console.error(error);
        }
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [maps, BusNo]);

  useEffect(() => {
    let intervalId;
    if (maps && From && To) {
      intervalId = setInterval(async () => {
        try {
          const response = await busService.getAllBusesRoute(From, To);
          if (response.documents && response.documents.length > 0) {
            setBus(response.documents[0]);
          }
        } catch (error) {
          console.error(error);
        }
      }, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [maps, From, To]);

  const fetchBuses = (e) => {
    e.preventDefault();
    setMap(true);
  };

  return (
    <div className='Home'>
      <Header method={setLogout} />
      <div className='Home-content'>
        {username ? (
          <div className='name'>
            <p>Welcome <span>{username || 'User'}</span></p>
          </div>
        ) : (
          <p>Loading user information...</p>
        )}
        <h1>Check Bus Status</h1>
        <div className='Home-content-first'>
          <input
            type="text"
            placeholder='Enter Bus Number'
            value={BusNo}
            onChange={e => setBusNo(e.target.value.toUpperCase())}
          />
          <button onClick={fetchBuses}>Search</button>
        </div>
        <div className='Home-content-second'>
          <label htmlFor="arrival-destination">From</label>
          <input
            id="arrival-destination"
            type="text"
            placeholder='Enter arrival destination'
            value={From}
            onChange={e => setFrom(e.target.value.toUpperCase())}
          />
          <div className='swap'>
            <MdOutlineSwapCalls />
          </div>
          <label htmlFor="departure-destination">To</label>
          <input
            id="departure-destination"
            type="text"
            placeholder='Enter departure destination'
            value={To}
            onChange={e => setTo(e.target.value.toUpperCase())}
          />
          <button onClick={fetchBuses}>Search</button>
        </div>
      </div>

      {maps && Bus && (
        <div className='mapSection'>
          <button onClick={() => setMap(false)}><IoExitOutline /></button>
          <div className='map-info'>
            <h1>{Bus.busNo}</h1>
            <h3>Type: {Bus.model}</h3>
            <h3>{Bus.From} <FaArrowRightLong /> {Bus.To}</h3>
            <h3>Driver: {Bus.driver.driver_name}</h3>
          </div>

          {Bus.current_lat && Bus.current_long ? (
            <MapContainer center={[Bus.current_lat, Bus.current_long]} zoom={zoom} className='maps'>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[Bus.current_lat, Bus.current_long]}>
                <Popup>Your current location</Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p>The bus has not started yet or location data is unavailable.</p>
          )}
        </div>
      )}

      {logout && <Logout method={setLogout} />}
    </div>
  );
}

export default HomeScreen;
