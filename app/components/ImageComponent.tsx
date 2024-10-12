import React from 'react';
import Image from 'next/image';

interface ImageComponentProps {
    pic: string;
    title: string;
    id: number;
}

const ImageComponent = ({ pic, title, id }: ImageComponentProps) => {

    return (
        <div className='image-container'>
            <Image
                src={`/images/${title}/${pic}`}
                //both width & height are overriden by the image-container css
                width={100}
                height={100}
                alt={`${pic} Picture missing`}
                key={id}
            />
        </div>
    )
};

export default ImageComponent;