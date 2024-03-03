import React from 'react';
import { Call, Mail, LinkedIn, Instagram } from '@mui/icons-material';

const TopBar = () => {
    return (
        <div className="bg-primary py-2 px-4 flex justify-between items-center rounded-xl">
            <div className="flex items-center">
                <div className="text-white mr-2">
                    <Mail />
                </div >
                <div className="text-white">info@makroteknik.com.uk</div>
                <div className="text-white mr-2 ml-6">
                    <Call />
                </div>
                <div className="text-white">+44 216 313 08 08</div>
            </div >
            <div className="flex items-center text-white gap-2">
                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
                    <LinkedIn />
                </a>
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                    <Instagram />
                </a>
            </div>
        </div >
    );
};

export default TopBar;