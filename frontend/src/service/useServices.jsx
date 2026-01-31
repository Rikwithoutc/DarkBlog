const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

export const postSignIn = async (formData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Response Not Found:", errorData);
      return errorData;
    }
    return await response.json();
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

export const postLogin = async (formData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Response Not Found:", errorData);
      return errorData;
    }
    return await response.json();
  } catch (error) {
    console.error("Error during login:", error);
  }
};

export const getProfile = async () => {
  const response = await fetch(`${BACKEND_URL}/profile`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });

  const user = await response.json();
  return user;
};
