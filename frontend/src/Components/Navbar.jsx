import React from 'react';
import { useDispatch } from 'react-redux';
import { handleAllPolls } from '../Redux/slices/pollSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const fetchAllPolls = (e) => {
    e.preventDefault();
    dispatch(handleAllPolls({ limit: 10, page: 1 }));
  };
  return (
    <nav className="flex justify-between items-center bg-white px-8 py-2">
      <div className="text-black font-bold text-lg">Polling</div>
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
          onClick={fetchAllPolls}
        >
          All Polls
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
