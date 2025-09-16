import api from "../api";
export async function getDocReporting(startDate, endDate, patientTypes) {
    try {
    const response = await api(`dashboard/all-doc-reporting/`, {
      params: {
        start_date: startDate,
        end_date: endDate,
        patient_types: patientTypes,
      },
    });
    return response.data.data;
  } catch (error) {
    throw new Error("Failed to fetch stats" + error);
  }
}