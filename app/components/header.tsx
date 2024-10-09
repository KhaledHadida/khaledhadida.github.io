"use client";
import React, { useState } from "react";

export default function Header() {

  const [selectedSection, setSelectedSection] = useState<string>("about");

  // Function to handle section selection
  const handleSelect = (section: string) => {
    setSelectedSection(section);
    //Makes it so we scroll to the intended section
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  //This is to move the "selection"
  const getPosition = () => {
    switch (selectedSection) {
      case "about":
        return "left-0";
      case "work":
        return "left-1/3"; // Moves to the second section
      case "projects":
        return "left-2/3"; // Moves to the third section
      default:
        return "left-0";
    }
  };

  return (
    <div className={`fixed w-full z-50 flex justify-center items-center mt-5 select-none`}>
      <nav className="relative bg-maroon rounded-full text-xl font-bold border-4 border-yellow-800">
        {/* About radio button */}
        <div
          className={`absolute top-0 h-full w-1/3 bg-orange transition-all duration-500 ease-in-out rounded-full ${getPosition()}`}
        ></div>
        <div className="flex items-center space-x-5 justify-between">
          <label
            className={`p-5 relative rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:text-neutral-300`}
          >
            <input
              type="radio"
              name="section"
              value="about"
              checked={selectedSection === "about"}
              onChange={() => handleSelect("about")}
              className="hidden"
            />
            About
          </label>

          {/* Work radio button */}
          <label
            className={`p-5 relative rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:text-neutral-300`}
          >
            <input
              type="radio"
              name="section"
              value="work"
              checked={selectedSection === "work"}
              onChange={() => handleSelect("work")}
              className="hidden"
            />
            Work
          </label>

          {/* Projects radio button */}
          <label
            className={`px-2.5 relative rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:text-neutral-300`}
          >
            <input
              type="radio"
              name="section"
              value="projects"
              checked={selectedSection === "projects"}
              onChange={() => handleSelect("projects")}
              className="hidden"
            />
            Projects
          </label>
        </div>
      </nav>
    </div>
  )
}


