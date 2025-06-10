"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { CiLocationOn } from "react-icons/ci";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image?: string;
  createdBy: User;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"upcoming" | "past">("upcoming");

  const [userId, setUserId] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const [showJoinModal, setShowJoinModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [joinCode, setJoinCode] = useState("");

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    const tkn = localStorage.getItem("token");
    setUserId(uid);
    setToken(tkn);
    setIsLoggedIn(!!tkn);
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/events?status=${statusFilter}`);
      setEvents(res.data);
      setError("");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to load events");
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [statusFilter]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEvents((prev) => prev.filter((event) => event._id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to delete event");
      } else {
        alert("Failed to delete event due to unexpected error");
      }
    }
  };

  const handleJoinClick = (eventId: string) => {
    if (!isLoggedIn) {
      alert("Please login to join this event.");
      return;
    }
    setSelectedEventId(eventId);
    setJoinCode("");
    setShowJoinModal(true);
  };

  const handleJoinSubmit = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/events/${selectedEventId}/join`,
        { code: joinCode },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Joined event successfully!");
      setShowJoinModal(false);
      setSelectedEventId(null);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data?.message || "Failed to join event");
      } else {
        alert("An unexpected error occurred while joining.");
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-[#0f051d] to-[#1a103c] text-white py-10 px-6 md:px-20">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">
            {statusFilter === "upcoming" ? "Upcoming Events" : "Past Events"}
          </h1>
          {isLoggedIn && (
            <Link href="/create">
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                + Create Event
              </button>
            </Link>
          )}
        </div>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setStatusFilter("upcoming")}
            className={`px-4 py-2 rounded text-black ${
              statusFilter === "upcoming" ? "bg-blue-600 text-black" : "bg-gray-200"
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setStatusFilter("past")}
            className={`px-4 py-2 rounded text-black ${
              statusFilter === "past" ? "bg-blue-600 text-black" : "bg-gray-200"
            }`}
          >
            Past
          </button>
        </div>

        {loading ? (
          <div className="text-center mt-10">Loading events...</div>
        ) : error ? (
          <div className="text-center text-red-600 mt-10">{error}</div>
        ) : events.length === 0 ? (
          <p className="text-center text-gray-500">No {statusFilter} events available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => {
              console.log("Event:", event);
              console.log("CreatedBy ID:", event.createdBy?._id);

              return (
                <div key={event._id} className="bg-[#1a2238] rounded-lg shadow p-4 relative">
                  {event.image && (
                    <img
                      src={`http://localhost:5000/uploads/${event.image}`}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded mb-4"
                    />
                  )}
                  <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                  <p className="text-sm text-white-600 mb-1">
                    {new Date(event.date).toDateString()}
                  </p>
                  <p className="mb-2">{event.description}</p>
                  <p className="text-sm text-white-500 flex items-center gap-1">
                    <CiLocationOn /> {event.location}
                  </p>

                  {isLoggedIn && String(userId) === String(event.createdBy?._id) && (
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="absolute bottom-4 right-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  )}

                  {isLoggedIn && String(userId) !== String(event.createdBy?._id) && (
                    <button
                      onClick={() => handleJoinClick(event._id)}
                      className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Join
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {showJoinModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="bg-white text-black p-6 rounded-lg w-full max-w-sm">
              <h2 className="text-xl font-bold mb-4">Enter Event Code</h2>
              <input
                type="text"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="w-full border px-3 py-2 rounded mb-4"
                placeholder="Event Code"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowJoinModal(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleJoinSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
