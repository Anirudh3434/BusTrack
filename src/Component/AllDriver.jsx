import React, { useEffect, useState } from 'react';
import service from '../../Appwrite/Database';

function AllDriver() {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        
        const fetchDrivers = async () => {
            try {
                const response = await service.getAllDrivers();
                if (response) {
                    setDrivers(response.documents);
                }
            } catch (error) {
                console.error('Error fetching drivers:', error);
                setError('Error fetching drivers'); // Update error state
            } finally {
                setLoading(false); // Set loading to false after fetch is complete
            }
        };

        fetchDrivers(); // Call the async function
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Display loading state
    }

    if (error) {
        return <div>{error}</div>; // Display error message
    }

    return (
        <div style={{ width: '80%', height: '80%', display: 'flex', flexDirection: 'column', alignItems: 'center', overflowY: 'scroll', overflowX: 'hidden' }}>
            {
                drivers.length > 0 ? (
                    drivers.map((driver, index) => (
                        <div key={index} className='driverlist'>
                            <h2>{driver.driver_name}</h2>
                        </div>
                    ))
                ) : (
                    <p>No drivers found</p> 
                )
            }
        </div>
    );
}

export default AllDriver;
