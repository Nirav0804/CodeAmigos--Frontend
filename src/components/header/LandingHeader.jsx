import React, { StrictMode } from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSun, FaMoon } from "react-icons/fa";
import { Link } from "react-router-dom";

const LandingHeader = () => {
  // const [theme, setTheme] = useState("dark");
  // const [isVisible, setIsVisible] = useState(false);

  // useEffect(() => {
  //   setIsVisible(true);
  //   const savedTheme = localStorage.getItem("theme");
  //   if (savedTheme) {
  //     setTheme(savedTheme);
  //     document.documentElement.classList.add(savedTheme);
  //   } else {
  //     document.documentElement.classList.add("dark");
  //   }
  // }, []);

  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);
  //   localStorage.setItem("theme", newTheme);
  //   document.documentElement.classList.remove("dark", "light");
  //   document.documentElement.classList.add(newTheme);
  // };


  const handleGithubLogin = () => {
    window.location.href = "http://localhost:8080/oauth2/authorization/github";
  };


  return (
    <>
      <header id="about" className="relative min-h-screen overflow-hidden">
        <div className="relative z-10 container mx-auto px-4 pt-8">
          <motion.div
            className="flex justify-between items-center mb-16"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-4xl font-bold text-white"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-10xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                CodeAmigos
              </div>
            </motion.div>
            <div className="flex space-x-4">
              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gray-800 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <FaMoon className="text-yellow-400" />
                ) : (
                  <FaSun className="text-yellow-400" />
                )}
              </motion.button> */}
              <button onClick={() => handleGithubLogin()}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-800 text-white font-semibold py-2.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all"
                >
                  GitHub Login
                </motion.button>
              </button>
            </div>
          </motion.div>

          <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
              {/* Logo */}
  <motion.img
    src="src/logoN.png"  // Replace with the actual path to your logo
    alt="logot"
    className="mb-15 w-80 h-75"  // Adjust the width and height as needed
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 0.2 }}
  />
            <motion.h1
              className="text-7xl font-extrabold mb-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-10xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Connect, Collaborate, Conquer
              </span>{" "}
              
            </motion.h1>
            <motion.p
              className="text-xl mb-12 max-w-3xl text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Showcase your GitHub, LeetCode, and CodeChef profiles, build your dream team with matching tech stacks, and chat securely. Upgrade to premium for personalized hackathon recommendations by skill and city with CodeAmigos.</motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
            </motion.div>
          </div>
        </div>
      </header>
    </>
  );
};

export default LandingHeader;
