import apiClient from "./apiClient";

const jsonHeaders = {
  headers: {
    "Content-Type": "application/json"
  }
};

const buildFormData = (imageFile, metadata, mode) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  
  // Append each metadata field individually (BE expects Form fields, not JSON)
  Object.keys(metadata).forEach((key) => {
    const value = metadata[key];
    // Only append non-empty values (except for required fields)
    if (value !== null && value !== undefined && value !== "") {
      // Convert arrays to comma-separated strings for fields like birthmarks, visible_marks
      if (Array.isArray(value)) {
        formData.append(key, value.join(","));
      } else {
        formData.append(key, value);
      }
    }
  });
  
  return formData;
};

export const uploadMissingPerson = async ({ imageFile, metadata }) => {
  if (!imageFile) {
    throw new Error("Vui lòng chọn ảnh cần tải lên.");
  }

  const formData = buildFormData(imageFile, metadata, "missing");

  const response = await apiClient.post("/api/v1/upload/missing", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data;
};

export const uploadFoundPerson = async ({ imageFile, metadata }) => {
  if (!imageFile) {
    throw new Error("Vui lòng chọn ảnh cần tải lên.");
  }

  const formData = buildFormData(imageFile, metadata, "found");

  const response = await apiClient.post("/api/v1/upload/found", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data;
};

export const searchMissingByCaseId = async (caseId) => {
  const response = await apiClient.get(`/api/v1/search/missing/${caseId}`);
  return response.data;
};

export const searchFoundById = async (foundId) => {
  const response = await apiClient.get(`/api/v1/search/found/${foundId}`);
  return response.data;
};

export const getHealthStatus = async () => {
  const response = await apiClient.get("/health");
  return response.data;
};

export const getApiInfo = async () => {
  const response = await apiClient.get("/");
  return response.data;
};

export const getAllCases = async (limit = 100, type = null) => {
  const params = new URLSearchParams();
  if (limit) params.append("limit", limit);
  if (type) params.append("type", type);
  
  const queryString = params.toString();
  const url = `/api/v1/search/cases/all${queryString ? `?${queryString}` : ""}`;
  
  const response = await apiClient.get(url);
  return response.data;
};

