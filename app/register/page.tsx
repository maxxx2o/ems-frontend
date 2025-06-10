"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setToken } from "@/utils/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/api/auth/register", form);
    setToken(res.data.token);
    router.push("/login");
  } catch (err: unknown) {
    // Type guard to check if err is an AxiosError with response and data.message
    if (axios.isAxiosError(err) && err.response?.data?.message) {
      setError(err.response.data.message);
    } else if (err instanceof Error) {
      // fallback for native JS errors
      setError(err.message);
    } else {
      setError("Registration failed");
    }
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 border border-gray-300 rounded"
          required
        />

        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}
