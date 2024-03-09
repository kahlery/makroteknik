import React from 'react';

const InNavigation = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="bg-gray-800 text-white w-16 md:w-64">
                {/* Logo */}
                <div className="p-4">
                    <img src="logo.png" alt="Logo" className="w-12 h-12" />
                </div>

                {/* Navigation Elements */}
                <nav className="flex-grow">
                    {/* Category 1 */}
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-2">Category 1</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#section1" className="text-gray-300 hover:text-white">Nav Item 1</a>
                            </li>
                            <li>
                                <a href="#section2" className="text-gray-300 hover:text-white">Nav Item 2</a>
                            </li>
                        </ul>
                    </div>

                    {/* Category 2 */}
                    <div className="p-4">
                        <h2 className="text-lg font-bold mb-2">Category 2</h2>
                        <ul className="space-y-2">
                            <li>
                                <a href="#section3" className="text-gray-300 hover:text-white">Nav Item 3</a>
                            </li>
                            <li>
                                <a href="#section4" className="text-gray-300 hover:text-white">Nav Item 4</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/* Content */}
            <div className="flex-grow">
                <section id="section1" className="h-screen bg-gray-100">
                    {/* Content for Section 1 */}
                </section>
                <section id="section2" className="h-screen bg-gray-200">
                    {/* Content for Section 2 */}
                </section>
                <section id="section3" className="h-screen bg-gray-300">
                    {/* Content for Section 3 */}
                </section>
                <section id="section4" className="h-screen bg-gray-400">
                    {/* Content for Section 4 */}
                </section>
            </div>
        </div>
    );
};

export default InNavigation;