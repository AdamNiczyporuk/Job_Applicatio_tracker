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
    const userId = localStorage.getItem('userId');

    // Fetch applications when component mounts
    onMounted(() => {
     
      api.fetchAplllicationsByUserId(userId)
        .then(response => {
          links.value = response.data;
        })
        .catch(error => console.error("Error fetching data:", error));
    });

    // Add a new application
    const addLink = () => {
      if (newLink.value.trim()) {
        api.addApplication(name.value, newLink.value,userId)
          .then(() => {
            api.fetchAplllicationsByUserId(userId)
              .then(response => {
                links.value = response.data;
              })
              .catch(error => console.error("Error fetching updated data:", error));
            newLink.value = ''; // Reset input after adding link
          })
          .catch(error => console.error("Error adding link:", error));
      }
    };

    // Delete an application
    const deleteLink = (id) => {
      api.deleteApplication(id)
        .then(() => {
          api.fetchAppplications()
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
  
      <!-- Displaying the list of applications -->
      <ul style="margin-top: 20px; list-style: none;">
        <li v-for="item in links" :key="item.id">
          <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.name }}</a>
          <button @click="deleteLink(item.id)" style="margin-left: 10px;">Delete</button>
        </li>
      </ul>
    </div>
  </template>
  
 
  
  <style scoped>
  /* Dodatkowa stylizacja (opcjonalnie) */
  </style>
  