"use client";

import { useState } from "react";
import axios from "axios";

interface JoinEventModalProps {
  eventId: string;
  onClose: () => void;
}

const JoinEventModal: React.FC<JoinEventModalProps> = ({ eventId, onClose }) => {
  const [eventCode, setEventCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `http://localhost:5000/api/events/${eventId}/join`,
        { code: eventCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage(res.data.message);
    }catch (err) {
  if (axios.isAxiosError(err)) {
    setMessage(err.response?.data?.message || "Failed to join");
  } else {
    setMessage("An unexpected error occurred");
  }
} finally {
  setLoading(false);
}
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Join Event</h2>
        <input
          type="text"
          value={eventCode}
          onChange={(e) => setEventCode(e.target.value)}
          placeholder="Enter Event Code"
          className="w-full p-2 border rounded mb-4"
        />
        {message && <p className="text-sm mb-2">{message}</p>}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleJoin}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinEventModal;
