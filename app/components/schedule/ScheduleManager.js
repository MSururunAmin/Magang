import { useState } from "react";

export default function ScheduleManager({ schedule, addSchedule }) {
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newService, setNewService] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addSchedule({ date: newDate, time: newTime, service: newService });
    setNewDate("");
    setNewTime("");
    setNewService("");
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Jadwal yang Tersedia</h2>
        <ul className="space-y-2">
          {schedule.map((item) => (
            <li
              key={item.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              {item.service} - {item.date} - {item.time}
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tanggal
          </label>
          <input
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Waktu
          </label>
          <input
            type="time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Layanan
          </label>
          <input
            type="text"
            value={newService}
            onChange={(e) => setNewService(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Nama layanan"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          Tambahkan Jadwal
        </button>
      </form>
    </div>
  );
}
