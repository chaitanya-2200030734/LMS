import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";
import Navbar from "./Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { setUser } = useUserContext();

  // Simulating a "database" of users, including an admin
  const mockUsers = [
    {
      id: 1,
      email: "testuser@example.com",
      password: "password123",
      username: "Test User",
      role: "student", // This is a student account
    },
    {
      id: 2,
      email: "johndoe@example.com",
      password: "johnpassword",
      username: "John Doe",
      role: "student", // Another student account
    },
    {
      id: 3,
      email: "admin@example.com",
      password: "adminpassword",
      username: "Admin User",
      role: "admin", // This is the admin account
    },
  ];

  const login = (e) => {
    e.preventDefault();

    // Simulate login logic
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Simulate setting the token and storing user details in localStorage
      const fakeToken = "faketoken123";
      localStorage.setItem("token", fakeToken);
      localStorage.setItem("email", user.email);
      localStorage.setItem("name", user.username);
      localStorage.setItem("id", user.id);
      localStorage.setItem("role", user.role); // Store the user role

      console.log("Token:", fakeToken);

      // Set user in context
      setUser({
        name: user.username,
        email: user.email,
        id: user.id,
        role: user.role, // Store role in context
      });

      // Redirect based on role (admin vs student)
      if (user.role === "admin") {
        navigate("/admin-dashboard"); // Navigate to admin dashboard
      } else {
        navigate("/courses"); // Navigate to courses for students
      }
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="auth">
        <div className="container">
          <h3>Welcome!</h3>
          <br></br>
          <h2>Login</h2>
          <br />
          <form autoComplete="off" className="form-group" onSubmit={login}>
            <label htmlFor="email">Email Id :</label>
            <input
              type="email"
              className="form-control"
              style={{ width: "100%", marginRight: "50px" }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <br />
            <label htmlFor="password">Password : </label>
            <input
              type="password"
              className="form-control"
              style={{ width: "100%" }}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <br />
            <div className="btn1">
              <button type="submit" className="btn btn-success btn-md mybtn">
                LOGIN
              </button>
            </div>
          </form>
          {error && <span className="error-msg">{error}</span>}
          <br />
          <span>
            Don't have an account? Register
            <Link to="/register"> Here</Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
  