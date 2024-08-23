import React from 'react'

import Search from './Search'

const HeroSection = () => {
    return (
        <section className="container justify-between mx-auto flex flex-col px-4 py-5 lg:flex-row">
            <div className="mt-10 lg:w-1/2">
                <h1 className="font-roboto text-3xl text-center font-bold text-dark-soft md:text-5xl lg:text-4xl xl:text-5xl lg:text-left lg:max-w-[540px]">
                    Welcome to my Blog
                </h1>
                <p className="text-dark-light mt-4 text-center md:text-xl lg:text-base xl:text-xl lg:text-left">
                    Here you'll find a variety of articles and tutorials on topics such as web development, software engineering, and programming languages.
                </p>
                <Search className="mt-10 lg:mt-6 xl:mt-10" />
                <div className="flex mt-4 flex-col lg:flex-row lg:items-start lg:flex-nowrap lg:gap-x-4 lg:mt-7">
                    <span className="text-dark-light font-semibold italic mt-2 lg:mt-4 lg:text-sm xl:text-base">
                        Popular Tags:
                    </span>
                </div>
            </div>
            <div className="hidden lg:block lg:1/2">
                <img
                    className="w-full"
                    src="http://localhost:5173/HeroImage.svg"
                    alt="users are reading articles"
                />
            </div>
        </section>
    )
}

export default HeroSection