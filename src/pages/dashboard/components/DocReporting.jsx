// src/pages/dashboard/components/DocReporting.jsx
import React from "react";
import exportt from "/src/assets/icons/export.svg";
import docReporting1 from "/src/assets/icons/doc-reporting1.svg";
import docReporting2 from "/src/assets/icons/doc-reporting2.svg";
import docReporting3 from "/src/assets/icons/doc-reporting3.svg";

export default function DocReporting({ data, loading, error }) {
  const totals = {
    sentErx: {
      count: data?.total_sent_erx_completed?.count ?? 0,
      percentage: data?.total_sent_erx_completed?.percentage ?? 0,
    },
    consultedPending: {
      count: data?.total_consulted_pending?.count ?? 0,
      percentage: data?.total_consulted_pending?.percentage ?? 0,
    },
    otherStatus: {
      count: data?.total_other_status?.count ?? 0,
      percentage: data?.total_other_status?.percentage ?? 0,
    },
  };

  const cards = [
    {
      title: "Total sent ERX Completed",
      value: totals.sentErx.count,
      percentage: totals.sentErx.percentage,
      color: "bg-[#DBEAFE]",
      img: docReporting1,
    },
    {
      title: "Total Consulted pending",
      value: totals.consultedPending.count,
      percentage: totals.consultedPending.percentage,
      color: "bg-[#BF83FF33]",
      img: docReporting2,
    },
    {
      title: "Total other Status",
      value: totals.otherStatus.count,
      percentage: totals.otherStatus.percentage,
      color: "bg-[#FEF3C799]",
      img: docReporting3,
    },
  ];

  return (
    <section className="p-4 rounded-xl shadow bg-white">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-xl mb-2 font-semibold text-[var(--primaryDark)]">
            Doc reporting
          </h2>
          <span className="text-[var(--grayColor)]">Summery</span>
        </div>
        <button className="text-sm flex items-center border border-[#C3D3E2] text-[var(--primaryDark)] px-4 py-2 rounded-lg">
          <img src={exportt} alt="" className="inline h-6 w-6 mr-2" />
          Export
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-gray-100 animate-pulse h-28"
            />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cards.map((c, i) => (
            <div
              key={i}
              className={`${c.color} p-4 rounded-xl shadow-sm flex flex-col`}
            >
              <img src={c.img} alt="" className="h-9 w-9 mb-2" />
              <span className="text-2xl font-bold">{c.value}</span>
              <span className="font-medium text-gray-600">{c.title}</span>
              <span className="text-sm font-bold text-[var(--green)]">
                {Number(c.percentage).toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
