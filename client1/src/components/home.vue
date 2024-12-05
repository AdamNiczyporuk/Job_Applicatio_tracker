<script>
import { ref, onMounted } from "vue";
import * as api from "../API/Api.js";

export default {
  name: "HomePanel",
  setup() {
    // Reactive variables for managing the state
    const links = ref([]);
    const newLink = ref('');
    const name = ref('');
   

   
    onMounted(() => {
      const token = localStorage.getItem('token');
      if (token) {
        api.fetchApplications(token)
          .then(response => {
            links.value = response.data;
          })
          .catch(error => console.error("Error fetching data:", error));
      }
    });

  

    
    const addLink = () => {
  if (newLink.value.trim()) {
    const token = localStorage.getItem('token');
    if (token) {
      api.addApplication(name.value, newLink.value, token)
        .then(() => {
          api.fetchApplications(token)
            .then(response => {
              links.value = response.data;
            })
            .catch(error => console.error("Error fetching updated data:", error));
          newLink.value = ''; // Reset input after adding link
        })
        .catch(error => console.error("Error adding link:", error));
    }
  }
};


    // Delete an application
    const deleteLink = (id) => {
      api.deleteApplication(id)
        .then(() => {
          const token = localStorage.getItem('token'); 
          api.fetchApplications(token)
            .then(response => {
              links.value = response.data;
            })
            .catch(error => console.error("Error fetching updated data:", error));
        })
        .catch(error => {
          console.error("Error deleting application:", error);
          alert("Failed to delete the application!");
        });
    };
        //sFetch applications when component mounts
    

    return {
      links,
      newLink,
      name,
      addLink,
      deleteLink,
    };
  },
};
</script>


<template>
    <div class="home" style="text-align: center; margin: 50px; height: 100vh;">
      <h1>Job Application Tracker</h1>
      <h2>Total Applications: {{ links.length }}</h2>
  
      <!-- Input fields for adding a new application -->
      <input
        type="text"
        v-model="name"
        placeholder="Name of application"
        style="padding: 10px; width: 200px; margin-right: 2px;"
      />
      <input
        type="text"
        v-model="newLink"
        placeholder="Enter application link"
        style="padding: 10px; width: 300px;"
      />
      <button @click="addLink" style="margin-left: 10px; padding: 10px;">Add Link</button>
  
      <!-- Displaying the list of applications
      <ul style="margin-top: 20px; list-style: none;">
        <li v-for="item in links" :key="item.id">
          <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.name }}</a>
          <button @click="deleteLink(item.id)" style="margin-left: 10px;">Delete</button>
        </li>
      </ul> -->
      <v-table
    fixed-header
  >
    <thead>
      <tr>
        <th class="text-left">
          Id
        </th>
        <th class="text-left">
          Name
        </th>
        <th class="text-left">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="item in links" 
        :key="item.id"
      >
        <td class="text-left">{{ item.id }}</td>
        <td class="text-left">{{ item.name }}</td>
        <td class="text-left"> <button @click="deleteLink(item.id)" style="margin-left: 10px;">Delete</button></td>
      </tr>
    </tbody>
  </v-table>
    </div> 
  </template>
  
 
  
  <style scoped>
  /* Dodatkowa stylizacja (opcjonalnie) */
  </style>
  