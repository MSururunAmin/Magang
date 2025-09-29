"use client";

import NavbarDashboard from "@/app/components/NavbarDashboard";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Page = () => {
  const [data, setData] = useState({
    totalPermohonan: 0,
    dalamProses: 0,
    selesai: 0,
    ditolak: 0,
    permohonanTerkini: [],
    logAktivitas: [],
    statistik: [], // Data statistik untuk chart
  });

  const [chartData, setChartData] = useState({
    selesai: [],
    proses: [],
    ditolak: [],
  });

  // Fungsi untuk mengambil data dari API
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/dashboard-data"
      ); // Ganti URL dengan endpoint API Laravel
      if (!response.ok) {
        throw new Error("Gagal mengambil data");
      }
      const result = await response.json();
      setData(result);

      // Mengelompokkan data permohonan untuk chart
      const groupedData = groupChartData(result.permohonanTerkini);
      setChartData(groupedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk mengelompokkan data permohonan berdasarkan status
  const groupChartData = (permohonan) => {
    const selesai = new Array(7).fill(0); // Data untuk status "Selesai"
    const proses = new Array(7).fill(0); // Data untuk status "Dalam Proses"
    const ditolak = new Array(7).fill(0); // Data untuk status "Ditolak"

    permohonan.forEach((item, index) => {
      const week = index % 7; // Simulasikan data mingguan berdasarkan indeks
      if (item.status === "Selesai") selesai[week]++;
      if (item.status === "Dalam Proses") proses[week]++;
      if (item.status === "Ditolak") ditolak[week]++;
    });

    return { selesai, proses, ditolak };
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <NavbarDashboard />
      {/* Main Content */}
      <main className="p-6">
        {/* Statistik Panel */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Permohonan" value={data.totalPermohonan} />
          <StatCard title="Dalam Proses" value={data.dalamProses} />
          <StatCard title="Selesai" value={data.selesai} />
          <StatCard title="Ditolak" value={data.ditolak} />
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Permohonan Terkini */}
          <div className="col-span-2 bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Permohonan Terkini</h2>
            {data.permohonanTerkini.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-3 last:border-b-0"
              >
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-gray-500">Permohonan #{item.id}</p>
                </div>
                <span
                  className={`px-3 py-1 text-sm rounded ${
                    item.status === "Selesai"
                      ? "bg-green-100 text-green-600"
                      : item.status === "Menunggu"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>

          {/* Log Aktivitas */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Log Aktivitas</h2>
            <ul className="space-y-3">
              {data.logAktivitas.map((log, index) => (
                <li
                  key={index}
                  className="text-sm text-gray-700 border-b pb-2 last:border-b-0"
                >
                  {log}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Statistik Penyelesaian */}
        <div className="bg-white p-6 rounded shadow mt-6">
          <h2 className="text-lg font-semibold mb-4">
            Statistik Penyelesaian Permohonan
          </h2>
          <div>
            <Chart data={chartData} />
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded shadow flex flex-col items-center">
    <p className="text-gray-600 text-sm">{title}</p>
    <p className="text-2xl font-bold text-blue-600">{value}</p>
  </div>
);

const Chart = ({ data }) => {
  const chartData = {
    labels: [
      "Minggu 1",
      "Minggu 2",
      "Minggu 3",
      "Minggu 4",
      "Minggu 5",
      "Minggu 6",
      "Minggu 7",
    ],
    datasets: [
      {
        label: "Selesai",
        data: data.selesai,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Dalam Proses",
        data: data.proses,
        borderColor: "rgba(255, 206, 86, 1)",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        tension: 0.3,
        fill: true,
      },
      {
        label: "Ditolak",
        data: data.ditolak,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Statistik Penyelesaian Permohonan Mingguan",
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Page;
