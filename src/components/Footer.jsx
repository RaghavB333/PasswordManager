import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center w-full relative bottom-0'>
            <div className="logo font-bold text-white text-2xl">
                <span className="text-green-700">&lt;</span>
                <span>MyPass</span>
                <span className="text-green-700">Man/&gt;</span>
            </div>
            <div className='flex'>
                Created with <img className='w-[25px] mx-2' src="/heart.png" alt="" /> by Raghav Bhargava
            </div>
        </div>
    )
}

export default Footer
