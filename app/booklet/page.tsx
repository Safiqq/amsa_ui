import Navbar from '@/components/Navbar'
import Image from 'next/image'

export default function Booklet() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-[url('/bg.png')] bg-no-repeat bg-cover bg-fixed w-screen">
            {/* Navbar */}
            <Navbar />
        </main>
    )
}
