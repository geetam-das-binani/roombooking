const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/register`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const login = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const loadUser = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/me`, {
    credentials: "include",
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
};

export const logout = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/logout`, {
    method: "POST",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export const getAllRooms = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/rooms`, {});
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const getSingleRoomDetailsById = async (roomId) => {
  const response = await fetch(
    `${API_BASE_URL}/api/v1/single-room/${roomId}`,
    {}
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const makeBooking = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/create-booking`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const getMyBookings = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/my-bookings`, {
    credentials: "include",
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const getAllUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/allUsers`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const getAllRoomsAdmin = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/all-rooms`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const getAllBookingsAdmin = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/all-bookings`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
export const getAllAvailableRoomsAdmin = async () => {
  const response = await fetch(`${API_BASE_URL}/api/v1/available-rooms`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const addRoomAdmin = async (formdata) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/create-room`, {
    credentials: "include",
    body: formdata,
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const getDasboardStats = async (formdata) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/stats`, {
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const updateRoomAdmin = async (formData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/update-room`, {
    credentials: "include",
    body: formData,
    method: "POST",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
