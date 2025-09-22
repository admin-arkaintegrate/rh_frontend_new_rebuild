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

const BAR_SIZE = 15.27;
const COLOR_MED = "#3972C3";
const COLOR_PRIV = "#94A3B8";

const toInitials = (full = "") => {
  const parts = String(full).trim().split(/\s+/);
  const a = parts[0]?.[0] ?? "";
  const b = parts[1]?.[0] ?? "";
  return (a + b).toUpperCase();
};

const TickWithTitle = ({ x, y, payload }) => {
  const full = String(payload.value || "");
  const abbr = toInitials(full);
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor="middle"
        fontSize={12}
        fill="#1f2937"
      >
        {abbr}
        <title>{full}</title>
      </text>
    </g>
  );
};

const formatNumber = (num) => {
  if (num >= 1_000_000)
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  return num;
};

const topNSorted = (arr, n = 10) => {
  if (!Array.isArray(arr)) return [];
  const cloned = [...arr];
  cloned.sort((a, b) => b.Med + b.Priv - (a.Med + a.Priv));
  return cloned.slice(0, n);
};

const buildDoctorsChartData = (doctorsResp, topN = 10) => {
  if (!Array.isArray(doctorsResp)) return [];
  const mapped = doctorsResp.map((d) => {
    const full = d.doctor_name ?? `DR-${d.doctor_id}`;
    return {
      name: full,
      Med: Number(d?.count?.tele_med ?? 0),
      Priv: Number(d?.count?.tele_priv ?? 0),
    };
  });
  return topNSorted(mapped, topN);
};

const buildPharmacyChartData = (pharmacyResp, topN = 10) => {
  const teleMed = pharmacyResp?.tele_med ?? [];
  const telePriv = pharmacyResp?.tele_priv ?? [];

  const map = new Map();
  teleMed.forEach((p) => {
    const full = p.pharmacy_name ?? `PH-${p.pharmacy_id}`;
    const prev = map.get(full) || { name: full, Med: 0, Priv: 0 };
    prev.Med += Number(p.count ?? 0);
    map.set(full, prev);
  });
  telePriv.forEach((p) => {
    const full = p.pharmacy_name ?? `PH-${p.pharmacy_id}`;
    const prev = map.get(full) || { name: full, Med: 0, Priv: 0 };
    prev.Priv += Number(p.count ?? 0);
    map.set(full, prev);
  });

  const arr = Array.from(map.values());
  return topNSorted(arr, topN);
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const fullName = String(label || payload[0]?.payload?.name || "");
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 8,
          padding: "8px 10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          minWidth: 140,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 6, color: "#111827" }}>
          {fullName}
        </div>
        {payload.map((entry, i) => (
          <div
            key={i}
            style={{ display: "flex", justifyContent: "space-between", gap: 8 }}
          >
            <span style={{ color: entry.color, fontWeight: 600 }}>
              {entry.name}
            </span>
            <span style={{ color: "#111827" }}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const EvenLegend = ({ payload = [] }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center",
      width: "50%",
      margin: "0 auto",
      paddingTop: 20,
    }}
  >
    {payload.map((entry, index) => (
      <div
        key={`legend-${index}`}
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            borderRadius: "50%",
            backgroundColor: entry.color,
          }}
        />
        <span style={{ color: entry.color, fontWeight: 400 }}>
          {entry.value}
        </span>
      </div>
    ))}
  </div>
);

export default function Distribution({
  doctorsData,
  pharmacyData,
  loading = { doctors: false, pharmacy: false },
  error = { doctors: "", pharmacy: "" },
}) {
  const doctorsChart = buildDoctorsChartData(doctorsData, 10);
  const pharmacyChart = buildPharmacyChartData(pharmacyData, 10);

  const Chart = ({ data }) => (
    <div className="w-full h-[260px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          barCategoryGap={12}
          barGap={8}
          margin={{ top: 10, right: 8, left: 8, bottom: 28 }}
        >
          <CartesianGrid
            stroke="#E2E8F0"
            strokeDasharray="0"
            vertical={false}
            horizontal
          />

          <XAxis
            dataKey="name"
            tick={<TickWithTitle />}
            interval={0}
            minTickGap={0}
            tickMargin={10}
            allowDuplicatedCategory={false}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={formatNumber}
          />

          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            align="center"
            content={<EvenLegend />}
          />

          <Bar dataKey="Med" name="Med" fill={COLOR_MED} barSize={BAR_SIZE} />
          <Bar
            dataKey="Priv"
            name="Priv"
            fill={COLOR_PRIV}
            barSize={BAR_SIZE}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Pharmacy */}
      <div className="p-4 rounded-xl shadow bg-white">
        <h2 className="text-xl mt-2 mb-4 font-semibold text-[var(--primaryDark)] mx-8">
          Distribution{" "}
          <span className="ml-1 my-2 text-[var(--primary)]">Pharmacy</span>
        </h2>
        {loading.pharmacy ? (
          <div className="h-[260px] bg-gray-100 rounded-lg animate-pulse" />
        ) : error.pharmacy ? (
          <div className="text-red-600">{error.pharmacy}</div>
        ) : pharmacyChart.length === 0 ? (
          <div className="text-slate-500">No data</div>
        ) : (
          <Chart data={pharmacyChart} />
        )}
      </div>

      {/* Doctors */}
      <div className="p-4 rounded-xl shadow bg-white">
        <h2 className="text-xl mt-2 mb-4 font-semibold text-[var(--primaryDark)] mx-8">
          Distribution{" "}
          <span className="ml-1 text-[var(--primary)]">Doctors</span>
        </h2>
        {loading.doctors ? (
          <div className="h-[260px] bg-gray-100 rounded-lg animate-pulse" />
        ) : error.doctors ? (
          <div className="text-red-600">{error.doctors}</div>
        ) : doctorsChart.length === 0 ? (
          <div className="text-slate-500">No data</div>
        ) : (
          <Chart data={doctorsChart} />
        )}
      </div>
    </section>
  );
}
