import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from '@firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import bgimg from '../images/page-banner1.jpg';

const Register = () => {
  const { signInUsingGoogle } = useAuth();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const auth = getAuth();

  // handleRegister
  const handleRegister = (e) => {
    e.preventDefault();
    // password validation
    if (userPassword.length < 6) {
      setError('Password must be at least 6 character');
      return;
    }
    // creating user
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setError('');
        setDisplayName();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  // setDisplayName
  const setDisplayName = () => {
    updateProfile(auth.currentUser, { displayName: userName }).then(() => {});
  };

  // handleNameChange
  const handleNameChange = (e) => {
    setUserName(e.target.value);
  };
  // handleEmailChange
  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
  };

  // handlePasswordChange
  const handlePasswordChange = (e) => {
    setUserPassword(e.target.value);
  };
  return (
    <div>
      <div
        style={{
          background: `linear-gradient(0deg
        , #11182773, #111827), url(${bgimg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="h-full py-10"
      >
        <h2 className="text-center text-3xl text-white font-semibold">
          Register
        </h2>
      </div>
      {/* Form section */}
      <div className="container py-5 md:w-3/6">
        <form onSubmit={handleRegister} className="space-y-3">
          {/* Name */}
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            onBlur={handleNameChange}
            name="name"
            required
            className="mt-1 p-2 border block w-full shadow sm:text-sm border-gray-200 outline-none focus:border-blue-500  ring-gray-400 rounded-md"
          />
          {/* Email */}
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onBlur={handleEmailChange}
            required
            className="mt-1 p-2 border block w-full shadow sm:text-sm border-gray-200 outline-none focus:border-blue-500  ring-gray-400 rounded-md"
          />
          {/* Password */}
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onBlur={handlePasswordChange}
            required
            className="mt-1 p-2 border block w-full shadow sm:text-sm border-gray-200 outline-none focus:border-blue-500  ring-gray-400 rounded-md"
          />
          {/* Error */}
          <p className="text-red-700 font-semibold">{error}</p>
          {/* Button */}
          <button className="bg-blue-800 hover:bg-blue-900 transition delay-75 text-gray-100 py-2 px-2.5 w-full my-1.5 rounded-md shadow-md">
            Register
          </button>
        </form>
        {/* Other sign in */}
        <div className="my-4">
          <h3 className="text-center m-0">
            <span>-----</span> Or sign in with <span>-----</span>
          </h3>
          <div className="bg-white max-w-lg py-2.5 mx-auto rounded-md shadow-md">
            <div className="flex items-center justify-center space-x-3">
              <button
                onClick={signInUsingGoogle}
                className="cursor-pointer rounded-full shadow-xl bg-gray-200 p-1"
              >
                <img src="/img/google.png" alt="google" />
              </button>
              <div className="cursor-pointer rounded-full shadow-xl bg-gray-200 p-1">
                <img src="/img/github.png" alt="github" />
              </div>
              <div className="cursor-pointer rounded-full shadow-xl bg-gray-200 p-1">
                <img src="/img/facebook.png" alt="facebook" />
              </div>
            </div>
          </div>
          <h4 className="text-center my-2">
            Already have an account?
            <Link to="/login" className="text-blue-600 mx-2">
              sign In here
            </Link>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Register;
