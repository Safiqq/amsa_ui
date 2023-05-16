import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function EventHome(props: {
    subtitle: string; title: string; date: string;
}) {
    useEffect(() => {
        AOS.init({ delay: 100, duration: 1000 });
    }, []);

    const enlargeFirstLetters = (text: string) => {
        const words = text.split(' ');

        const enlargedWords = words.map((word, index) => {
            if (word.toLowerCase() !== 'and' && word.toLowerCase() !== 'on' && word.toLowerCase() !== 'as' && word.toLowerCase() !== 'a' && word.toLowerCase() !== 'for') {
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
        <div data-aos="fade-right" className="flex justify-between items-center w-full text-sm md:text-base lg:text-3xl">
            <div className="py-4 px-2">
                <div className="font-rose-knight">{props.title}</div>
                {
                    props.subtitle.length !== 0 &&
                    <div className="font-alegreya uppercase text-xs lg:text-base">{'"'}{enlargeFirstLetters(props.subtitle)}{'"'}</div>
                }
                <div className='font-alegreya lg:hidden'>{props.date}</div>
            </div>
            <div className='font-alegreya text-xs md:text-2xl hidden lg:flex'>{props.date}</div>
        </div>
    )
}

export default EventHome