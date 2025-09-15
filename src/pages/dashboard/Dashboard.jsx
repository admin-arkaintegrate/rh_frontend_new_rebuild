import React from "react";
import DocReporting from "./components/DocReporting";
import GeneralHealth from "./components/GeneralHealth";
import Distribution from "./components/Distribution";
import Routing from "./components/Routing";

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Doc Reporting */}
      <DocReporting />

      {/* General Health */}
      <GeneralHealth />

      {/* Distribution */}
      <Distribution />

      {/* Routing */}
      <Routing />
    </div>
  );
}
