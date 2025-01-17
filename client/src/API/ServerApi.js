import axios from "axios";

export const fetchApplications = (token) => {
  return axios.get('http://localhost:5000/applications', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const fetchApplicationById = (id) => {
  return axios.get(`http://localhost:5000/applications/${id}`);
}


export const addApplication = (name, link,phoneNumber, token) => {
  return axios.post('http://localhost:5000/applications', { name, link,phoneNumber}, {
    headers:
    {
      Authorization: `Bearer ${token}`
    }
  });
};

export const fetchAplllicationsByUserId = (userid) => {
  return axios.get(`http://localhost:5000/applications?userid=${userid}`);
}



export const deleteApplication = (id) => {
  return axios.delete(`http://localhost:5000/applications/${id}`);
}

export const updateApplication = (id, data, token) => {
  return axios.put(`http://localhost:5000/applications/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateUserProfile = (data, token) => {
  return axios.put('http://localhost:5000/user', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const loginUser = (email, password) => {
  return axios.post('http://localhost:5000/login', { email, password });
};

export const registerUser = (name, email, password) => {
  return axios.post('http://localhost:5000/register', { name, email, password });
};

export const GetUserByID = (token) => {
  return axios.get('http://localhost:5000/user', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};


export const verifyToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return Promise.reject('No token found');
  }

  return axios.post('http://localhost:5000/verify-token', {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
}


export async function generateCV(userData) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:5000/generate-cv', userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.cvText;
  } catch (error) {
    console.error("Error generating CV:", error);
    throw error;
  }
}