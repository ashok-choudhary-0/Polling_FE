import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  checkFieldLength,
  validateEmail,
  validatePassword,
} from '../Config/Validation';
import { handleSignup } from '../Redux/slices/authSlice';
import { useNavigate } from 'react-router';

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
    email: false,
  });
  const [confirmPasswordMatch, setConfirmPasswordMatch] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector((state) => state?.authReducer);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 0) {
      setShowError((prev) => ({ ...prev, [e.target.name]: false }));
      setConfirmPasswordMatch(false);
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRegisterUser = async (e) => {
    e.preventDefault();

    for (let key in formData) {
      if (key === 'firstName' || key === 'lastName' || key === 'username') {
        if (checkFieldLength(formData[key]) < 4) {
          return setShowError((prev) => ({ ...prev, [key]: true }));
        }
      } else if (key === 'password') {
        if (!validatePassword(formData[key])) {
          return setShowError((prev) => ({ ...prev, [key]: true }));
        }
      } else if (key === 'email') {
        if (!validateEmail(formData[key])) {
          return setShowError((prev) => ({ ...prev, [key]: true }));
        }
      }
    }

    if (
      formData?.password !== formData?.confirmPassword ||
      checkFieldLength(formData?.confirmPassword) === 0
    ) {
      return setConfirmPasswordMatch(true);
    }

    setShowLoader(true);

    const res = await dispatch(handleSignup({ ...formData }));

    setShowLoader(false);
    setShowError({
      firstName: false,
      lastName: false,
      username: false,
      password: false,
      email: false,
    });
    setConfirmPasswordMatch(false);

    if (res?.payload?.message === 'User created successfully') {
      alert(res?.payload?.message);
      navigate('/all-polls');
      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
      });
    } else {
      alert(res?.payload?.data?.message);
      return;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full border-2 border-gray-400">
        <h2 className="text-3xl font-bold text-center mb-4">Sign-Up</h2>
        <form onSubmit={handleRegisterUser}>
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
              <p className="text-sm text-red-500">
                first-name should be atleast 4 charcters
              </p>
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
              <p className="text-sm text-red-500">
                last-name should be atleast 4 charcters
              </p>
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
              <p className="text-sm text-red-500">
                username should be atleast 4 charcters
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
              <p className="text-sm text-red-500">please enter a valid email</p>
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
              <p className="text-sm text-red-500">
                password should contains uppercase, lowercase and special
                characters
              </p>
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
            {confirmPasswordMatch && (
              <p className="text-sm text-red-500">
                password & confirm-password should be same
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            {showLoader ? (
              <div className="flex items-center justify-center">
                <div className="relative w-5 h-5">
                  <div className="w-full h-full rounded-full absolute "></div>
                  <div className="w-full h-full rounded-full animate-spin absolute border-4 border-solid border-white border-t-transparent"></div>
                </div>
              </div>
            ) : (
              'Sign Up'
            )}
          </button>
          <p className="text-sm text-red-500 mt-2">
            Already have an account?{' '}
            <a href="/login" className="underline">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
