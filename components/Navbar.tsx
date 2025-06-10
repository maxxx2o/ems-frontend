'use client';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("token");
    setToken(stored);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };



    return (
        <nav className="flex items-center justify-between px-10 py-4 bg-gradient-to-r from-[#0f051d] to-[#1a103c] text-white shadow-md">
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    <Image src="/9793002.png" alt="logo" width={40} height={40} />
                    <span className="font-bold text-lg">WonderHub</span>
                </div>
            </div>
                <div className="flex gap-4 px-4 text-lg">
                    <button className="hover:underline bg-white py-1 px-5 text-black rounded"><Link href="/">Home</Link></button>
                    <button className="hover:underline bg-white py-1 px-5 text-black rounded"><Link href="/events">Events</Link></button>
                </div>
            <div className="flex gap-6">
                {!token ? ( 
                    <>
                    <Link className="hover:underline border border-white rounded px-5 py-2" href="/login">Login</Link>
                    <Link className="hover:underline border border-white rounded px-5 py-2" href="/register">Register</Link>
                    </>
                ) :   (
                    <button onClick={handleLogout} className="hover:underline border border-white rounded px-5 py-2">Logout</button>
                )
            }
            </div>
        </nav>
    );
};
