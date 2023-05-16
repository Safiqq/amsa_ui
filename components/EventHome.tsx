import React from 'react'

function EventHome(props: {
    subtitle: string; title: string; date: string;
}) {
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
        <div className="flex justify-between items-center w-full text-3xl">
            <div className="py-4 px-2">
                <div className="font-rose-knight">{props.title}</div>
                {
                    props.subtitle.length !== 0 &&
                    <div className="font-alegreya uppercase text-base">{'"'}{enlargeFirstLetters(props.subtitle)}{'"'}</div>
                }
            </div>
            <div className='font-alegreya text-2xl'>{props.date}</div>
        </div>
    )
}

export default EventHome