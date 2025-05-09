'use client'
import ProjectItems from './projects.json';
import { FaGithub, FaYoutube, FaGamepad } from 'react-icons/fa';
import ImageComponent from './ImageComponent';
import React, { useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import ImageModal from './ImageModal';

interface Project {
    title: string;
    date: string;
    github: string;
    youtube?: string;
    tech: string[];
    play?: string;
    pics: string[];
    desc: string;
}

type ImageType = {
    pic: string;
    title: string;
    index: number;
}

const iconWidth = 50;
const iconHeight = 50;

//Dict for react icons (typescript needs to know the type)
const icons: { [key: string]: JSX.Element } = {
    "Caravans of Fortune": (<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/svg"><path d="M320 96L192 96 144.6 24.9C137.5 14.2 145.1 0 157.9 0L354.1 0c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128l128 0c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96L96 512c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4c0 0 0 0 0 0s0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20l0 14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1c0 0 0 0 0 0s0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4l0 14.6c0 11 9 20 20 20s20-9 20-20l0-13.8c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15c0 0 0 0 0 0l-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7l0-13.9z"></path></svg>),
    "CaloriesJack": (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M18.06 22.99h1.66c.84 0 1.53-.64 1.63-1.46L23 5.05h-5V1h-1.97v4.05h-4.97l.3 2.34c1.71.47 3.31 1.32 4.27 2.26 1.44 1.42 2.43 2.89 2.43 5.29v8.05zM1 21.99V21h15.03v.99c0 .55-.45 1-1.01 1H2.01c-.56 0-1.01-.45-1.01-1zm15.03-7c0-8-15.03-8-15.03 0h15.03zM1.02 17h15v2h-15z"></path></svg>),
    "My Website": (<svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M14 7C13.4477 7 13 7.44772 13 8V16C13 16.5523 13.4477 17 14 17H18C18.5523 17 19 16.5523 19 16V8C19 7.44772 18.5523 7 18 7H14ZM17 9H15V15H17V9Z" fill="currentColor"></path><path d="M6 7C5.44772 7 5 7.44772 5 8C5 8.55228 5.44772 9 6 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H6Z" fill="currentColor"></path><path d="M6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13H10C10.5523 13 11 12.5523 11 12C11 11.4477 10.5523 11 10 11H6Z" fill="currentColor"></path><path d="M5 16C5 15.4477 5.44772 15 6 15H10C10.5523 15 11 15.4477 11 16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16Z" fill="currentColor"></path><path fillRule="evenodd" clipRule="evenodd" d="M4 3C2.34315 3 1 4.34315 1 6V18C1 19.6569 2.34315 21 4 21H20C21.6569 21 23 19.6569 23 18V6C23 4.34315 21.6569 3 20 3H4ZM20 5H4C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19H20C20.5523 19 21 18.5523 21 18V6C21 5.44772 20.5523 5 20 5Z" fill="currentColor"></path></svg>),
    "QuizMinaret": (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/svg"><path d="M0 480c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32V160H0v320zm579.16-192c17.86-17.39 28.84-37.34 28.84-58.91 0-52.86-41.79-93.79-87.92-122.9-41.94-26.47-80.63-57.77-111.96-96.22L400 0l-8.12 9.97c-31.33 38.45-70.01 69.76-111.96 96.22C233.79 135.3 192 176.23 192 229.09c0 21.57 10.98 41.52 28.84 58.91h358.32zM608 320H192c-17.67 0-32 14.33-32 32v128c0 17.67 14.33 32 32 32h32v-64c0-17.67 14.33-32 32-32s32 14.33 32 32v64h64v-72c0-48 48-72 48-72s48 24 48 72v72h64v-64c0-17.67 14.33-32 32-32s32 14.33 32 32v64h32c17.67 0 32-14.33 32-32V352c0-17.67-14.33-32-32-32zM64 0S0 32 0 96v32h128V96c0-64-64-96-64-96z"></path></svg>),
    "Top Ten Games Site": (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/svg"><path d="M464 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zM128 120c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm288-136v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12z"></path></svg>),
    "Capstone Conestoga Hub": (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M21 6.5a2.996 2.996 0 0 0-2.99 3.21l-2.03.68a4.468 4.468 0 0 0-3.22-2.32V5.91A3.018 3.018 0 0 0 15 3c0-1.66-1.34-3-3-3S9 1.34 9 3c0 1.4.96 2.57 2.25 2.91v2.16c-1.4.23-2.58 1.11-3.22 2.32l-2.04-.68C6 9.64 6 9.57 6 9.5c0-1.66-1.34-3-3-3s-3 1.34-3 3 1.34 3 3 3c1.06 0 1.98-.55 2.52-1.37l2.03.68c-.2 1.29.17 2.66 1.09 3.69l-1.41 1.77C6.85 17.09 6.44 17 6 17c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3c0-.68-.22-1.3-.6-1.8l1.41-1.77c1.36.76 3.02.75 4.37 0l1.41 1.77c-.37.5-.59 1.12-.59 1.8 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3c-.44 0-.85.09-1.23.26l-1.41-1.77a4.49 4.49 0 0 0 1.09-3.69l2.03-.68c.53.82 1.46 1.37 2.52 1.37 1.66 0 3-1.34 3-3S22.66 6.5 21 6.5zm-18 4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zM6 21c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm5-18c0-.55.45-1 1-1s1 .45 1 1-.45 1-1 1-1-.45-1-1zm1 12a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5zm6 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm3-8.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></path></svg>),
    "2D IT Simulator": (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 640 512" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/svg"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h274.9c-2.4-6.8-3.4-14-2.6-21.3l6.8-60.9 1.2-11.1 7.9-7.9 77.3-77.3c-24.5-27.7-60-45.5-99.9-45.5zm45.3 145.3l-6.8 61c-1.1 10.2 7.5 18.8 17.6 17.6l60.9-6.8 137.9-137.9-71.7-71.7-137.9 137.8zM633 268.9L595.1 231c-9.3-9.3-24.5-9.3-33.8 0l-37.8 37.8-4.1 4.1 71.8 71.7 41.8-41.8c9.3-9.4 9.3-24.5 0-33.9z"></path></svg>),
    "CaveCrawlers": (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/svg"><path d="M195.344 71.438c-3.83.12-7.66 1.205-10.938 3.062-9.987 5.66-16.774 16.198-25.062 31.72-8.288 15.52-17.55 36.4-29.03 63.218C107.35 223.07 75.606 300.42 26.843 403.875a9.5 9.5 0 1 0 17.187 8.094c48.966-103.882 80.897-181.682 103.75-235.064 11.428-26.69 20.6-47.274 28.314-61.72 7.713-14.443 14.5-22.366 17.656-24.155 1.578-.893 1.773-.822 2.78-.56 1.01.26 3.136 1.348 6 4.155 5.732 5.614 13.667 17.43 23.314 34.438 19.077 33.636 45.742 87.6 87.28 159.03-4.364 10.616-9.077 21.89-14.25 33.876a9.5 9.5 0 1 0 17.438 7.53c20.076-46.524 33.676-83.107 44.188-106.47 5.256-11.68 9.878-20.06 13.22-24.093 1.445-1.745 2.452-2.466 2.874-2.718.654.36 4.928 3.886 9.937 12.468 5.162 8.84 11.398 22.197 18.845 40 14.893 35.605 34.786 89.108 63.313 162.656a9.503 9.503 0 1 0 17.718-6.875c-28.48-73.43-48.32-126.835-63.5-163.126-7.59-18.146-13.993-31.983-19.97-42.22-5.974-10.235-11.09-17.537-19.78-20.843-2.172-.825-4.596-1.186-7-1.124-2.403.062-4.778.553-6.875 1.47-4.192 1.83-7.355 4.77-10.186 8.186-5.664 6.836-10.42 16.147-15.938 28.407-6.044 13.432-12.834 30.485-20.97 50.624-37.043-64.58-61.375-113.65-79.81-146.156-9.925-17.5-17.96-30.198-26.564-38.626-4.3-4.213-8.923-7.548-14.53-9-1.403-.362-2.857-.563-4.313-.624-.547-.024-1.08-.018-1.626 0zm5.03 258.78c-39.944 0-72.31 39.03-72.31 87.188h144.624c0-48.16-32.368-87.187-72.313-87.187z"></path></svg>),
    "Farm Tiles": (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 256 256" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/svg"><path d="M136.83,220.43a8,8,0,0,1-11.09,2.23A183.15,183.15,0,0,0,24,192a8,8,0,0,1,0-16,199.11,199.11,0,0,1,110.6,33.34A8,8,0,0,1,136.83,220.43ZM24,144a8,8,0,0,0,0,16,214.81,214.81,0,0,1,151.17,61.71,8,8,0,1,0,11.2-11.42A230.69,230.69,0,0,0,24,144Zm208,16a216.51,216.51,0,0,0-48.59,5.49q8.24,6.25,16,13.16A201.53,201.53,0,0,1,232,176a8,8,0,0,1,0,16c-6,0-11.93.29-17.85.86q8.32,8.67,15.94,18.14a8,8,0,1,1-12.48,10A247,247,0,0,0,24,128a8,8,0,0,1,0-16,266.33,266.33,0,0,1,48,4.37V80a8,8,0,0,1,3.2-6.4l64-48a8,8,0,0,1,9.6,0l64,48A8,8,0,0,1,216,80v32.49c5.31-.31,10.64-.49,16-.49a8,8,0,0,1,0,16,246.3,246.3,0,0,0-84.26,14.69q9.44,5,18.46,10.78A232.2,232.2,0,0,1,232,144a8,8,0,0,1,0,16ZM120,88h48a8,8,0,0,1,8,8v21.94q11.88-2.56,24-4V84L144,42,88,84v35.81q12.19,3,24,7.18V96A8,8,0,0,1,120,88Zm8.07,45.27A262.48,262.48,0,0,1,160,121.94V104H128v29.24Z"></path></svg>),
    "Athan Notifier": (<svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/svg"><path d="M3 21h7v-2a2 2 0 1 1 4 0v2h7"></path><path d="M4 21v-10"></path><path d="M20 21v-10"></path><path d="M4 16h3v-3h10v3h3"></path><path d="M17 13a5 5 0 0 0 -10 0"></path><path d="M21 10.5c0 -.329 -.077 -.653 -.224 -.947l-.776 -1.553l-.776 1.553a2.118 2.118 0 0 0 -.224 .947a.5 .5 0 0 0 .5 .5h1a.5 .5 0 0 0 .5 -.5z"></path><path d="M5 10.5c0 -.329 -.077 -.653 -.224 -.947l-.776 -1.553l-.776 1.553a2.118 2.118 0 0 0 -.224 .947a.5 .5 0 0 0 .5 .5h1a.5 .5 0 0 0 .5 -.5z"></path><path d="M12 2a2 2 0 1 0 2 2"></path><path d="M12 6v2"></path></svg>),
    "TrackLife": (<svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height={iconHeight} width={iconWidth} xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16 8a8 8 0 0 1-7.022 7.94l1.902-7.098a3 3 0 0 0 .05-1.492A3 3 0 0 0 10.237 6h5.511A8 8 0 0 1 16 8M0 8a8 8 0 0 0 7.927 8l1.426-5.321a3 3 0 0 1-.723.255 3 3 0 0 1-1.743-.147 3 3 0 0 1-1.043-.7L.633 4.876A8 8 0 0 0 0 8m5.004-.167L1.108 3.936A8.003 8.003 0 0 1 15.418 5H8.066a3 3 0 0 0-1.252.243 2.99 2.99 0 0 0-1.81 2.59M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4"></path></svg>)
};

export default function Project() {

    const [expandedProjects, setExpandedProjects] = useState<number[]>([]);
    const [showImage, setShowImage] = useState<Boolean>(false);

    const [image, setImage] = useState<ImageType>({
        pic: "",
        title: "",
        index: 0,
    });

    //Basically we make an array of the numbers (indices) for objects that are collapsed or not
    //IF the projectId is in the array and fn is called then remove it, otherwise add it to the list.
    const toggleCollapse = (projectId: number) => {
        setExpandedProjects((prevExpandedProjects) =>
            prevExpandedProjects.includes(projectId)
                ? prevExpandedProjects.filter((id) => id !== projectId)
                : [...prevExpandedProjects, projectId]
        );

    }

    const openImageModal = (pic: string, title: string, index: number) => {
        setImage((prevImage) => ({
            ...prevImage,
            pic: pic,
            title: title,
            index: index
        }));
        setShowImage(true);
    };

    const closeImageModal = () => {
        setShowImage(false);
    };

    return (
        <div>
            <div id="projects" className="flex justify-center items-center scroll-mt-[150px]">
                <h1 className="bg-maroon text-white text-center py-4 px-10 rounded-lg">Projects</h1>
            </div>
            <div className="timeline">
                {
                    ProjectItems.map((project: Project, index) => (
                        <div className={`container  ${index % 2 ? 'right' : 'left'}`} key={index}>
                            <div className="content text-xl" >
                                <div className='itemTop grid grid-cols-4' onClick={() => toggleCollapse(index)}>
                                    {/* an arrow imported with anim, if button is pressed the arrow is flipped 180 */}
                                    <IoIosArrowDown size={40} className={`arrow row-span-2 transform transition-transform duration-200 ease-in-out ${expandedProjects.includes(index) ? 'rotate-180' : ''}`} />
                                    <div className='row-span-2 my-auto'>
                                        {icons[project.title]}
                                    </div>
                                    <h2 className='col-span-2 font-bold'>{project.title}</h2>
                                    <h3 className='col-span-2'>{project.date}</h3>

                                </div>
                                {/* Separate top section which is collapsable with body section which is the info */}
                                <div className={`projectContent overflow-hidden ${expandedProjects.includes(index) ? 'max-h-full' : 'max-h-0'}`}>
                                    <hr className='my-5' />
                                    <div className='flex justify-evenly'>
                                        {project.play ?
                                            <a href={project.play}>
                                                <FaGamepad size="2em" />
                                            </a> : ""}
                                        <a href={project.github}>
                                            <FaGithub size="2em" />
                                        </a>
                                        {project.youtube ?
                                            <a href={project.youtube}>
                                                <FaYoutube size="2em" />
                                            </a> : ""}
                                    </div>
                                    <p>{project.desc}</p>
                                    {/* skills */}
                                    <div className='flex flex-wrap justify-center'>
                                        {project.tech.map((skill, index) => (
                                            <div className='capsule' key={index}>{skill}</div>
                                        ))}
                                    </div>
                                    {/* Images for projects */}
                                    <div className='flex flex-wrap justify-center gap-10'>
                                        {project.pics.map((pic, index) => (
                                            // <Image src={`/images/${project.title}/${pic}`} width={100} height={100} alt="Picture of the author" />
                                            <div key={index}>
                                                <div className='rounded-xl bg-orange cursor-zoom-in' onClick={() => openImageModal(pic, project.title, index)}>
                                                    <ImageComponent pic={pic} title={project.title} id={index} />
                                                    {/* Image Modal Popup */}
                                                </div>
                                                {showImage &&
                                                    <div onClick={() => closeImageModal()}>
                                                        <ImageModal pic={image.pic} title={image.title} id={image.index} />
                                                    </div>
                                                }
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}