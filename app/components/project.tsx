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
                        <div className={`container ${index % 2 ? 'right' : 'left'}`} key={index}>
                            <div className="content" >
                                <div className='itemTop grid grid-cols-3' onClick={() => toggleCollapse(index)}>
                                    {/* an arrow imported with anim, if button is pressed the arrow is flipped 180 */}
                                    <IoIosArrowDown size={40} className={`arrow row-span-2 transform transition-transform duration-200 ease-in-out ${expandedProjects.includes(index) ? 'rotate-180' : ''}`} />
                                    <h2 className='col-span-2'>{project.title}</h2>
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
                                                    <div onClick={()=>closeImageModal()}>
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