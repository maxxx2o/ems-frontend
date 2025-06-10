'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { CiLocationOn } from "react-icons/ci";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#0f051d] to-[#1a103c] text-white py-10 px-6 md:px-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div>
            <p className="text-sm mb-2">All the fun starts here.</p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Book your <br /> Tickets for Event!
            </h1>
            <ul className="mt-6 mb-6 space-y-1 list-disc list-inside text-sm">
              <li>Safe, Secure, Reliable ticketing.</li>
              <li>Your ticket to live entertainment!</li>
            </ul>
            <Link
              href="#featured-events"
              className="inline-block bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200"
            >
              View More →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 py-20">
            <Image src="/singer1.webp" alt="Hero1" width={200} height={300} className="rounded-md" />
            <Image src="/raftaar.jpeg" alt="Hero2" width={200} height={300} className="rounded-md" />
            <Image src="/arjitsingh.avif" alt="Hero3" width={200} height={300} className="rounded-md" />
            <Image src="/yoyohoney.jpeg" alt="Hero4" width={200} height={300} className="rounded-md" />
          </div>
        </div>

      <div id="featured-events" className="bg-[#0b1221] text-white py-10 px-10 md:px-10 rounded-xl w-full max-w-100">
        <h2 className="text-3xl font-bold mb-6">Featured Events</h2>
        <p className="mb-4 text-sm">Be sure not to miss these Events.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1a2238] p-4 rounded-md">
            <Image src="/AnubhavBassi.jpg" alt="Event 1" width={400} height={250} className="rounded-md mb-2" />
            <p><CiLocationOn />sanjiv auditorium Surat</p>
            <h3 className="font-bold">Kis Ko Batana Mat</h3>
            <p>29 Jun | Comedy Show</p>
            <button className="mt-2 text-sm underline">Get Tickets →</button>
          </div>
          <div className="bg-[#1a2238] p-4 rounded-md">
            <Image src="/theweekend.avif" alt="Event 2" width={400} height={250} className="rounded-md mb-2" />
            <p><CiLocationOn />venue to Announced: Indore</p>
            <h3 className="font-bold">Afterverse-A The Weekend </h3>
            <p>16 Aug | Music Show</p>
            <button className="mt-2 text-sm underline">Get Tickets →</button>
          </div>
          <div className="bg-[#1a2238] p-4 rounded-md">
            <Image src="/lovelab.avif" alt="Event 3" width={400} height={250} className="rounded-md mb-2" />
            <p><CiLocationOn />Regional Park: indore</p>
            <h3 className="font-bold">LOVE LAB</h3>
            <p>13 Jun | Meetups</p>
            <button className="mt-2 text-sm underline">Get Tickets →</button>
          </div>
        </div>
      </div>
      </section>
    </>
  );
}
