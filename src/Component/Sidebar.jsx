import React from 'react';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaBus, FaUser, FaCalendar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { LuLayoutDashboard } from "react-icons/lu";



function Sidebar() {
    return (
        <div className='sidebar'>
            <h2>BusTrack</h2>
            <nav>
                <ul className='nav-list'>
                <li className='nav-item'>
                        <Link to='dashboard' className='link' >
                            <LuLayoutDashboard size={24} />
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className='nav-item'>
                        <Link to='driver' className='link'>
                            <IoIosAddCircleOutline size={24} />
                            <span>Add Driver</span>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='Bus' className='link'>
                            <FaBus size={24} />
                            <span>Add Bus Schedule</span>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='allDrivers' className='link'>
                            <FaUser size={24} />
                            <span>View All Drivers</span>
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link to='Buses' className='link'>
                            <FaCalendar size={24} />
                            <span>View All Buses</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Sidebar;
