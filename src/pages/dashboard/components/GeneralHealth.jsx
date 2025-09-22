import React from "react";
import exportt from "/src/assets/icons/export.svg";
import generalHealth1 from "/src/assets/icons/general-health1.svg";
import generalHealth2 from "/src/assets/icons/general-health2.svg";
import generalHealth3 from "/src/assets/icons/general-health3.svg";
import generalHealth4 from "/src/assets/icons/general-health4.svg";
import generalHealth5 from "/src/assets/icons/general-health5.svg";
import generalHealth6 from "/src/assets/icons/general-health6.svg";

export default function GeneralHealth({ data, loading, error }) {

  const vals = {
    calls_received: data?.calls_received ?? 0,
    routed_to_doctor: data?.routed_to_doctor ?? 0,
    insurance_verified: data?.insurance_verified ?? 0,
    consulted: data?.consulted ?? 0,
    erx_denied: data?.erx_denied ?? 0,
    erx_sent: data?.erx_sent ?? 0,
  };


  const items = [
    {
      title: "Call received",
      value: vals.calls_received,
      color: "bg-[#DBEAFE]",
      img: generalHealth1,
      percentage: undefined,
    },
    {
      title: "Routed to doctor",
      value: vals.routed_to_doctor,
      color: "bg-[#D3ECF8]",
      img: generalHealth2,
      percentage: undefined,
    },
    {
      title: "Insurance Verified",
      value: vals.insurance_verified,
      color: "bg-[#F3E8FF]",
      img: generalHealth3,
      percentage: undefined,
    },
    {
      title: "Consulted",
      value: vals.consulted,
      color: "bg-[#FEF8DD]",
      img: generalHealth4,
      percentage: undefined,
    },
    {
      title: "ERX denied",
      value: vals.erx_denied,
      color: "bg-[#F9D8D9]",
      img: generalHealth5,
      percentage: undefined,
    },
    {
      title: "ERX sent",
      value: vals.erx_sent,
      color: "bg-[#AEAEAE33]",
      img: generalHealth6,
      percentage: undefined,
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
        <button className="text-sm flex items-center border border-[#C3D3E2] text-[var(--primaryDark)] px-4 py-2 rounded-lg">
          <img src={exportt} alt="" className="inline h-6 w-6 mr-2" />
          Export
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="p-4 rounded-xl bg-gray-100 animate-pulse h-28" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {items.map((c, i) => (
            <div key={i} className={`${c.color} p-4 rounded-xl shadow-sm flex flex-col`}>
              <img src={c.img} alt="" className="h-9 w-9 mb-2" />
              <span className="text-2xl font-bold">{c.value}</span>
              <span className="font-medium text-gray-600">{c.title}</span>
            
              {typeof c.percentage === "number" && (
                <span className="text-sm font-medium text-[var(--blue)]">
                  {c.percentage}%
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
