import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../Store/Slice';
import { LogOut } from '../../Firebase/Auth';
import { useNavigate } from 'react-router-dom';

function Logout({ method }) {
  const name = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await LogOut();
     
        dispatch(logOut());
        navigate('/LogIn');
     
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <div className='LogoutContainer'>
      <div className='Home-profile'>
        <span>Hi {name}</span>
        <span>Do you want to Log Out?</span>
        <div className='logout'>
          <button
            className='stay'
            onClick={() => method(false)}
          >
            Stay here
          </button>
          <button onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Logout;
