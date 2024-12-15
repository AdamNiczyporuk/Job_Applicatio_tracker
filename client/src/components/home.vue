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
    const editName = ref('');
    const editNewLink = ref('');
    const token = localStorage.getItem('token');
    const user = ref({});
    const editingId = ref(null);
    const dialog = ref(false);

    const fetchApplications = async () => {
      if (token) {
        try {
          const response = await api.fetchApplications(token);
          links.value = response.data;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    const fetchUser = async () => {
      if (token) {
        try {
          const response = await api.GetUserByID(token);
          user.value = response.data;
          console.log(user.value);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    onMounted(() => {
      fetchApplications();
      fetchUser();
    });

    const updateLink = async () => {
  if (!editName.value.trim() || !editNewLink.value.trim()) {
    alert("Both name and link are required!");
    return;
  }

  if (editingId.value !== null && token) {
    try {
      // Call the API to update the application
      await api.updateApplication(editingId.value, {
        name: editName.value,
        link: editNewLink.value,
      }, token);

      // Fetch the updated list of applications
      const response = await api.fetchApplications(token);
      links.value = response.data;

      // Reset dialog and editing state
      dialog.value = false;
      editingId.value = null;
      editName.value = "";
      editNewLink.value = "";
    } catch (error) {
      console.error("Error updating application:", error);
      alert("Failed to update the application!");
    }
  } else {
    alert("Invalid application ID or token.");
  }
};
    
    
  

    
    const addLink = () => {
  if (newLink.value.trim()) {
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
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        alert('Copied to clipboard');
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    };
    const editLink = (id) =>{
      const application = links.value.find(link => link.id === id);
      if(application){
        editName.value = application.name;
        editNewLink.value = application.link;
        editingId.value = id;
        dialog.value = true;
        }
      };
        
      const logout = () => {
      localStorage.removeItem('token');
      window.location.reload();
    };
    

    return {
      links,
      newLink,
      name,
      user,
      addLink,
      deleteLink,
      copyToClipboard,
      editLink,
      dialog,
      editNewLink,
      editName,
      updateLink,
      logout

    };
  },
};
</script>


<template>
    <v-row>
    <v-col  class="d-flex justify-end mr-5" style="margin-top: -40px;">
      <v-btn @click="logout" size="large" variant="outlined" color="red" text>Logout</v-btn>
    </v-col>
  </v-row>
 <v-container class="home" style="text-align: center; margin: -20px 50px 50px 50px; height: 100vh;">
  <v-row>
    <v-col cols="3">
      <v-card class="pa-5 rounded-lg" elevation="5" color="deep-orange-darken-2" >
              <v-card-title class="text-h5" style="text-align: center;">User Info</v-card-title>
              <v-card-text class="text-white">
                <p class="text-left"><strong>Name:</strong> {{ user.name }}</p>
                <p class="text-left"><strong>Email:</strong> {{user.email}}</p>
                <p v-if="user.github !==''" class="text-left"><strong>GitHub:</strong> {{user.github}}
                  <v-icon size="12"  @click="copyToClipboard(user.github)">mdi-content-copy</v-icon>
                </p>
                <p v-else class="text-left" ><b>Add Github Link !!!!</b></p>
                <p v-if="user.linkedin !==''"  class="text-left"><strong>Linkedin:</strong> {{user.linkedin}}
                <v-icon size="12"  @click="copyToClipboard(user.linkedin)">mdi-content-copy</v-icon>
                </p>
                <v-btn  @click="user_dialog = true" variant="outlined" color="deep-orange-accent-1" class="mt-5">Update Profile</v-btn>
          </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="9">
    <h2 class="font-weight-black text-white ">Job Application Tracker</h2>
        <div class="d-flex justify-center mt-2">
          <v-card width="auto" color="green-accent-4" class="white-glow">
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
          <v-row class="d-flex justify-center mt-1">
            <v-col cols="auto">
              <v-btn variant="outlined" @click="addLink" color="white" >Add Link</v-btn>
            </v-col>
          </v-row>
      </v-conatiner>
      
     
  
    
      <v-card  class="mx-auto my-8 custom-card"
              elevation="10"
              max-width="800" rounded="lg"
              color="grey-darken-4"
              >
        <v-table fixed-header class="custom-card" theme="grey-darken-4" hover = true >
              <thead>
                <tr>
                  <th class="text-center">
                    Id
                  </th>
                  <th class="text-center">
                    Name
                  </th>
                  <th class="text-center">
                    Data Time  
                  </th>
                  <th class="text-center">
                    Action  
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item,index) in links" 
                  :key="item.id"
                >
                  <td class="text-left ">{{ index+1 }}</td>
                  <td class="text-center "><a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.name }}</a></td>
                  <td class="text-center">{{ new Date(item.dataTime).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' }).replace(/\b[a-z]/g,char =>char.toUpperCase())}}</td>
                  <td class="text-center"> 
                    <v-icon size="16" @click="editLink(item.id)" style="margin-right: 10px;">mdi-pencil</v-icon> 
                    <v-icon size="16" @click="deleteLink(item.id)">mdi-delete</v-icon> 
                    
                  </td>
                </tr>
              </tbody>
            </v-table>
      </v-card>
    </v-col>
  </v-row>
  

  <v-dialog v-model="dialog" max-width="500px" >
      <v-card class="rounded-lg">
        <v-card-title class="text-center">
          <span>Edit Application</span>
        </v-card-title>
        <v-card-text style="margin-bottom: -20px;">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field class="text-white" :rules="rules"  hide-details="auto"  variant="outlined" rounded v-model="editName" label="Name of application"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field class="text-white" :rules="rules"  hide-details="auto"  variant="outlined" rounded v-model="editNewLink" label="Enter application link"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mb-5 justify-center">
          <v-btn color="green-accent-4" size="large"  width="70px" @click="updateLink">Save</v-btn>
          <v-btn color="red-accent-4"  size="large"  width="70px" text @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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

.copy-btn {
  min-width: 0;
  padding: 0;
}



</style>
  