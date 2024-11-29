import axios from "axios";



// export const fetchAppplications = () =>
// {
//     return axios.get('http://localhost:5000/applications'); 
// };

export const fetchApplications = (token) => {
    return axios.get('http://localhost:5000/applications', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };

export const fetchApplicationById = (id) =>
{
    return axios.get(`http://localhost:5000/applications/${id}`);
}

export const addApplication = (name, link,userid) =>
{
    return axios.post('http://localhost:5000/applications', {name, link,userid});
}

export const fetchAplllicationsByUserId = (userid) =>
{
    return axios.get(`http://localhost:5000/applications?userid=${userid}`);
}



export const deleteApplication = (id) =>
{
    return axios.delete(`http://localhost:5000/applications/${id}`);
} 

export const updateApplication = (id, name, link) =>
{
    return axios.put(`http://localhost:5000/applications/${id}`, {name, link});
}


export const loginUser = (email, password) => {
    return axios.post('http://localhost:5000/login', { email, password });
};

export const registerUser = (email, password) => {
    return axios.post('http://localhost:5000/register', { email, password });
};

export const verifyToken = () => { 
    const token = localStorage.getItem('token');
   if(!token){
       return Promise.reject('No token found');
   }

   return axios.post('http://localhost:5000/verify-token', {}, {
       headers: { Authorization: `Bearer ${token}` },
   });
}