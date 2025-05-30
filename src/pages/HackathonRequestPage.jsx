import React, { useState, useEffect, use } from "react";
import GradientBackground from "../components/background/GradientBackground";
import Navigation from "../components/navigation/Navigation";
import HackathonRequestCard from "../components/hackathonRequest/HackathonRequestCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Chatbot from "../components/chatbot/Chatbot";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

const HackathonRequestPage = () => {
  const navigate = useNavigate();
  const [hackathonRequests, setHackathonRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const { username } = useAuth();
  useEffect(() => {
    // const username = localStorage.getItem("username");

    // if (!username) {
    //   navigate("/login");
    // } else {
    fetchHackathonRequests(username);
    // }
  }, [navigate]);

  const fetchHackathonRequests = async (username) => {
    try {
      const response = await axios.get(
        `${API_BASE}/requests/${username}`, {
        withCredentials: true, // <-- This sends cookies!
      }
      );
      setHackathonRequests(response.data.reverse());
    } catch (error) {
      console.error("Error fetching hackathon requests:", error);
    }
  };

  // Filter requests based on active tab
  const filteredRequests = hackathonRequests.filter(
    (request) => request.status.toLowerCase() === activeTab
  );

  return (
    <GradientBackground className="min-h-screen">
      <Navigation />
      <div className="flex min-h-screen p-4 pt-24 mx-auto max-w-7xl pb-0 overflow-y-auto">
        {/* Sidebar Navigation */}
        <nav className="w-1/4 bg-gray-900/80 backdrop-blur-lg text-white shadow-lg p-4 flex flex-col space-y-4 rounded-lg mr-8">
          <h1 className="text-2xl font-semibold mx-auto mb-10">
            Requests Received
          </h1>
          {["pending", "accepted", "rejected"].map((tab) => (
            <button
              key={tab}
              className={`p-3 rounded-lg text-lg font-semibold ${activeTab === tab ? "bg-gray-700" : "hover:bg-gray-800"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Requests
            </button>
          ))}
        </nav>

        {/* Content Area */}
        <main className="flex-1 bg-transparent">
          <div className="container mx-auto p-4">
            {filteredRequests.length === 0 ? (
              <div className="text-center text-xl font-semibold mt-4">
                No {activeTab} requests found
              </div>
            ) : (
              filteredRequests.map((request) => (
                <div className="mb-4">
                  <HackathonRequestCard key={request.id} {...request} />
                </div>
              ))
            )}
          </div>
        </main>
      </div>
      <Chatbot/>
    </GradientBackground>
  );
};

export default HackathonRequestPage;
