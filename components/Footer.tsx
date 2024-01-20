import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import WhatsApp from '/public/whatsapp.svg';
import Line from '/public/line.svg';
import Instagram from '/public/instagram.svg';

function Footer() {
    return (
        <footer className='text-sm md:text-md px-10 md:px-20 py-4 bottom-0 flex-col items-center justify-center w-full lg:text-lg font-alegreya bg-gradient-to-tr from-[#2C2D77] via-[#262664] to-[#1D1D44] border-[#3C468C]'>
            <div className='flex items-center'>
                <div className='basis-2/3'>
                    <Link href="/">
                        <Image src="/amsa-indonesia.png" height="10" width="250" alt="logo" />
                    </Link>
                </div>
                <div className='basis-1/3'>
                    <Link href='https://www.instagram.com/amsaindonesia/' className='flex items-center'>
                        <Image src={Instagram} height="52" width="52" alt="instagram" className='-mr-3' />
                        <div>AMSA Indonesia</div>
                    </Link>
                </div>
            </div>
            <div className='flex mt-4 mb-8'>
                <nav className='basis-1/3'>
                    <div className='mb-2 font-rose-knight font-bold'>Pages</div>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/register">Register</a></li>
                        <li><a href="/booklet">Booklet</a></li>
                    </ul>
                </nav>
                <div className='basis-1/3'>
                    <div className='mb-2 font-rose-knight font-bold right-20'>Events</div>
                    <div>Ethinos-Series #1</div>
                    <div>Ethinos-Series #2</div>
                    <div>Ethinos-Series #3</div>
                    <div>Symposium and Workshop</div>
                    <div>AMSA Escapade</div>
                    <div>Ethinos-Show</div>
                </div>
                <div className='basis-1/3'>
                    <div className='mb-2 font-rose-knight font-bold right-20'>Contacts</div>
                    <div className="space-y-3">
                        <div>
                            <div>Muhammad Zen Zaidan</div>
                            <Link href='https://wa.me/6285713130448' className='flex items-center'>
                                <Image src={WhatsApp} height="28" width="28" alt="whatsapp" className='mr-1 bg-[#075e54] p-1 rounded-full' />
                                <div>085713130448</div>
                            </Link>
                            <p className='flex items-center'>
                                <Image src={Line} height="28" width="28" alt="line" className='mr-1 bg-[#075e54] p-1 rounded-full' />
                                <div>zenzaidan15</div>
                            </p>
                        </div>
                        <div>
                            <div>Danella Raissa Widya</div>
                            <Link href='https://wa.me/6281228780370' className='flex items-center'>
                                <Image src={WhatsApp} height="28" width="28" alt="whatsapp" className='mr-1 bg-[#075e54] p-1 rounded-full' />
                                <div>081228780370</div>
                            </Link>
                            <p className='flex items-center'>
                                <Image src={Line} height="28" width="28" alt="line" className='mr-1 bg-[#075e54] p-1 rounded-full' />
                                <div>danellapk6</div>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="text-sm">© 2023 - AMSA Indonesia. All rights reserved.</div>
                <div className="text-sm">Built by <a href="https://ceavinrufus.netlify.app/" className="underline">Ceavin Rufus</a> and <a href="https://www.linkedin.com/in/syafiq-ziyadul-arifin" className="underline">Syafiq Ziyadul Arifin</a></div>
            </div>
        </footer>
    );
};

export default Footer;
