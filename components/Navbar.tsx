import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Navbar() {
    return (
        <div className="w-[90%] flex justify-between mt-10 border-2 py-2 items-center px-12 rounded-[50px] lg:text-lg font-alegreya bg-gradient-to-tr from-[#2C2D77] via-[#262664] to-[#1D1D44] border-[#3C468C]">
            <Link href="/">
                <Image src="/amsa-indonesia.png" height="10" width="230" alt="" className='h-[70px]' />
            </Link>
            <div className="flex gap-20 items-center text-white">
                <a href='/'>Home</a>
                <a href='/about'>About</a>
                <a href='/register'>Register</a>
                <a href='/booklet'>Booklet</a>
            </div>
        </div>
    );
};

export default Navbar;