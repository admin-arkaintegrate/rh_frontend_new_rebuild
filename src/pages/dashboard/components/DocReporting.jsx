import React from "react";
import exportt from "/assets/icons/export.svg";
export default function DocReporting() {
  const cards = [
    {
      title: "Total sent ERX Completed",
      value: 1092,
      color: "bg-[#DBEAFE]",
      img: "/assets/icons/doc-reporting1.svg",
    },
    {
      title: "Total Consulted pending",
      value: 1092,
      color: "bg-[#BF83FF33]",
      img: "/assets/icons/doc-reporting2.svg",
    },
    {
      title: "Total other Status",
      value: 1092,
      color: "bg-[#FEF3C799]",
      img: "/assets/icons/doc-reporting3.svg",
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
        <button className="text-sm flex items-center border border-[#C3D3E2]  text-[var(--primaryDark)] px-4 py-2 rounded-lg">
          <img src={exportt} alt="" className="inline h-6 w-6 mr-2" />
          Export
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {cards.map((c, i) => (
          <div
            key={i}
            className={`${c.color} p-4 rounded-xl shadow-sm flex flex-col`}
          >
            <img src={c.img} alt="" className="h-6 w-6 mb-2" />
            <span className="text-2xl font-bold">{c.value}</span>
            <span className="text-sm text-gray-600">{c.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
