import React from 'react';
import { Call, Mail } from '@mui/icons-material';

const TopBar = () => {
    const logo = process.env.PUBLIC_URL + '/logo.svg';

    return (
        <div className="flex flex-row bg-white text-black py-2 px-2 lg:px-64 top-0 text-sx w-full fixed z-50 border-black outline-2 border-t-[5px] shadow-md">
            <img src={logo} className="pt-[1px] h-10 lg:hidden" alt="logo" />
            <div className="ml-4 flex flex-row items-center w-full">
                <div className="flex flex-col lg:flex-row gap-1 lg:gap-6 lg:items-center text-xs">
                    <div className="flex flex-row gap-2 items-center">
                        <Mail sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                        <div className="text-[0.7rem] text-black">info@makroteknik.com.uk</div>
                    </div >
                    <div className="flex flex-row gap-2 items-center">
                        <Call sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                        <div className="text-[0.7rem] text-black">+44 216 313 08 08</div>
                    </div>
                </div>
                <button className="flex ml-auto border-black border-2 p-2 text-xs shadow-secondary shadow-[4px_4px_0px_0px] text-black">Get An Offer</button>
            </div>
        </div>
    );
};

export default TopBar;