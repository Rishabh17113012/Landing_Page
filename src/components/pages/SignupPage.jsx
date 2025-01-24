import Button from "../Button";
import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, { name, email, password });
      console.log(response.data);

      if (response.data.message === "User registered successfully") {
        alert("Account created successfully!");
        navigate("/"); 
      } else {
        alert(response.data.message || "Registration failed");
      }
    } catch (err) {
      // Handle errors from the backend
      if (err.response) {
        alert(err.response.data.message || "An error occurred during registration.");
      } else {
        console.error("Signup error:", err);
        alert("An error occurred. Please try again.");
      }
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-n-8 bg-gradient">
      <Particles
        id="particles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            number: { value: 90, density: { enable: true, value_area: 700 } },
            color: { value: "#ff0000" },
            shape: { type: "triangle", stroke: { width: 1 } },
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

      <div className="bg-white p-6 rounded-lg shadow-lg w-96 card relative z-10">
        <h1 className="text-xl flex items-center justify-center font-semibold min-h-2 m-14 mb-3 text-wrap text-black">
          Create Account
        </h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name" className="block text-sm font-medium text-black">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email" className="block text-sm font-medium mt-4 text-black">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password" className="block text-sm font-medium mt-4 text-black">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
          >
            Sign Up
          </button>
        </form>
        <Button to="/" className="mt-4 bg-violet-900 text-white py-2 px-6 rounded-md hover:bg-indigo-700">
          Back to Home
        </Button>
      </div>
    </div>
  );
};

export default SignupPage;
