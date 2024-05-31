import React from 'react';

const PollCard = ({ polldata, handleSubmitPoll, handlePollOpitonOnChange }) => {
  return (
    <div className="w-11/12 bg-white shadow-md rounded-md p-4">
      <div>
        <div className="font-semibold text-lg mb-4">{polldata?.pollTitle}</div>
        <div className="grid grid-cols-1 gap-2">
          {polldata?.options.map((option) => (
            <div key={option?.id} className="flex items-center">
              <input
                type="radio"
                id={`${option?.id}`}
                name={`${polldata?.id}`}
                className="mr-2"
                onChange={() => {
                  handlePollOpitonOnChange(option?.id);
                }}
              />
              <label htmlFor={`${option?.id}`}>{option?.optionTitle}</label>
            </div>
          ))}
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded mt-2 float-right"
          onClick={(e) => {
            e.preventDefault();
            handleSubmitPoll(polldata?.id);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PollCard;
