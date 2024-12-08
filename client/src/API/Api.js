import axios from "axios";




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


export const addApplication = (name,link,token) => 
{ 
    return axios.post('http://localhost:5000/applications',{name,link},{
        headers: 
        { 
            Authorization : `Bearer ${token}`
        }
    });
};

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

export const registerUser = (name,email, password) => {
    return axios.post('http://localhost:5000/register', {name,email, password });
};

export const GetUserByID  = (id) => { 
    return axios.get(`http://localhost:5000/users/${id}`);
} 


export const verifyToken = () => { 
    const token = localStorage.getItem('token');
   if(!token){
       return Promise.reject('No token found');
   }

   return axios.post('http://localhost:5000/verify-token', {}, {
       headers: { Authorization: `Bearer ${token}` },
   });
}