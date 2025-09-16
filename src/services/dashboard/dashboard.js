import api from "../api";
//// Doctor Reporting /////
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
//// General Health /////
export async function getGeneralHealth(startDate, endDate, patientTypes) {
  try {
    const response = await api(`dashboard/general-health/`, {
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
//// Distribution Pharmacy /////
export async function getDistributionPharmacy(startDate, endDate, patientTypes) {
  try {
    const response = await api(`dashboard/distribution-routing/`, {
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

//// Distribution Doctor /////
export async function getDistributionDoctor(startDate, endDate, patientTypes) {
  try {
    const response = await api(`dashboard/doctor-distribution/`, {
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

//// Store Routing /////
export async function getStoreRouting() {
    try {
        const response = await api(`dashboard/store-routing/`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch stats" + error);
    }
}

//// Doc Routing /////
export async function getDocRouting() {
    try {
        const response = await api(`dashboard/doc-routing/`);

        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch stats" + error);
    }
}