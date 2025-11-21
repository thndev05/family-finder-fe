/**
 * Parse backend validation errors into user-friendly Vietnamese messages
 */

const fieldLabels = {
  case_id: "Mã hồ sơ",
  found_id: "Mã hồ sơ",
  name: "Họ và tên",
  age_at_disappearance: "Tuổi khi mất tích",
  year_disappeared: "Năm mất tích",
  current_age_estimate: "Độ tuổi hiện tại",
  gender: "Giới tính",
  location_last_seen: "Địa điểm cuối cùng",
  current_location: "Địa điểm hiện tại",
  contact: "Liên hệ gia đình",
  finder_contact: "Liên hệ người tìm thấy",
  description: "Mô tả bổ sung"
};

const errorMessages = {
  missing: "Vui lòng điền trường này",
  int_parsing: "Vui lòng nhập số hợp lệ",
  string_too_short: "Nội dung quá ngắn",
  value_error: "Giá trị không hợp lệ",
  type_error: "Kiểu dữ liệu không đúng"
};

export function parseValidationError(error) {
  // If error is already a string, return it
  if (typeof error === "string") {
    return error;
  }

  // Handle axios error response
  const errorData = error?.response?.data || error?.data || error;
  const detail = errorData?.detail;

  // If detail is a string, return it
  if (typeof detail === "string") {
    return detail;
  }

  // If detail is an array (Pydantic validation errors)
  if (Array.isArray(detail)) {
    const messages = detail.map((err) => {
      const field = err.loc?.[err.loc.length - 1] || err.field || "trường này";
      const fieldLabel = fieldLabels[field] || field;
      const errorType = err.type || "";

      // Map error types to Vietnamese messages
      let message = errorMessages[errorType] || err.msg || "Có lỗi xảy ra";

      // Special handling for specific errors
      if (errorType === "missing") {
        message = `Vui lòng điền ${fieldLabel.toLowerCase()}`;
      } else if (errorType === "int_parsing") {
        message = `${fieldLabel} phải là số hợp lệ`;
      } else if (errorType === "string_too_short") {
        message = `${fieldLabel} quá ngắn. Vui lòng nhập ít nhất ${err.ctx?.min_length || 3} ký tự`;
      } else {
        message = `${fieldLabel}: ${message}`;
      }

      return `• ${message}`;
    });

    return messages.length > 0
      ? `Vui lòng kiểm tra lại:\n${messages.join("\n")}`
      : "Có lỗi xảy ra khi xử lý dữ liệu";
  }

  // Fallback to generic message
  return errorData?.message || error?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.";
}

