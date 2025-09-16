import React, { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import Header from "../../components/common/Header";
import DocReporting from "./components/DocReporting";
import GeneralHealth from "./components/GeneralHealth";
import Distribution from "./components/Distribution";
import Routing from "./components/Routing";
import { getDocReporting } from "../../services/dashboard/dashboard";

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

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // كل ما الفلاتر تتغير، اكتبها في الـ URL
  useEffect(() => {
    writeFiltersToURL(filters);
  }, [filters]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getDocReporting(
        filters.startDate,
        filters.endDate,
        filters.patientTypes
      );
      setReport(data);
    } catch (e) {
      setError(e?.message || "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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

      <DocReporting data={report} loading={loading} error={error} />

      <GeneralHealth />
      <Distribution />
      <Routing />
    </div>
  );
}
