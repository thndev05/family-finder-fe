import apiClient from "./apiClient";

const jsonHeaders = {
  headers: {
    "Content-Type": "application/json"
  }
};

const buildFormData = (imageFile, metadata) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  formData.append("metadata", JSON.stringify(metadata));
  return formData;
};

export const uploadMissingPerson = async ({ imageFile, metadata }) => {
  if (!imageFile) {
    throw new Error("Vui lòng chọn ảnh cần tải lên.");
  }

  const formData = buildFormData(imageFile, metadata);

  const response = await apiClient.post("/api/v1/upload/missing", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data;
};

export const uploadFoundPerson = async ({ imageFile, metadata }) => {
  if (!imageFile) {
    throw new Error("Vui lòng chọn ảnh cần tải lên.");
  }

  const formData = buildFormData(imageFile, metadata);

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

