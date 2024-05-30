import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkFieldLength, validatePassword } from '../Config/Validation';
import { handleLogin } from '../Redux/slices/authSlice';
import { useNavigate } from 'react-router';

const Login = () => {
  const [userLoginData, setUserLoginData] = useState({
    username: '',
    password: '',
  });
  const [showError, setShowError] = useState({
    username: false,
    password: false,
  });
  const [showLoader, setShowLoader] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.length > 0) {
      setShowError((prev) => ({ ...prev, [e.target.name]: false }));
    }

    setUserLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLoginUser = async (e) => {
    e.preventDefault();

    for (let key in userLoginData) {
      if (key === 'username' && checkFieldLength(userLoginData[key]) < 4) {
        return setShowError((prev) => ({ ...prev, [key]: true }));
      }
      if (key === 'password' && !validatePassword(userLoginData[key])) {
        return setShowError((prev) => ({ ...prev, [key]: true }));
      }
    }

    setShowLoader(true);

    const res = await dispatch(handleLogin({ ...userLoginData }));

    setShowLoader(false);
    setShowError({
      password: false,
      username: false,
    });

    if (res?.payload?.message === 'Login Successfully') {
      alert(res?.payload?.message);
      navigate('/all-polls');
      setUserLoginData({
        password: '',
        username: '',
      });
    } else {
      alert(res?.payload?.data?.message);
      return;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full border-2 border-gray-400">
        <h2 className="text-3xl font-bold text-center mb-4">Welcome Again</h2>
        <form onSubmit={handleLoginUser}>
          <div className="mb-4">
            <input
              type="text"
              name="username"
              value={userLoginData.username}
              onChange={handleChange}
              placeholder="Username"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            {showError?.username && (
              <p className="text-sm text-red-500">Invalid username</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={userLoginData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500"
            />
            {showError?.password && (
              <p className="text-sm text-red-500">Invalid Password</p>
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
              'Login'
            )}
          </button>
          <p className="text-sm text-red-500 mt-2">
            Don't have an account?{' '}
            <a href="/signup" className="underline">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
