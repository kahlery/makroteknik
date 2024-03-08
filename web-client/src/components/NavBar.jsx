import React from 'react';
import { Search, Home, Groups, Business, Handshake, AccountTree, PrecisionManufacturing, ContactPage, ExpandMore, Air, Category, DonutSmall, Filter, FilterAlt, SensorDoor, FilterList, Bolt, Gradient, HearingDisabled, BorderStyle } from '@mui/icons-material';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';

const createHandleMenuClick = (text) => () => {
    alert(text);
};

const NavBar = () => {
    return (
        <nav className="bg-primary bg-opacity-90 backdrop-blur-sm mb-4 py-2 pt-4 lg:py-0 lg:px-44 flex-col lg:flex lg:flex-row items-center justify-between w-full fixed top-[50px] z-20">
            <div className="hidden lg:flex items-center justify-center">
                <img src={process.env.PUBLIC_URL + '/logo.svg'} className="m-2 h-14 lg:mr-6" alt="logo" />
            </div>
            {/* <hr className="w-full lg:hidden my-1 border-primary" /> */}
            <div className="flex items-center justify-center text-white">
                <ul className="flex space-x-6 lg:space-x-8">
                    <li>
                        <a href="#" className="flex-row items-center">
                            <Home sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                            <p className='text-[1rem]'>Home</p>
                        </a>
                    </li>
                    <li >
                        <ul>
                            <Dropdown>
                                <MenuButton className="flex-row items-center text-white hover:text-primary">
                                    <Groups sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                                    <p className='text-[1rem]'>
                                        About
                                    </p>
                                </MenuButton>
                                <Menu className="absolute border-2 border-primary bg-white shadow-lg rounded-lg p-2 z-20">
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <Business sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>Profile</p>
                                        </MenuItem>
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <Handshake sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>References</p>
                                        </MenuItem>
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <AccountTree sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>Organisational Chart</p>
                                        </MenuItem>
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <ContactPage sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>Contact Us</p>
                                        </MenuItem>
                                    </a>
                                </Menu>
                            </Dropdown>
                        </ul>
                    </li>
                    <li>
                        <ul>
                            <Dropdown>
                                <MenuButton className="flex-row items-center text-white hover:text-primary">
                                    <PrecisionManufacturing sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1.2rem' } }} />
                                    <p className='text-[1rem]'>
                                        Products
                                    </p>
                                </MenuButton>
                                <Menu className="absolute border-2 border-primary bg-white shadow-lg rounded-lg p-2 z-20">
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <Air sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>FANS</p>
                                        </MenuItem>
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <Category sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>SPIRAL DUCTING + FITTINGS</p>
                                        </MenuItem>
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <AccountTree sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>FIXINGS + SUPPORTS</p>
                                        </MenuItem>
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <DonutSmall sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>FLEXIBLE DUCTING</p>
                                        </MenuItem>
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <FilterAlt sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>FILTERS & FILTER BOXES</p>
                                        </MenuItem>
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <SensorDoor sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>DAMPERS & ACCESS DOORS</p>
                                        </MenuItem>
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <FilterList sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>GRILLS & LOUVRES</p>
                                        </MenuItem>
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <Bolt sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>FLASHINGS</p>
                                        </MenuItem>
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <Gradient sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>TAPES, SEALANTS, SPRAYS</p>
                                        </MenuItem>
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <HearingDisabled sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>SILENCERS</p>
                                        </MenuItem>
                                    </a>
                                    <hr className="my-2" />
                                    <a href="#">
                                        <MenuItem onClick={createHandleMenuClick('Profile')} className="flex items-center gap-2">
                                            <BorderStyle sx={{ fontSize: '1.5rem', '@media (max-width: 1024px)': { fontSize: '1rem' } }} />
                                            <p className='text-[0.8rem]'>FLANGES</p>
                                        </MenuItem>
                                    </a>
                                </Menu>
                            </Dropdown>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;