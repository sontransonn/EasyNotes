import React from 'react'
import { Link } from 'react-router-dom';
import { Footer as FooterFlowbite } from 'flowbite-react';

const Footer = () => {
    return (
        <FooterFlowbite container className='border border-t-8 border-teal-500'>
            <div className='w-full max-w-7xl mx-auto'>
                <div className='grid w-full justify-between gap-8 sm:flex md:grid-cols-1'>
                    {/* Info */}
                    <div className='mt-5'>
                        <Link
                            to='/'
                            className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white'
                        >
                            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                                WordWave
                            </span>
                            Blog
                        </Link>
                        <ul className='flex flex-col gap-2 mt-4'>
                            <li>Address: Chanh Thon-Nam Tien-Phu Xuyen-Ha Noi</li>
                            <li>Phone: +84 0866509926 (VN)</li>
                            <li>Email: sontransonn@gmail.com</li>
                        </ul>
                    </div>

                    <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-4 sm:gap-6'>
                        <div>
                            <FooterFlowbite.Title title='Getting Started' />
                            <FooterFlowbite.LinkGroup col>
                                <FooterFlowbite.Link>
                                    Introduction
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Themes
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Documentation
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Usages
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Global
                                </FooterFlowbite.Link>
                            </FooterFlowbite.LinkGroup>
                        </div>

                        <div>
                            <FooterFlowbite.Title title='Getting Started' />
                            <FooterFlowbite.LinkGroup col>
                                <FooterFlowbite.Link>
                                    Introduction
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Themes
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Documentation
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Usages
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Global
                                </FooterFlowbite.Link>
                            </FooterFlowbite.LinkGroup>
                        </div>

                        <div>
                            <FooterFlowbite.Title title='Resources' />
                            <FooterFlowbite.LinkGroup col>
                                <FooterFlowbite.Link>
                                    API
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Form Validation
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Accessibility
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Marketplace
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Community
                                </FooterFlowbite.Link>
                            </FooterFlowbite.LinkGroup>
                        </div>

                        <div>
                            <FooterFlowbite.Title title='Resources' />
                            <FooterFlowbite.LinkGroup col>
                                <FooterFlowbite.Link>
                                    API
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Form Validation
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Accessibility
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Marketplace
                                </FooterFlowbite.Link>
                                <FooterFlowbite.Link>
                                    Community
                                </FooterFlowbite.Link>
                            </FooterFlowbite.LinkGroup>
                        </div>
                    </div>
                </div>
            </div>
        </FooterFlowbite>
    )
}

export default Footer