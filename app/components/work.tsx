import Jobs from './jobs.json';
import Image from 'next/image';
import ImageComponent from './ImageComponent';


interface Job {
    title: string;
    company: string;
    img: string;
}

export default function work() {

    return (
        <div id="work" className="flex flex-col justify-center items-center scroll-mt-[150px] max-w-[75%] m-auto">
            <h1 className="bg-maroon text-white text-center py-4 px-10 rounded-lg">Work</h1>
            <div className='space-y-7 w-full m-5'>
                {Jobs.map((job: Job, index) => (
                    <div key={index} className={`flex flex-col lg:flex-row rounded-lg items-center justify-between ${index % 2 ? 'lg:flex-row-reverse bg-gradient-to-l from-orange lg:rounded-r-full': 'bg-gradient-to-r from-orange lg:rounded-s-full'} `}>
                        {/* <h1 className='w-1/3 rounded-lg p-10 bg-slate-600  text-center'>Picture</h1> */}
                        <ImageComponent pic={job.img} title={"Companies"} id={index} />
                        <h1 className='font-bold'>{job.company}</h1>
                        {/* <Image src={`/images/Companies/${job.img}`} width={250}  height={250} alt="Picture of the author" />      */}
                        <p className='text-center text-wrap'>{job.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}