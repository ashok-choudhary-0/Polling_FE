import React, { useState } from 'react';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
  });
  const [showError, setShowError] = useState({
    firstName: false,
    lastName: false,
    username: false,
    password: false,
    confirmPassword: false,
    email: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 0) {
      setShowError((prev) => ({ ...prev, [e.target.name]: false }));
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (formData[key].trim().length === 0) {
        setShowError((prev) => ({ ...prev, [key]: true }));
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full border-2 border-gray-400">
        <h2 className="text-3xl font-bold text-center mb-4">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            {showError?.firstName && (
              <p className="text-sm text-red-500">first-name can't be empty</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            {showError?.lastName && (
              <p className="text-sm text-red-500">last-name can't be empty</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            {showError?.username && (
              <p className="text-sm text-red-500">username can't be empty</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            {showError?.password && (
              <p className="text-sm text-red-500">password can't be empty</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            {showError?.confirmPassword && (
              <p className="text-sm text-red-500">
                confirm-password can't be empty
              </p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            {showError?.email && (
              <p className="text-sm text-red-500">email can't be empty</p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
