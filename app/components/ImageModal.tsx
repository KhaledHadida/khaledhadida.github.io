import React from 'react';
import Image from 'next/image';

interface ImageComponentProps {
    pic: string;
    title: string;
    id: number;
}

const ImageModal = ({ pic, title, id }: ImageComponentProps) => {

    return (
        <div className='fixed inset-0 flex flex-col justify-center items-center bg-gray-900 bg-opacity-5 z-50'>
            <Image
                src={`/images/${title}/${pic}`}
                width={200}
                height={200}
                alt={`${pic} Picture missing`}
                style={{width: "auto", height: "auto", maxWidth: "100vw", maxHeight: "100vh" }}
                key={id}
            />
        </div>
    )
};

export default ImageModal;