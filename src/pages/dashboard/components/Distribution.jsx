import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

export default function Distribution() {
  const pharmacyData = [
    { name: "PH1", Med: 2000, Pay: 1500 },
    { name: "PH2", Med: 1000, Pay: 2500 },
    { name: "PH3", Med: 1500, Pay: 2000 },
  ];

  const doctorsData = [
    { name: "DR1", Med: 1200, Pay: 1800 },
    { name: "DR2", Med: 1700, Pay: 1300 },
    { name: "DR3", Med: 2000, Pay: 2200 },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="p-4 rounded-xl shadow bg-white">
        <h2 className="text-xl  mt-2 mb-4 font-semibold text-[var(--primaryDark)]">
          Distribution  <span className="ml-1 my-2 text-[var(--primary)]">Pharmacy</span>
        </h2>
        <BarChart width={350} height={250} data={pharmacyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Med" fill="#3B82F6" />
          <Bar dataKey="Pay" fill="#1E3A8A" />
        </BarChart>
      </div>

      <div className="p-4 rounded-xl shadow bg-white">
        <h2 className="text-xl mt-2 mb-4 font-semibold text-[var(--primaryDark)]">
          Distribution <span className="ml-1  text-[var(--primary)]">Doctors</span>
        </h2>
        <BarChart width={350} height={250} data={doctorsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Med" fill="#3B82F6" />
          <Bar dataKey="Pay" fill="#1E3A8A" />
        </BarChart>
      </div>
    </section>
  );
}
