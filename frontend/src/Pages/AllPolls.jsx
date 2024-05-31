import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { useSelector } from 'react-redux';
import PollCard from '../Components/PollCard';

const AllPolls = () => {
  const allPolls = useSelector((state) => state?.pollReducer?.allpolls);
  const handleSubmitPoll = (pollId) => {
    console.log('poll submited', pollId);
  };

  const handlePollOpitonOnChange = (optionId) => {
    console.log(optionId, '================ optionid');
  };
  return (
    <>
      <Navbar />

      {allPolls?.data?.map((singlePoll) => {
        return (
          <div
            key={singlePoll?.id}
            className="flex flex-col bg-gray-100 justify-center items-center gap-1 py-4 mx-8"
          >
            <PollCard
              polldata={singlePoll}
              handleSubmitPoll={handleSubmitPoll}
              handlePollOpitonOnChange={handlePollOpitonOnChange}
            />
          </div>
        );
      })}
    </>
  );
};

export default AllPolls;
