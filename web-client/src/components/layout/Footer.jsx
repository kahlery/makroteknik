import React from 'react';
import { LinkedIn, Instagram } from '@mui/icons-material';

const Footer = () => {
    return (
        <footer className="border-t-2 border-primary bg-white px-6 lg:px-44 text-primary py-4 text-center relative z-40">
            <div className="container pt-2 gap-2 lg:gap-0 mx-auto flex flex-col justify-center items-center">

                <div className="flex flex-col lg:flex-row gap-2 items-center text-xs">
                    <div className="flex flex-row gap-2 items-center">
                        <div className="">UNIT 19A Peacock Industrial Estate, White Hart Lane, Tottenham, London, N17 8DT</div>
                    </div>
                </div>

                <hr className="w-1/2 mx-auto my-1 lg:my-4 border-gray-800" />

                <div className='flex flex-row gap-2'>

                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                        <LinkedIn sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                        <Instagram sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                    </a>

                </div>

                <hr className="w-1/2 mx-auto my-1 lg:my-4 border-gray-800" />

                <p className="text-xs" >
                    &copy; {new Date().getFullYear()} Makro Tech LTD. All rights reserved.
                </p>

                <div className='my-2' />
            </div>
        </footer>
    );
};

export default Footer;