'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Events() {
    useEffect(() => {
        AOS.init({ delay: 100, duration: 1000 });
    }, []);
    return (
        <div className="flex min-h-screen flex-col justify-between items-center bg-[url('/bg.png')] bg-no-repeat bg-cover bg-fixed w-screen">
            <div className="w-full flex flex-col items-center mb-10">
                <Navbar />
                <div className='flex flex-col items-center justify-center py-6 w-full sm:px-6 lg:px-8'>
                    <div className="lg:mt-10 my-2 sm:mx-auto sm:w-full">
                        <h2 data-aos="flip-down" className='text-center text-xl lg:text-5xl text-white font-rose-knight'>
                            Our Events
                        </h2>
                    </div>
                    {/* Pre-event */}
                    <div className="w-[90%] flex flex-col md:flex-row mt-8 lg:mt-20 items-center justify-center">
                        <h2 data-aos="flip-right" className='text-center w-[20%] text-xl md:text-2xl my-2 lg:text-5xl text-white font-rose-knight'>
                            Pre-Event
                        </h2>
                        <div data-aos="fade-down" className="w-[70%] bg-[#44609C] border-[6px] border-[#6d90db] py-5 pl-6 p-2 lg:p-10 rounded-xl font-alegreya text-xs md:text-sm lg:text-xl">
                            <ul className='list-disc'>
                                <li>
                                    Kegiatan Live Instagram bersama dengan narasumber seputar tema skrining pramarital dan skrining prakehamilan
                                </li>
                                <li>
                                    Video wawancara dengan metode tanya jawab dan akan disertakan video klarifikasi oleh psikiater.
                                </li>
                                <li>
                                    Demo Masak dan Webinar mengenai post natal care dengan target kerja sama Cegah Stunting, UNICEF dan MPASi.id/sahabatmenyusui.
                                </li>
                            </ul>
                        </div>
                    </div>
                    {/* AMSA Escapade */}
                    <div className="w-[90%] flex flex-col mt-8 lg:mt-20 items-center">
                        <h2 data-aos="flip-right" className='text-center text-xl md:text-2xl my-2 lg:text-5xl text-white font-rose-knight'>
                            AMSA Escapade
                        </h2>
                        <div data-aos="fade-down" className="w-[90%] mt-4 bg-[#44609C] border-[6px] border-[#6d90db] py-5 pl-6 p-2 lg:p-10 rounded-xl font-alegreya text-xs md:text-sm lg:text-xl">
                            <ul className='list-disc'>
                                <li>
                                    Kegiatan dilaksanakan pada tanggal 10 Juni 2023 secara hybrid
                                </li>
                                <li>
                                    Setiap district wajib berpartisipasi dengan mengirimkan
                                    <ul className='list-decimal ml-6'>
                                        <li>
                                            1 kelompok online berisi 3 peserta untuk permainan cerdas cermat
                                        </li>
                                        <li>
                                            1 kelompok offline berisi 3 peserta untuk permainan hunting bahan makanan (belanja di kita)
                                        </li>
                                        <li>
                                            1 kelompok offline berisi 3 peserta untuk lomba memasak
                                        </li>
                                    </ul>

                                </li>
                                <li>
                                    Demo Masak dan Webinar mengenai post natal care dengan target kerja sama Cegah Stunting, UNICEF dan MPASi.id/sahabatmenyusui.
                                </li>
                            </ul>
                            {/* Button */}
                            {/* <div className="flex justify-end">
                                <button className="flex justify-center py-2 px-4 border border-transparent mt-4 rounded-md shadow-sm text-white bg-[#283A85] hover:bg-indigo-700 transition-all focus:outline-none">
                                    <a href="/events/amsa-escapade">
                                        Details
                                    </a>
                                </button>
                            </div> */}
                        </div>
                    </div>
                    {/* Symposium */}
                    <div className="w-[90%] flex flex-col mt-8 lg:mt-20 items-center">
                        <h2 data-aos="flip-right" className='text-center text-xl md:text-2xl my-2 lg:text-5xl text-white font-rose-knight'>
                            Symposium and Workshop
                        </h2>
                        <div data-aos="fade-down" className="w-[90%] mt-4 bg-[#44609C] border-[6px] border-[#6d90db] py-5 pl-6 p-2 lg:p-10 rounded-xl font-alegreya text-xs md:text-sm lg:text-xl">
                            <p>
                                Seminar dan pelatihan dengan total delapan (8) judul simposium dan enam (6) topik workshop yang semuanya berada dalam lingkup bahasan obstetric and gynecology. Rangkaian acara diisi dengan pemaparan ilmu terbaru dari ahli-ahli yang terakreditasi SKP IDI (Satuan Kredit Profesi Ikatan Dokter Indonesia). Simposium dan workshop diselenggarakan utuh secara daring agar sejawat se-Indonesia dapat ikut serta memperbaharui ilmunya.
                            </p>
                            {/* Button */}
                            {/* <div className="flex justify-end">
                                <button className="flex justify-center py-2 px-4 border border-transparent mt-4 rounded-md shadow-sm text-white bg-[#283A85] hover:bg-indigo-700 transition-all focus:outline-none">
                                    <a href="/events/symposium">
                                        Details
                                    </a>
                                </button>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
