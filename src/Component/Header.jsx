import React from 'react';
import { IoIosLogIn } from "react-icons/io";

function Header({ method }) {
  return (
    <div className='Home-nav'>
      <h1>BusTrack</h1>
      <div className='profile'>
        <button 
          style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
          onClick={() => method(true)}
        >
          <div className='profileicon'>
            <IoIosLogIn />
          </div>
        </button>
      </div>
    </div>
  );
}

export default Header;
