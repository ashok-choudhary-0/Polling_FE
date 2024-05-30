import React, { useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { useSelector } from 'react-redux';
import PollCard from '../Components/PollCard';

const AllPolls = () => {
  const allPolls = useSelector((state) => state?.pollReducer?.allpolls);
  return (
    <>
      <Navbar />
      <div className="flex flex-col bg-gray-100 justify-center items-center gap-1 py-4 mx-8">
        {allPolls?.data?.map((singlePoll) => {
          const allOptions = singlePoll?.options?.map(
            (singleOption) => singleOption?.optionTitle
          );
          return (
            <PollCard
              key={singlePoll?.id}
              question={singlePoll?.pollTitle}
              options={allOptions}
            />
          );
        })}
      </div>
    </>
  );
};

export default AllPolls;
