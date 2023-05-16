import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
    return (
        <main className="flex min-h-screen flex-col justify-between items-center bg-[url('/bg.png')] bg-no-repeat bg-cover bg-fixed w-screen">
            <div className="w-full flex flex-col items-center mb-10">
                <Navbar />
                <div className='flex flex-col items-center justify-center py-6 w-full sm:px-6 lg:px-8'>
                    <div className="lg:my-10 my-2 sm:mx-auto sm:w-full">
                        <h2 className='text-center text-xl lg:text-5xl text-white font-rose-knight'>
                            About Amsa National Project
                        </h2>
                    </div>
                    <div className="">
                        AMSA National Project adalah program kerja tahunan yang dilaksanakan oleh AMSA-Indonesia. AMSA National Project merupakan puncak dari AMSA District Project yang dilaksanakan oleh keenam distrik di AMSA-Indonesia. Pada tahun ini, AMSA National Project akan membawakan tema “Obstetrics and Gynecology”. Acara ini diharapkan dapat menjadi wadah kolaborasi bagi anggota AMSA-Indonesia dari berbagai universitas untuk bersama-sama memberikan kebermanfaatan bagi masyarakat umum dan berbagai pihak lainnya.
                    </div>
                </div>
            </div>
            <Footer />
        </main>
    );
};
