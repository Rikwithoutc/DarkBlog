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

export const getAllPosts = async () => {
  const response = await fetch(`${BACKEND_URL}/posts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      credentials: "include",
    },
  });
  return await response.json();
};

export const createPost = async (postData) => {
  try {
    const response = await fetch(`${BACKEND_URL}/create_post`, {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error creating post:", errorData);
      throw new Error(errorData.msg || "Failed to create post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error during post creation:", error);
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/delete_post/${postId}`, {    
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,   
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error deleting post:", errorData);
      throw new Error(errorData.msg || "Failed to delete post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error during post deletion:", error);
  }
};


export const likePost = async (postId) => {
  try {
    const response = await fetch(`${BACKEND_URL}/post/${postId}/like`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error liking post:", errorData);
      throw new Error(errorData.msg || "Failed to like post");
    }
    return await response.json();
  } catch (error) {
    console.error("Error during liking post:", error);
  }
};