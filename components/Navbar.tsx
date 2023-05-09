import React from 'react'

function Navbar() {
    return (
        <div className="w-[90%] flex justify-between mt-10 border-2 py-2 items-center px-12 rounded-[50px] lg:text-lg font-alegreya bg-gradient-to-tr from-[#2C2D77] via-[#262664] to-[#1D1D44] border-[#3C468C]">
            <div className="">
                <img src="/amsa-indonesia.png" alt="" className='h-[70px]' />
            </div>
            <div className="flex gap-20 items-center">
                <a href='/'>Home</a>
                <a href='/about'>About</a>
                <a href='/registration'>Registration</a>
                <a href='/'>Booklet</a>
            </div>
        </div>
    )
}

export default Navbar