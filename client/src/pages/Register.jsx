import React, { useState, startTransition } from 'react';
import {useNavigate} from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    acceptTerms: false, // to track checkbox state
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate=useNavigate();
  const handleInput = (e) => {
    console.log(e);
    const { name, value } = e.target;

    // Wrap state update inside startTransition to make it low priority
    startTransition(() => {
      setUser((prevUser) => ({
        ...prevUser,
        [name]: value,
      }));
    });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;

    // Wrap checkbox state update inside startTransition
    startTransition(() => {
      setUser((prevUser) => ({
        ...prevUser,
        acceptTerms: checked,
      }));
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevent form from refreshing the page
    console.log('Form Submitted:', user);
    try{
        const response=await fetch('http://localhost:5000/router/register',{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify(user)
        });
        if(response.ok)
        {
            setUser({username:"",password:""});
            navigate("/login");
        }
        console.log(response);
    }
    catch(error)
    {
        console.log("register",error);
    };
    // Here you can handle form submission, like sending data to a server
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Email address</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            required
            autoComplete="off"
            value={user.username}
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              id="exampleInputPassword1"
              name="password"
              placeholder="Password"
              required
              value={user.password}
              onChange={handleInput}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="eye-icon" // Optional: Use this class for custom styles
            >
              {showPassword ? '🙈' : '👁️'} {/* Eye icon or monkey for hide/show */}
            </button>
          </div>
        </div>

        <div className="form-check">
          <input
            type="checkbox"
            id="exampleCheck1"
            name="acceptTerms"
            checked={user.acceptTerms}
            onChange={handleCheckboxChange}
          />
          <label id="checkbox" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>

        <button type="submit" id="submitbtn">Submit</button>
      </form>
    </div>
  );
};

export default Register;
