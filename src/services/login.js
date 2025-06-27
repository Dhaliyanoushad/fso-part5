import axios from "axios";
const baseUrl = "/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  } catch (error) {
    // Network or timeout error
    if (!error.response) {
      throw new Error("Network error. Please check your connection.");
    }

    // Server responded but with an error status
    const status = error.response.status;

    if (status === 400) {
      throw new Error("Bad Request: Missing or invalid fields.");
    } else if (status === 401) {
      throw new Error("Unauthorized: Invalid username or password.");
    } else if (status === 500) {
      throw new Error("Server error. Please try again later.");
    } else {
      // Fallback for other statuses
      throw new Error(
        `Unexpected error (${status}): ${
          error.response.data.error || "Something went wrong."
        }`
      );
    }
  }
};

export default { login };
