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

//// Edit Store Routing /////
export async function EditStoreRouting(pharmacyId, { med_cap, priv_cap }) {
    try {
        const payload = {};
        if (med_cap !== undefined) payload.med_cap = Number(med_cap);
        if (priv_cap !== undefined) payload.priv_cap = Number(priv_cap);

        const response = await api.patch(`dashboard/pharmacy/${pharmacyId}/caps`, payload);
        return response.data;
    } catch (error) {
        throw new Error(`Failed to update caps for pharmacy ${pharmacyId}: ` + error);
    }
}

//// Edit Doctor Routing /////
export async function EditDoctorRouting(doctorId, { doc_cap }) {
  try {
    const payload = {};
    if (doc_cap !== undefined) payload.doc_cap = Number(doc_cap);

    const response = await api.patch(`dashboard/doctor/${doctorId}/cap`, payload);
    return response.data;
  } catch (error) {
    throw new Error(`Failed to update caps for doctor ${doctorId}: ` + error);
  }
}

