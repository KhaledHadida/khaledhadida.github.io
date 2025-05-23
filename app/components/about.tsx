'use client'
import React, { useEffect, useState } from "react";


export default function About() {

    const [phase, setPhase] = useState<string>("0%");
    const [radius, setRadius] = useState<string>("50%");
    //False = Waxing Crescent & Waning Crescent, True = Waning Gibbous & Waxing Gibbous
    const [direction, setDirection] = useState<Boolean>(true);

    //Moon CSS

    useEffect(() => {
        const calculateCurrentMoonPhase = () => {
            //Get current date & a date since new moon appeared
            const currentDate: any = new Date();
            const randomlySelectedNewMoon: any = new Date('July 21, 2020 00:00:00');

            //The days for the lunar cycle
            const lunarCycle = 29.5;

            //Difference 
            const diffInMilliSeconds = currentDate - randomlySelectedNewMoon;

            //Converting to Days (Millisecond -> Mins -> Hours -> Days)
            // const minutes = Math.floor(diffInMilliSeconds / 60000);
            // const hours = Math.round(minutes / 60);
            // const days = Math.round(hours / 24);

            // convert milliseconds to days (This is more accurate since we are not losing trailing decimals over calculations)
            const diffDays = diffInMilliSeconds / (1000 * 60 * 60 * 24);

            //Determine the phase of the moon in current cycle
            const daysIntoCycle = diffDays % lunarCycle;

            if (daysIntoCycle < 1) {
                setPhase('0');
                setDirection(false);
                return 'New Moon';

            } else if (daysIntoCycle < 7.4) {
                setPhase('-25%');
                setDirection(false);
                return 'Waxing Crescent';

            } else if (daysIntoCycle < 9.9) {
                setPhase('-50%');
                setDirection(false);
                setRadius('0%');
                return 'First Quarter';

            } else if (daysIntoCycle < 15) {
                setPhase('25%');
                setDirection(true);
                return 'Waxing Gibbous';

            } else if (daysIntoCycle < 15.9) {
                setPhase('0%');
                setDirection(true);
                return 'Full Moon';

            } else if (daysIntoCycle < 22.1) {
                setPhase('-25%');
                setDirection(true);
                return 'Waning Gibbous';

            } else if (daysIntoCycle < 24.6) {
                setPhase('50%');
                setDirection(true);
                setRadius('0%');
                return 'Last Quarter';

            } else {
                setPhase('25%');
                setDirection(false);
                return 'Waning Crescent';
            }
        }

        calculateCurrentMoonPhase();
        console.log(calculateCurrentMoonPhase())
    }, []);

    return (
        <div id="about" className="text-center flex h-lvh justify-evenly items-center flex-col lg:flex-row mx-5">
            <div>
                <div className="flex space-x-2 justify-center">
                    <h1 className="text-4xl font-bold mb-7 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-violet-700">Hello! My name is Khaled.</h1>
                    <span className="text-4xl">🚀</span>
                </div>
                <h2>I am a tech enthusiast with experience in IT support, automation, game dev and most recently front-end development.</h2>
                <h2 className="mb-7">I love creating projects and learning new technologies whenever I can.</h2>
                <h2>I am currently working on a fun game in Unity called <a className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-yellow-600 font-bold" href="https://khaledhadida.github.io/Caravans-of-Fortune/">Caravans of Fortune</a></h2>
                <h3 className="italic text-xs text-gray-400 font-bold ">(Please note this site is subject to change..)</h3>
            </div>
            {/* Moon */}

            <div className="">
                {direction ? (
                    <div className="wrapper">
                        <div id="moonReversed" className="moonReversed">
                            <div style={{
                                position: 'absolute', width: '350px', height: '350px', backgroundColor: 'rgb(212, 212, 212)', zIndex: '99',
                                top: 0,
                                boxShadow: '5px 0 10px 3px rgba(229, 229, 229, 0.3), 0 0 10px 2px rgba(229, 229, 229, 0.3),5px 0 10px 3px rgba(229, 229, 229, 0.3),0px 0 3px 2px rgba(229, 229, 229, 0.3)',
                                left: phase,
                                borderRadius: radius,
                                transition: 'left 1s ease-in-out, border-radius 1s ease-in-out'
                            }}>
                            </div>
                        </div>
                    </div>
                ) :
                    (
                        <div id="moon" className="moon">
                            <div style={{
                                content: '', position: 'absolute', width: '350px', height: '350px', backgroundColor: 'black', zIndex: '21',
                                top: 0,
                                boxShadow: '-50px 0 60px 50px rgba(0, 0, 0, 0.05)',
                                left: phase,
                                borderRadius: radius,
                                transition: 'left 1s ease-in-out, border-radius 1s ease-in-out'
                                // background: 'radial-gradient(circle at 150px 175px,rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.55) 75%,  rgba(0, 0, 0, 0.25) 100%,  rgba(0, 0, 0, 0.9) 70%)'
                            }}>

                            </div>
                        </div>
                    )}
            </div>

        </div >


    );
}