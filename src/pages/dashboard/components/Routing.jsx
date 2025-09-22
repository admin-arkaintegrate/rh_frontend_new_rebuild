import React, { useMemo, useState, useEffect } from "react";
import Table from "../../../components/shared/Table";
import editIcon from "/src/assets/icons/edit.svg";
import doneIcon from "/src/assets/icons/done.svg";
import {
  EditStoreRouting,
  EditDoctorRouting,
} from "../../../services/dashboard/dashboard";

export default function Routing({
  stores = [],
  doctors = [],
  loading = { stores: false, doctors: false },
  error = { stores: "", doctors: "" },
}) {
  /* -------------------- STORES -------------------- */
  const [storesLocal, setStoresLocal] = useState(stores);
  useEffect(() => setStoresLocal(stores), [stores]);

  const [editingStoreId, setEditingStoreId] = useState(null);
  const [editingStoreField, setEditingStoreField] = useState(null); // "tele_med" | "tele_priv"
  const [draftStoreCaps, setDraftStoreCaps] = useState({
    tele_med: "0",
    tele_priv: "0",
  });
  const [savingStore, setSavingStore] = useState(false);

  const startEditStore = (row, field = "tele_med") => {
    setEditingStoreId(row.id);
    setEditingStoreField(field);
    setDraftStoreCaps({
      tele_med: String(row.tele_med ?? 0),
      tele_priv: String(row.tele_priv ?? 0),
    });
  };

  const clamp10 = (s) =>
    String(s ?? "")
      .replace(/\D/g, "")
      .slice(0, 10);

  const applySaveStore = async (row) => {
    try {
      setSavingStore(true);
      const medVal = Math.max(0, Number(draftStoreCaps.tele_med) || 0);
      const privVal = Math.max(0, Number(draftStoreCaps.tele_priv) || 0);

      await EditStoreRouting(row.id, { med_cap: medVal, priv_cap: privVal });

      setStoresLocal((prev) =>
        prev.map((s) =>
          s.id === row.id ? { ...s, med_cap: medVal, priv_cap: privVal } : s
        )
      );

      setEditingStoreId(null);
      setEditingStoreField(null);
    } catch (e) {
      console.error(e);
    } finally {
      setSavingStore(false);
    }
  };

  const storesData = useMemo(
    () =>
      (Array.isArray(storesLocal) ? storesLocal : []).map((s, idx) => ({
        id: s.id ?? idx + 1,
        name: s.pharmacy ?? "N/A",
        tele_med: Number(s?.med_cap ?? 0),
        tele_priv: Number(s?.priv_cap ?? 0),
      })),
    [storesLocal]
  );

  const storeColumns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
        size: 60,
        cell: (info) => info.row.index + 1,
      },
      { header: "Store name", accessorKey: "name", size: 260 },
      {
        header: "Tele med",
        accessorKey: "tele_med",
        size: 140,
        cell: (info) => {
          const row = info.row.original;
          const isEditing = editingStoreId === row.id;
          return isEditing ? (
            <input
              key={`med-${row.id}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              autoFocus={editingStoreField === "tele_med"}
              value={draftStoreCaps.tele_med}
              onChange={(e) =>
                setDraftStoreCaps((d) => ({
                  ...d,
                  tele_med: clamp10(e.target.value),
                }))
              }
              onFocus={() => setEditingStoreField("tele_med")}
              onKeyDown={(e) => {
                if (e.key === "Enter") applySaveStore(row);
                if (e.key === "Escape") {
                  setEditingStoreId(null);
                  setEditingStoreField(null);
                }
              }}
              className="w-24 mx-auto text-center rounded-md border border-[#E7F1FF] bg-white py-1 px-2"
            />
          ) : (
            row.tele_med
          );
        },
      },
      {
        header: "Tele priv",
        accessorKey: "tele_priv",
        size: 140,
        cell: (info) => {
          const row = info.row.original;
          const isEditing = editingStoreId === row.id;
          return isEditing ? (
            <input
              key={`priv-${row.id}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              autoFocus={editingStoreField === "tele_priv"}
              value={draftStoreCaps.tele_priv}
              onChange={(e) =>
                setDraftStoreCaps((d) => ({
                  ...d,
                  tele_priv: clamp10(e.target.value),
                }))
              }
              onFocus={() => setEditingStoreField("tele_priv")}
              onKeyDown={(e) => {
                if (e.key === "Enter") applySaveStore(row);
                if (e.key === "Escape") {
                  setEditingStoreId(null);
                  setEditingStoreField(null);
                }
              }}
              className="w-24 mx-auto text-center rounded-md border border-[#E7F1FF] bg-white py-1 px-2"
            />
          ) : (
            row.tele_priv
          );
        },
      },
      {
        header: "Action",
        accessorKey: "action",
        size: 110,
        cell: (info) => {
          const row = info.row.original;
          const isEditing = editingStoreId === row.id;
          return (
            <div className="flex items-center justify-center gap-2">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={() => applySaveStore(row)}
                    className="mx-auto disabled:opacity-50"
                    disabled={savingStore}
                    title="Save"
                  >
                    <img src={doneIcon} className="w-8 h-8 mx-auto" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => startEditStore(row, "tele_med")}
                  className="mx-auto disabled:opacity-50"
                  disabled={savingStore}
                  title="Edit"
                >
                  <img src={editIcon} className="w-8 h-8 mx-auto" />
                </button>
              )}
            </div>
          );
        },
      },
    ],
    [
      editingStoreId,
      editingStoreField,
      savingStore,
      draftStoreCaps.tele_med,
      draftStoreCaps.tele_priv,
    ]
  );

  /* -------------------- DOCTORS -------------------- */
  const [doctorsLocal, setDoctorsLocal] = useState(doctors);
  useEffect(() => setDoctorsLocal(doctors), [doctors]);

  const [editingDoctorId, setEditingDoctorId] = useState(null);
  const [draftDoctorCount, setDraftDoctorCount] = useState("0");
  const [savingDoctor, setSavingDoctor] = useState(false);

  const startEditDoctor = (row) => {
    setEditingDoctorId(row.id);
    setDraftDoctorCount(String(row.card ?? 0));
  };

  const applySaveDoctor = async (row) => {
    try {
      setSavingDoctor(true);
      const safeVal = Math.max(0, Number(draftDoctorCount) || 0);
      await EditDoctorRouting(row.id, { doc_cap: safeVal });

      setDoctorsLocal((prev) =>
        prev.map((d) => (d.user_id === row.id ? { ...d, doc_cap: safeVal } : d))
      );
      setEditingDoctorId(null);
    } catch (e) {
      console.error(e);
      // TODO: toast
    } finally {
      setSavingDoctor(false);
    }
  };

  const doctorsData = useMemo(
    () =>
      (Array.isArray(doctorsLocal) ? doctorsLocal : []).map((d, idx) => ({
        id: d.user_id ?? idx + 1,
        name:
          d.first_name || d.last_name
            ? `${d.first_name ?? ""} ${d.last_name ?? ""}`.trim()
            : d.username ?? "N/A",
        card: Number(d.doc_cap ?? 0),
      })),
    [doctorsLocal]
  );

  const doctorColumns = useMemo(
    () => [
      {
        header: "#",
        accessorKey: "id",
        size: 60,
        cell: (info) => info.row.index + 1,
      },
      { header: "Doctor name", accessorKey: "name", size: 260 },
      {
        header: "Count",
        accessorKey: "card",
        size: 140,
        cell: (info) => {
          const row = info.row.original;
          const isEditing = editingDoctorId === row.id;
          return isEditing ? (
            <input
              key={`doc-${row.id}`}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={10}
              autoFocus
              value={draftDoctorCount}
              onChange={(e) => setDraftDoctorCount(clamp10(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === "Enter") applySaveDoctor(row);
                if (e.key === "Escape") setEditingDoctorId(null);
              }}
              className="w-24 mx-auto text-center rounded-md border border-[#E7F1FF] bg-white py-1 px-2"
            />
          ) : (
            row.card
          );
        },
      },
      {
        header: "Action",
        accessorKey: "action",
        size: 110,
        cell: (info) => {
          const row = info.row.original;
          const isEditing = editingDoctorId === row.id;
          return (
            <button
              type="button"
              onClick={() =>
                isEditing ? applySaveDoctor(row) : startEditDoctor(row)
              }
              className="mx-auto disabled:opacity-50"
              disabled={savingDoctor}
              title={isEditing ? "Save" : "Edit"}
            >
              <img
                src={isEditing ? doneIcon : editIcon}
                className="w-8 h-8 mx-auto"
              />
            </button>
          );
        },
      },
    ],
    [editingDoctorId, draftDoctorCount, savingDoctor]
  );

  /* -------------------- RENDER -------------------- */
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Stores */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex items-center justify-between my-2">
          <h2 className="text-xl mb-2 font-semibold text-[var(--primaryDark)]  mx-2">
            Routing <span className="text-[#0D6EFD] ml-1">Stores </span>
          </h2>
        </div>
        {loading.stores ? (
          <div className="h-48 rounded-xl bg-gray-100 animate-pulse" />
        ) : error.stores ? (
          <div className="text-red-600">{error.stores}</div>
        ) : (
          <Table
            columns={storeColumns}
            data={storesData}
            onCellDoubleClick={(cell) => {
              const row = cell.row.original;
              if (cell.column.id === "tele_med")
                startEditStore(row, "tele_med");
              if (cell.column.id === "tele_priv")
                startEditStore(row, "tele_priv");
            }}
          />
        )}
      </div>

      {/* Doctors */}
      <div className="bg-white p-4 rounded-xl shadow">
        <div className="flex items-center justify-between my-2">
          <h2 className="text-xl mb-2 font-semibold text-[var(--primaryDark)]  mx-2">
            Routing <span className="text-[#0D6EFD] ml-1">Doctors </span>
          </h2>
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
