import { useState } from "react";
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Button from "../Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });


     
      console.log("Login response:", response.data);

      if (response.data.message === "Login successful") {
        alert("Login successful");
        navigate("/"); 
      }
    } catch (err) {
      // Handle errors based on the server's response
      if (err.response) {
        // Display error message sent from the backend
        alert(err.response.data.message || "Login failed");
      } else {
        // Handle other errors, such as network issues
        console.error("Login error:", err);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient">
      <Particles
        id="particles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: { value: 90, density: { enable: true, value_area: 700 } },
            color: { value: "#ff0000" },
            shape: {
              type: "triangle",
              stroke: { width: 1 },
            },
            opacity: { value: 1, random: false, anim: { enable: false } },
            size: { value: 5, random: true, anim: { enable: false } },
            line_linked: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
            move: { enable: true, speed: 2 },
          },
          interactivity: {
            detect_on: "canvas",
            events: {
              onhover: { enable: true, mode: "repulse" },
              onclick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: { repulse: { distance: 200 }, push: { particles_nb: 4 } },
          },
          retina_detect: true,
        }}
        className="absolute inset-0"
      />

      <div className="card w-96 relative z-10 bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-semibold mb-4 text-gray-800">Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Sign In
          </button>
        </form>
        <Button
          to="/"
          className="mt-4 bg-indigo-500 text-white py-2 px-6 rounded-md hover:bg-indigo-700"
        >
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default LoginPage;
