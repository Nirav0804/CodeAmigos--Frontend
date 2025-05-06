import React, { useEffect } from "react";
import HackathonCard from "./HackathonCard";

const HackathonList = ({
  setHackathons,
  filteredHackathons,
  setFilteredHackathons,
  type,
  joinable,
}) => {
  const username = localStorage.getItem("username");

  const fetchHackathons = async () => {
    // if (type === "active") {
    //   const response = await fetch("http://localhost:8080/api/hackathons");
    //   const data = await response.json();
    //   setHackathons(data);
    //   setFilteredHackathons(data);
    // }
    if (type === "past") {
      const response = await fetch(`http://localhost:8080/api/hackathons/past`);
      const data = await response.json();
      setHackathons(data);
      setFilteredHackathons(data);
    }
    if (type === "ongoing") {
      const response = await fetch(
        `http://localhost:8080/api/hackathons/ongoing`
      );
      const data = await response.json();
      setHackathons(data);
      setFilteredHackathons(data);
    }
    if (type === "upcoming") {
      const response = await fetch(
        `http://localhost:8080/api/hackathons/upcoming`
      );
      const data = await response.json();
      setHackathons(data);
      setFilteredHackathons(data);
    }
  };

  useEffect(() => {
    fetchHackathons();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-transparent">
      {Array.isArray(filteredHackathons) &&
        filteredHackathons.map((hackathon, index) => (
          <HackathonCard key={index} {...hackathon} joinable={joinable} type={type} />
        ))}
    </div>
  );
};

export default HackathonList;
