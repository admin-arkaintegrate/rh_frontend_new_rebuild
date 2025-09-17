import React, { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import Header from "../../components/common/Header";
import DocReporting from "./components/DocReporting";
import GeneralHealth from "./components/GeneralHealth";
import Distribution from "./components/Distribution";
import Routing from "./components/Routing";
import {
  getDocReporting,
  getGeneralHealth,
  getDistributionPharmacy,
  getDistributionDoctor,
  getDocRouting,
  getStoreRouting
} from "../../services/dashboard/dashboard";

const TODAY = format(new Date(), "yyyy-MM-dd");

const DEFAULTS = {
  startDate: TODAY,
  endDate: TODAY,
  patientTypes: "all",
};

function readFiltersFromURL() {
  const params = new URLSearchParams(window.location.search);
  const startDate = params.get("start_date") || DEFAULTS.startDate;
  const endDate = params.get("end_date") || DEFAULTS.endDate;
  const patientTypes = params.get("patient_types") || DEFAULTS.patientTypes;
  return { startDate, endDate, patientTypes };
}

function writeFiltersToURL({ startDate, endDate, patientTypes }) {
  const params = new URLSearchParams(window.location.search);
  params.set("start_date", startDate);
  params.set("end_date", endDate);
  params.set("patient_types", patientTypes);
  const qs = params.toString();
  window.history.replaceState(null, "", `${window.location.pathname}?${qs}`);
}

export default function Dashboard() {
  const [filters, setFilters] = useState(() => readFiltersFromURL());

  // DocReporting
  const [report, setReport] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportError, setReportError] = useState("");

  // GeneralHealth
  const [generalHealth, setGeneralHealth] = useState(null);
  const [ghLoading, setGhLoading] = useState(false);
  const [ghError, setGhError] = useState("");

  // Distribution - Doctors
  const [distDoctors, setDistDoctors] = useState(null);
  const [distDocLoading, setDistDocLoading] = useState(false);
  const [distDocError, setDistDocError] = useState("");

  // Distribution - Pharmacy
  const [distPharmacy, setDistPharmacy] = useState(null); 
  const [distPhLoading, setDistPhLoading] = useState(false);
  const [distPhError, setDistPhError] = useState("");

    // Routing – Stores
  const [storesRouting, setStoresRouting] = useState([]);
  const [storesLoading, setStoresLoading] = useState(false);
  const [storesError, setStoresError] = useState("");

  // Routing – Doctors
  const [docsRouting, setDocsRouting] = useState([]);
  const [docsLoading, setDocsLoading] = useState(false);
  const [docsError, setDocsError] = useState("");

  useEffect(() => {
    writeFiltersToURL(filters);
  }, [filters]);

  const fetchAll = useCallback(async () => {
    setReportLoading(true);
    setGhLoading(true);
    setDistDocLoading(true);
    setDistPhLoading(true);
        setStoresLoading(true);
    setDocsLoading(true);

    setReportError("");
    setGhError("");
    setDistDocError("");
    setDistPhError("");
    setStoresError("");
    setDocsError("");

    const tasks = [
      getDocReporting(filters.startDate, filters.endDate, filters.patientTypes),
      getGeneralHealth(filters.startDate, filters.endDate, filters.patientTypes),
      getDistributionDoctor(filters.startDate, filters.endDate, filters.patientTypes),
      getDistributionPharmacy(filters.startDate, filters.endDate, filters.patientTypes),
       getStoreRouting(),
      getDocRouting(),
    ];

      const [docRepRes, ghRes, distDocRes, distPhRes, storeRouteRes, docRouteRes] =
      await Promise.allSettled(tasks);

    // DocReporting
    if (docRepRes.status === "fulfilled") {
      setReport(docRepRes.value);
    } else {
      setReportError(docRepRes.reason?.message || "Failed to fetch stats");
    }
    setReportLoading(false);

    // GeneralHealth
    if (ghRes.status === "fulfilled") {
      setGeneralHealth(ghRes.value);
    } else {
      setGhError(ghRes.reason?.message || "Failed to fetch general health");
    }
    setGhLoading(false);


    if (distDocRes.status === "fulfilled") {
   
      const val = distDocRes.value;
      const arr = Array.isArray(val) ? val : val?.data;
      setDistDoctors(Array.isArray(arr) ? arr : []);
    } else {
      setDistDocError(distDocRes.reason?.message || "Failed to fetch doctors distribution");
    }
    setDistDocLoading(false);

 
    if (distPhRes.status === "fulfilled") {
    
      const val = distPhRes.value;
      const obj = val?.tele_med || val?.tele_priv ? val : val?.data;
      setDistPharmacy(obj || { tele_med: [], tele_priv: [] });
    } else {
      setDistPhError(distPhRes.reason?.message || "Failed to fetch pharmacy distribution");
    }
    setDistPhLoading(false);

        if (storeRouteRes.status === "fulfilled") {
     
      setStoresRouting(Array.isArray(storeRouteRes.value) ? storeRouteRes.value : storeRouteRes.value?.data ?? []);
    } else {
      setStoresError(storeRouteRes.reason?.message || "Failed to fetch store routing");
    }
    setStoresLoading(false);

   
    if (docRouteRes.status === "fulfilled") {
      setDocsRouting(Array.isArray(docRouteRes.value) ? docRouteRes.value : docRouteRes.value?.data ?? []);
    } else {
      setDocsError(docRouteRes.reason?.message || "Failed to fetch doctor routing");
    }
    setDocsLoading(false);
  }, [filters]);
  

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleDateChange = (start, end) => {
    setFilters((prev) => ({
      ...prev,
      startDate: format(start, "yyyy-MM-dd"),
      endDate: format(end, "yyyy-MM-dd"),
    }));
  };

  const handleTypeChange = (key) => {
    setFilters((prev) => ({ ...prev, patientTypes: key || "all" }));
  };

  return (
    <div className="p-3 space-y-6">
      <Header
        onDateChange={handleDateChange}
        onTypeChange={handleTypeChange}
        selectedStartDate={filters.startDate}
        selectedEndDate={filters.endDate}
        selectedType={filters.patientTypes}
      />

      <DocReporting data={report} loading={reportLoading} error={reportError} />

      <GeneralHealth data={generalHealth} loading={ghLoading} error={ghError} />

      <Distribution
        doctorsData={distDoctors}
        pharmacyData={distPharmacy}
        loading={{ doctors: distDocLoading, pharmacy: distPhLoading }}
        error={{ doctors: distDocError, pharmacy: distPhError }}
      />

        <Routing
        stores={storesRouting}
        doctors={docsRouting}
        loading={{ stores: storesLoading, doctors: docsLoading }}
        error={{ stores: storesError, doctors: docsError }}
        patientType={filters.patientTypes} 
      />
    </div>
  );
}
