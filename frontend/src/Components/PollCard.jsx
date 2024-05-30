import React from 'react';

const PollCard = ({ question, options }) => {
  return (
    <div className="w-11/12 bg-white shadow-md rounded-md p-4">
      <div className="max-w-md">
        <div className="font-semibold text-lg mb-4">{question}</div>
        <div className="grid grid-cols-1 gap-2">
          {options.map((option, index) => (
            <div key={index} className="flex items-center">
              <input
                type="radio"
                id={`option${index}`}
                name="pollOption"
                className="mr-2"
              />
              <label htmlFor={`option${index}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PollCard;
