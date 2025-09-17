import React from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


const topNSorted = (arr, n = 10) => {
  if (!Array.isArray(arr)) return [];
  const cloned = [...arr];
  cloned.sort((a, b) => (b.Med + b.Priv) - (a.Med + a.Priv));
  return cloned.slice(0, n);
};


const buildDoctorsChartData = (doctorsResp, topN = 10) => {
  if (!Array.isArray(doctorsResp)) return [];
  const mapped = doctorsResp.map((d) => ({
    name: d.doctor_name ?? `DR-${d.doctor_id}`,
    Med: Number(d?.count?.tele_med ?? 0),
    Priv: Number(d?.count?.tele_priv ?? 0),
  }));
  return topNSorted(mapped, topN);
};


const buildPharmacyChartData = (pharmacyResp, topN = 10) => {
  const teleMed = pharmacyResp?.tele_med ?? [];
  const telePriv = pharmacyResp?.tele_priv ?? [];

  const map = new Map(); 
  teleMed.forEach((p) => {
    const key = p.pharmacy_name ?? `PH-${p.pharmacy_id}`;
    const prev = map.get(key) || { name: key, Med: 0, Priv: 0 };
    prev.Med += Number(p.count ?? 0);
    map.set(key, prev);
  });
  telePriv.forEach((p) => {
    const key = p.pharmacy_name ?? `PH-${p.pharmacy_id}`;
    const prev = map.get(key) || { name: key, Med: 0, Priv: 0 };
    prev.Priv += Number(p.count ?? 0);
    map.set(key, prev);
  });

  const arr = Array.from(map.values());
  return topNSorted(arr, topN);
};

export default function Distribution({
  doctorsData,
  pharmacyData,
  loading = { doctors: false, pharmacy: false },
  error = { doctors: "", pharmacy: "" },
}) {
  const doctorsChart = buildDoctorsChartData(doctorsData, 10);
  const pharmacyChart = buildPharmacyChartData(pharmacyData, 10);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pharmacy */}
      <div className="p-4 rounded-xl shadow bg-white">
        <h2 className="text-xl mt-2 mb-4 font-semibold text-[var(--primaryDark)]">
          Distribution <span className="ml-1 my-2 text-[var(--primary)]">Pharmacy</span>
        </h2>

        {loading.pharmacy ? (
          <div className="h-[260px] bg-gray-100 rounded-lg animate-pulse" />
        ) : error.pharmacy ? (
          <div className="text-red-600">{error.pharmacy}</div>
        ) : pharmacyChart.length === 0 ? (
          <div className="text-slate-500">No data</div>
        ) : (
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pharmacyChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Med" fill="#3B82F6" />
                <Bar dataKey="Priv" fill="#1E3A8A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Doctors */}
      <div className="p-4 rounded-xl shadow bg-white">
        <h2 className="text-xl mt-2 mb-4 font-semibold text-[var(--primaryDark)]">
          Distribution <span className="ml-1 text-[var(--primary)]">Doctors</span>
        </h2>

        {loading.doctors ? (
          <div className="h-[260px] bg-gray-100 rounded-lg animate-pulse" />
        ) : error.doctors ? (
          <div className="text-red-600">{error.doctors}</div>
        ) : doctorsChart.length === 0 ? (
          <div className="text-slate-500">No data</div>
        ) : (
          <div className="w-full h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={doctorsChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Med" fill="#3B82F6" />
                <Bar dataKey="Priv" fill="#1E3A8A" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
}
