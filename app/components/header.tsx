"use client";
import React, { useState } from "react"
import Link from 'next/link';

export default function header() {

  //useState
  const [activeLink, setActiveLink] = useState<number | null>(null);

  const handleLinkClick = (index: number) => {
    setActiveLink(index);
  };

  return (
    <div className="h-screen text-white">
      <div className="flex justify-center items-center">
        <nav className="bg-maroon p-5 m-3 space-x-4 rounded-full text-xl font-bold">
          <Link href="/about"
            className={`p-3 rounded-full ${activeLink === 0 ? 'bg-orange' : ''}`}
            onClick={() => handleLinkClick(0)}>
            About
          </Link>

          <Link href="/work"
            className={`p-3 rounded-full ${activeLink === 1 ? 'bg-orange' : ''}`}
            onClick={() => handleLinkClick(1)}>
            Work
          </Link>
          <Link href="/projects"
            className={`p-3 rounded-full ${activeLink === 2 ? 'bg-orange' : ''}`}
            onClick={() => handleLinkClick(2)}>
            Projects
          </Link>
      </nav>
    </div>
    </div >
  )
}