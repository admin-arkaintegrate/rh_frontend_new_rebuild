import React, { useMemo } from "react";
import Table from "../../../components/shared/Table";
import edit from "/src/assets/icons/edit.svg";
import done from "/src/assets/icons/done.svg";

export default function Routing({
  stores = [],
  doctors = [],
  loading = { stores: false, doctors: false },
  error = { stores: "", doctors: "" },
  patientType = "all",
}) {

  const getStoreCount = (row) => {
    const med = Number(row?.med_cap ?? 0);
    const priv = Number(row?.priv_cap ?? 0);
    if (patientType === "tele_med") return med;
    if (patientType === "tele_priv") return priv;
    return med + priv; // all
  };

  const storesData = useMemo(
    () =>
      (Array.isArray(stores) ? stores : []).map((s, idx) => ({
        id: s.id ?? idx + 1,
        name: s.pharmacy ?? "N/A",
        card: getStoreCount(s),
        action: getStoreCount(s) > 0 ? "success" : "edit",
      })),
    [stores, patientType]
  );

  const doctorsData = useMemo(
    () =>
      (Array.isArray(doctors) ? doctors : []).map((d, idx) => ({
        id: d.user_id ?? idx + 1,
        name: d.first_name || d.last_name ? `${d.first_name ?? ""} ${d.last_name ?? ""}`.trim() : d.username ?? "N/A",
        card: Number(d.doc_cap ?? 0),
        action: Number(d.doc_cap ?? 0) > 0 ? "success" : "edit",
      })),
    [doctors]
  );

  const renderAction = (type) =>
    type === "success" ? (
      <img src={done} className="w-6 h-6 mx-auto" />
    ) : (
      <img src={edit} className="w-6 h-6  mx-auto" />
    );

  const baseCols = (nameHeader) => [
    {
      header: "#",
      accessorKey: "id",
      size: 60,
      cell: (info) => info.row.index + 1,
    },
    {
      header: nameHeader,
      accessorKey: "name",
      size: 260,
      cell: (info) => info.getValue(),
    },
    {
      header: "Count",
      accessorKey: "card",
      size: 120,
      cell: (info) => info.getValue(),
    },
    {
      header: "Action",
      accessorKey: "action",
      size: 100,
      cell: (info) => renderAction(info.getValue()),
    },
  ];

  const storeColumns = useMemo(() => baseCols("Store name"), []);
  const doctorColumns = useMemo(() => baseCols("Doctor name"), []);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Stores */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Routing Stores</h3>
        </div>

        {loading.stores ? (
          <div className="h-48 rounded-xl bg-gray-100 animate-pulse" />
        ) : error.stores ? (
          <div className="text-red-600">{error.stores}</div>
        ) : (
          <Table columns={storeColumns} data={storesData} />
        )}
      </div>

      {/* Doctors */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Routing Doctors</h3>
        </div>

        {loading.doctors ? (
          <div className="h-48 rounded-xl bg-gray-100 animate-pulse" />
        ) : error.doctors ? (
          <div className="text-red-600">{error.doctors}</div>
        ) : (
          <Table columns={doctorColumns} data={doctorsData} />
        )}
      </div>
    </section>
  );
}
