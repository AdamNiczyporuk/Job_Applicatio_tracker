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
 <v-container class="home" style="text-align: center; margin: 0px 50px 50px 50px; height: 100vh;">
  <v-row>
    <v-col cols="3">  
      <v-card class="pa-5 rounded-lg" elevation="5" color="grey-darken-4" >
              <v-card-title class="text-h5" style="text-align: center;">User Info</v-card-title>
              <v-card-text class="text-white">
                <p><strong>Name:</strong>Marek</p>
                <p><strong>Email:</strong> Franek</p>
          </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="9">
    <h2 class="font-weight-black text-white ">Job Application Tracker</h2>
        <div class="d-flex justify-center mt-2">
          <v-card width="auto" color="grey-darken-4" class="white-glow">
            <v-card-text  class="text-h6 text-white">
              Total Applications: {{ links.length }}
            </v-card-text>
          </v-card>
        </div>
      <v-conatiner class="mx-10 align-center justify-center ">
        <v-row class="d-flex align-center justify-center">
              <v-col cols="4" class="pr-1">
                <v-text-field
                class="text-white"
                :rules="rules"
                v-model="name"
                hide-details="auto"
                label="Name of application"
                variant="outlined"
                rounded
                >
              </v-text-field>
            </v-col>
            <v-col cols="6" class="pl-1">
              <v-text-field
                class="text-white"
                v-model="newLink"
                :rules="rules"
                hide-details="auto"
                label="Enter application link"
                variant="outlined"
                rounded
                >
              </v-text-field>
            </v-col>
          </v-row>
          <v-btn variant="outlined" @click="addLink" color="white"  class="mt-5">Add Link</v-btn>
      </v-conatiner>
      
     
  
    
      <v-card  class="mx-auto my-8 custom-card"
              elevation="10"
              max-width="800" rounded="lg"
              color="grey-darken-4"
              >
        <v-table fixed-header class="custom-card" theme="grey-darken-4" hover = true >
              <thead>
                <tr>
                  <th class="text-left">
                    Id
                  </th>
                  <th class="text-center ">
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
                  <td class="text-left ">{{ item.id }}</td>
                  <td class="text-center "><a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.name }}</a></td>
                  <td class="text-left t"> <button @click="deleteLink(item.id)" style="margin-left: 10px;">Delete</button></td>
                </tr>
              </tbody>
            </v-table>
      </v-card>
    </v-col>
  </v-row>
 </v-container> 
  </template>
  
 
  
  <style >
body {
  background-color: #212121;
  color: #ffffff;
}
a {
  text-decoration: none;
  color: inherit;
}

a:visited {
  color: inherit;
}




  </style>
  