'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import React, { useEffect } from 'react';
import EventHome from '@/components/EventHome';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({ delay: 100, duration: 1000 });
  }, []);

  const enlargeFirstLetters = (text: string) => {
    const words = text.split(' ');

    const enlargedWords = words.map((word, index) => {
      if (word.toLowerCase() !== 'and' && word.toLowerCase() !== 'on') {
        const firstLetter = word.charAt(0);
        const restOfWord = word.slice(1);
        return (
          <React.Fragment key={word}>
            {index !== 0 && ' '}
            <span className="enlarged-letter">
              <span className="first-letter">{firstLetter}</span>
              {restOfWord}
            </span>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment key={word}>
            {index !== 0 && ' '}
            {word}
          </React.Fragment>
        );
      }
    });

    return enlargedWords;
  };

  return (
    <main className="flex min-h-screen flex-col justify-between items-center bg-[url('/bg.png')] bg-no-repeat bg-cover bg-fixed w-screen">
      <div className="w-full flex flex-col items-center mb-10">
        <Navbar />
        {/* Hero */}
        <div data-aos="zoom-in-up" className="w-[80%] lg:w-[90%] flex flex-col justify-center items-center">
          <img src={"/ethnosphere.png"} alt='logo' className='mt-16 w-[800px]'></img>
          <h1 className='tracking-wide text-center mt-3 text-xs md:text-base lg:text-3xl text-[#FBD493] font-alegreya uppercase'>{'❝'}{enlargeFirstLetters("Elicit New Objectives and Insights on")}<br />{enlargeFirstLetters("Obstetrics and Gynecology")}{'❞'}</h1>
        </div>
        <div className="w-[90%] mb-8 mt-24 font-alegreya divide-y-4 divide-[#5473b8] divide-solid">
          {/* <h1 className="text-center text-3xl font-bold mb-8">Roadmap</h1> */}
          <EventHome title={"Ethnos-series #1:"} subtitle={"Screening as a Glimpse of Our Future"} date='' />
          <EventHome title={"Ethnos-series #2:"} subtitle={"Bad Moments Do Not Define Bad Moms"} date='' />
          <EventHome title={"Ethnos-series #3:"} subtitle={"Nutrition Education, a Key for Our Children"} date='' />
          <EventHome title={"Symposium and Workshop:"} subtitle={"Obstetrics and Gynecology"} date='3-4 Juni 2023' />
          <EventHome title={"AMSA Escapade"} subtitle={""} date='10 Juni 2023' />
          <EventHome title={"Ethnos Show:"} subtitle={"Fly High for the Future of Women and Children"} date='' />
        </div>
      </div>
      <Footer />
    </main>
  );
};
