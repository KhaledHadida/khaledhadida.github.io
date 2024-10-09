//Converts the component into client side rendered (since we are using useEffect)
"use client";
import { useEffect, useState } from "react";

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
}

export default function Stars() {
    const [stars, setStars] = useState<Star[]>([]);


    //Generate stars
    const generateStars = () => {

        //Width & Length
        const screenWidth = document.documentElement.scrollWidth;
        const screenHeight = document.documentElement.scrollHeight;
        //This is for height 
        const numStars = 500;
        const starSize = 5;

        //empty 
        const newStars: Star[] = [];

        for (let i = 0; i < numStars; i++) {
            //the 5 here is the size of the star (can put it as a var)
            const x = Math.random() * screenWidth - starSize;
            const y = Math.random() * screenHeight - starSize;
            const randomDuration = Math.random() * (10 - 5) + 5;
            const randomSize = Math.random() * (5 - 1) + 1;
            newStars.push({ id: i, x, y, size: randomSize, duration: randomDuration });

        }
        //Update useState at bottom
        setStars(newStars);
    }

    useEffect(() => {
        generateStars()
    }, []);



    return (
        <div className="fixed max-h-screen">
            {stars.map((star) => (
                <div className="stars"
                    key={star.id}
                    style={{
                        position: 'absolute',
                        left: `${star.x}px`,
                        top: `${star.y}px`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        animation: `twinkle ${star.duration}s infinite`
                    }}
                />
            ))}
        </div>
    )
}