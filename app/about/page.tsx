'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function About() {
    useEffect(() => {
        AOS.init({ delay: 100, duration: 1000 });
    }, []);
    return (
        <div className="flex min-h-screen flex-col justify-between items-center bg-[url('/bg.png')] bg-no-repeat bg-cover bg-fixed w-screen">
            <div className="w-full flex flex-col items-center mb-10">
                <Navbar />
                <div className='flex flex-col items-center justify-center py-6 w-full sm:px-6 lg:px-8'>
                    <div className="lg:my-10 my-2 sm:mx-auto sm:w-full">
                        <h2 data-aos="flip-down" className='text-center text-xl lg:text-5xl text-white font-rose-knight'>
                            About <span className='mr-3'>AMSA</span> National Project
                        </h2>
                    </div>
                    <div data-aos="zoom-in" className="w-[90%] bg-[#44609C] border-[6px] border-[#6d90db] p-2 lg:p-10 rounded-xl font-alegreya text-xs md:text-sm lg:text-xl text-center">
                        AMSA National Project adalah program kerja tahunan yang dilaksanakan oleh AMSA-Indonesia. AMSA National Project merupakan puncak dari AMSA District Project yang dilaksanakan oleh keenam distrik di AMSA-Indonesia. Pada tahun ini, AMSA National Project akan membawakan tema “Obstetrics and Gynecology”. Acara ini diharapkan dapat menjadi wadah kolaborasi bagi anggota AMSA-Indonesia dari berbagai universitas untuk bersama-sama memberikan kebermanfaatan bagi masyarakat umum dan berbagai pihak lainnya.
                    </div>
                    <div className="w-[90%] flex flex-col md:flex-row mt-8 lg:mt-20 items-center">
                        <h2 data-aos="flip-right" className='text-center text-xl md:text-2xl my-2 lg:text-5xl text-white font-rose-knight'>
                            This Year Theme
                        </h2>
                        <div data-aos="fade-down" className="w-[90%] bg-[#44609C] border-[6px] border-[#6d90db] py-5 pl-6 p-2 lg:p-10 rounded-xl font-alegreya text-xs md:text-sm lg:text-xl">
                            <h3 className='text-xl lg:text-4xl text-center font-rose-knight mb-2'>
                                Obstetrics and Gynecology
                            </h3>
                            <ul className='list-disc'>
                                <li>
                                    Sebagai negara dengan jumlah penduduk terbesar keempat di dunia, Indonesia berada pada urutan keempat dalam peringkat tertinggi angka kelahiran.
                                </li>
                                <li>
                                    Berbagai masalah dan tantangan baru pun senantiasa muncul dalam aspek kesehatan serta praktik kedokteran, khususnya dalam bidang obstetri dan ginekologi.
                                </li>
                                <li>
                                    Salah satu agenda utama SDGs adalah menurunkan angka kematian ibu dan balita.
                                </li>
                                <li>
                                    Angka kematian ibu di Indonesia masih berada di kisaran 305 per 100.000 kelahiran hidup, jauh dari target yang ditentukan, (183 per 100.000 KH di tahun 2024).
                                </li>
                                <li>
                                    Demikian juga bayi dan balita yang masih harus kita selamatkan dari kematian. Target ini dapat dicapai melalui intervensi spesifik yang dilakukan saat dan sebelum kelahiran.
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
