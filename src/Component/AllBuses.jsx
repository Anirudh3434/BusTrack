import React, { useEffect } from 'react'
import busService from '../../Appwrite/BusDatabase'
import { FaArrowRightLong } from "react-icons/fa6";

function AllBuses() {
    const [buses, setBuses] = React.useState([])

    useEffect(()=>{
        busService.getAllBuses().then((response) => {
            setBuses(response.documents)
        })

    })

    const DeleteBus = (id) => {
      
        try {
            const reponse = busService.deleteBus(id)
            if(reponse){
                alert("Bus deleted successfully")
            }
        } catch (error) {
            console.log(error)
            
        }

    }

    console.log(buses)

    return (
        <div>
            <h1>All Buses</h1>

            <div className='BusGrid'>
            {
                    buses && buses.map((element, index) => (
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
                              
                            </div>
                            <button
                            onClick={()=>DeleteBus(element.$id)}
                             className='bookButton'>Delete</button>

                          
                          

                          
                            </div>
                        
                    ))
                }

            </div>

        </div>
    )
}

export default AllBuses
