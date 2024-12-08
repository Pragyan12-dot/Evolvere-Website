import React, { useState } from 'react';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  const handleInput = (e) => {
    const { name, value } = e.target;

    // Update state directly
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Check if email and password are provided
    if (!user.email || !user.password) {
      alert("Please enter both email and password.");
      return;
    }

    console.log('Login Attempt:', user);  // Check what is being sent

    try {
      const response = await fetch('http://localhost:5000/router/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",  // Ensure content-type is application/json
        },
        body: JSON.stringify(user),  // Make sure data is properly stringified
      });

      // Check if the response was successful
      if (response.ok) {
        alert("Login Successful");
        setUser({ email: "", password: "" });  // Reset form fields
      } else {
        const errorText = await response.text();  // Get error message from server
        alert(`Login failed: ${errorText}`);
        console.log("Error:", errorText);  // Log the error message for debugging
      }
    } catch (error) {
      console.error("Login request failed", error);  // Log any fetch-related errors
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email" // Use type 'email' for email input
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            autoComplete="off"
            value={user.email}
            onChange={handleInput}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-container">
            <input
              type={showPassword ? 'text' : 'password'} // Toggle between text and password input type
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={user.password}
              onChange={handleInput}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="eye-icon" // Optional: Use this class for styling the icon
            >
              {showPassword ? '🙈' : '👁️'} {/* Eye icon to toggle visibility */}
            </button>
          </div>
        </div>

        <button type="submit" id="loginBtn">Login</button>
      </form>
    </div>
  );
};

export default Login;
