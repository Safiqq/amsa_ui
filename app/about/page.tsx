import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-[url('/bg.png')] bg-no-repeat bg-cover bg-fixed w-screen">
            {/* Navbar */}
            <Navbar />
            <div className='h-screen'></div>
            <Footer />
        </main>
    );
};
