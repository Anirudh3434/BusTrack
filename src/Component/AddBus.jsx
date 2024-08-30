import React, { useEffect, useState } from 'react';
import busService from '../../Appwrite/BusDatabase';
import service from '../../Appwrite/Database';

function AddBus() {
  const [busNo, setBusNo] = useState('');
  const [busType, setBusType] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [driverEmail, setDriverEmail] = useState('');
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState('');
  const [departureDate, setDepartureDate]= useState('');
  const [departureTime, setDepartureTime] = useState('');

  const lat = '';
  const lng = '';

  const trimDateTime = (dateTime) => {
    const [date, time] = dateTime.split('T');
    return { date, time };
  };

  const handleTest = (e) => {
    e.preventDefault();

    const data = {
      busNo: busNo.toUpperCase(),
      model: busType.toUpperCase(),
      current_latitude: lat,
      current_longitude: lng,
      from: origin.toUpperCase(),
      to: destination.toUpperCase(),
      driver: selectedDriver,
      departureDate: departureDate,
      departureTime: departureTime
    };

    console.log(data);
  };

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await service.getAllDrivers();
        setDrivers(response.documents);
      } catch (error) {
        console.error('Failed to fetch drivers:', error);
      }
    };

    fetchDrivers();
  }, []);

  console.log(drivers);

  const handleCreate = async () => {
    setLoading(true);
    try {
      const data = {
        busNo: busNo.toUpperCase(),
        model: busType.toUpperCase(),
        current_latitude: lat,
        current_longitude: lng,
        from: origin.toUpperCase(),
        to: destination.toUpperCase(),
        driver: selectedDriver,
        time: departureTime,
        date: departureDate
      };

      const response = await busService.createBus(data);
      if (response) {
        alert('Bus Added Successfully');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert('Failed to add bus');
      console.error(error);
    }
  };

  return (
    <div className='AddDriver'>
      <h2>Add Bus</h2>
      <div className='driverContainer'>
        <div className='driverInfo'>
          <label htmlFor="busNo">Bus No.:</label>
          <input
            id="busNo"
            type='text'
            placeholder='Enter Bus No.'
            value={busNo}
            onChange={(e) => setBusNo(e.target.value.toUpperCase())}
          />
          <label htmlFor="busType">Type:</label>
          <input
            id="busType"
            type='text'
            placeholder='Enter Bus Type'
            value={busType}
            onChange={(e) => setBusType(e.target.value.toUpperCase())}
          />
        </div>
        <div className='driverInfo'>
          <label htmlFor="origin">Origin:</label>
          <input
            id="origin"
            type='text'
            placeholder='From'
            value={origin}
            onChange={(e) => setOrigin(e.target.value.toUpperCase())}
          />
          <label htmlFor="destination">Destination:</label>
          <input
            id="destination"
            type='text'
            placeholder='To'
            value={destination}
            onChange={(e) => setDestination(e.target.value.toUpperCase())}
          />
        </div>

        <div className='driverInfo'>
          <label htmlFor="departureTime">Departure Date:</label>
          <input
            id="departureTime"
            type='date'
            placeholder='Departure Time'
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
          />
          <label htmlFor="arrivalTime">Arrival Time:</label>
          <input
            id="arrivalTime"
            type='time'
            placeholder='Arrival Time'
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
          />
        </div>

        <div className='driverInfo'>
          <label htmlFor="driver">Driver:</label>
          <select
            id="driver"
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
          >
            <option value="">Select Driver</option>
            {drivers.map((driver) => (
              <option key={driver.id} value={driver.$id}>
                {driver.driver_name}
              </option>
            ))}
          </select>
          <span>Selected ID: {selectedDriver}</span>
        </div>

        <button onClick={handleCreate} disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </div>
    </div>
  );
}

export default AddBus;
