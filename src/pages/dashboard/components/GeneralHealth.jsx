import React from "react";
import exportt from "/assets/icons/export.svg";

export default function GeneralHealth() {
  const items = [
    {
      title: "Call received",
      value: 450,
      color: "bg-[#DBEAFE]",
      img: "/assets/icons/general-health1.svg",
    },
    {
      title: "Routed to doctor",
      value: 5,
      color: "bg-[#D3ECF8]",
      img: "/assets/icons/general-health2.svg",
    },
    {
      title: "Insurance Verified",
      value: 450,
      color: "bg-[#F3E8FF]",
      img: "/assets/icons/general-health3.svg",
    },
    {
      title: "Consulted",
      value: 5,
      color: "bg-[#FEF8DD]",
      img: "/assets/icons/general-health4.svg",
    },
    {
      title: "ERX denied",
      value: 450,
      color: "bg-[#F9D8D9]",
      img: "/assets/icons/general-health5.svg",
    },
    {
      title: "ERX sent",
      value: 450,
      color: "bg-[#AEAEAE33]",
      img: "/assets/icons/general-health6.svg",
    },
  ];

  return (
    <section className="p-4 rounded-xl shadow bg-white">
     <div className="flex items-center justify-between mb-5">
             <div>
               <h2 className="text-xl mb-2 font-semibold text-[var(--primaryDark)]">
                 General Health
               </h2>
               <span className="text-[var(--grayColor)]">Summery</span>
             </div>
             <button className="text-sm flex items-center border border-[#C3D3E2]  text-[var(--primaryDark)] px-4 py-2 rounded-lg">
               <img src={exportt} alt="" className="inline h-6 w-6 mr-2" />
               Export
             </button>
           </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {items.map((c, i) => (
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
