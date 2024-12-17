<script>
import { ref, onMounted, watch} from "vue";
import * as api from "../API/Api.js";
import { useToast } from "vue-toastification";

export default {
  name: "HomePanel",
  setup() {
    // Reactive variables for managing the state
    const toast = useToast();
    const links = ref([]);
    var filteredLinks = ref([]);
    const newLink = ref('');
    const name = ref('');
    const editName = ref('');
    const editNewLink = ref('');
    const editUserName = ref('');
    const editUserEmail = ref('');
    const editUserGithub = ref('');
    const editUserLinkedin = ref('');
    const token = localStorage.getItem('token');
    const user = ref({});
    const editingId = ref(null);
    const dialog = ref(false);
    const user_dialog = ref(false);
    const sortBy = ref('name');
    const sortOrder = ref('desc');
    const searchQuery = ref('');

    const fetchApplications = async () => {
      if (token) {
        try {
          const response = await api.fetchApplications(token);
          links.value = response.data;
          filteredLinks.value = links.value; 
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error('Failed to fetch applications.');
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
          toast.error('Failed to fetch user data.');
        }
      }
    };
    
   
watch(searchQuery, (newQuery) => {
  console.log('searchQuery:', newQuery);
  filteredLinks.value = links.value.filter(link => 
    link.name.toLowerCase().includes(newQuery.toLowerCase())
  );
  console.log('filteredLinks:', filteredLinks.value);
});

    const checkLoginDate = () => {
      const lastLoginDate = localStorage.getItem('lastLoginDate');
      const today = new Date().toISOString().split('T')[0];

      if (lastLoginDate === today) {
        const randomChoice = Math.random() < 0.5;
        if (randomChoice || links.value.length === 0) {
          toast.success("Hello loser, you still don't have a job!", {
            toastClassName: "my-custom-toast-class",
            bodyClassName: ["custom-class-1"],
          });
        } else {
          toast.success(`${links.value.length} applications and still without job?!`, {
            toastClassName: "my-custom-toast-class",
            bodyClassName: ["custom-class-1"]
          });
        }
      } else {
        toast.info('Welcome to the Job Application Tracker!', {
          toastClassName: "my-custom-toast-class",
          bodyClassName: ["custom-class-1"],

        });
        localStorage.setItem('lastLoginDate', today);

      }
    };

    onMounted(async () => {
      await fetchApplications();
      await fetchUser();
      checkLoginDate();

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
          toast.error('Failed to update link.', {
            toastClassName: "my-custom-toast-class",
            bodyClassName: ["custom-class-1"]
          });
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
              newLink.value = '';
              toast.success('Link added successfully!', {
                toastClassName: "my-custom-toast-class",
                bodyClassName: ["custom-class-1"]
              });
            })
            .catch(error => {
              console.error('Error adding link:', error);
              toast.error('Failed to add link.', {
                toastClassName: "my-custom-toast-class",
                bodyClassName: ["custom-class-1"]
              });
            });
        }
      }
    };


  
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
          toast.error('Failed to delete the application.', {
            toastClassName: "my-custom-toast-class",
            bodyClassName: ["custom-class-1"]
          });
        });
    };
    const copyToClipboard = (text) => {
      navigator.clipboard.writeText(text).then(() => {
        toast.success('Copied to clipboard', {
          toastClassName: "my-custom-toast-class",
          bodyClassName: ["custom-class-1"]
        });
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    };
    const editLink = (id) => {
      const application = links.value.find(link => link.id === id);
      if (application) {
        editName.value = application.name;
        editNewLink.value = application.link;
        editingId.value = id;
        dialog.value = true;
      }
    };

    const editUserData = () => {
      editUserName.value = user.value.name;
      editUserEmail.value = user.value.email;
      editUserGithub.value = user.value.github;
      editUserLinkedin.value = user.value.linkedin;
      user_dialog.value = true;
    };

    const logout = () => {
      localStorage.removeItem('token');
      window.location.reload();
    };

    const sortByName = () => {
      if (sortBy.value === 'name') {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortBy.value = 'name';
        sortOrder.value = 'desc';
      }
      sortLinks();
    };

    const sortByDate = () => {
      if (sortBy.value === 'date') {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortBy.value = 'date';
        sortOrder.value = 'asc';
      }
      sortLinks();
    };

    const sortLinks = () => {
      filteredLinks.value.sort((a, b) => {
        let result = 0;
        if (sortBy.value === 'name') {
          result = a.name.localeCompare(b.name);
        } else if (sortBy.value === 'date') {
          result = new Date(a.dataTime) - new Date(b.dataTime);
        }
        return sortOrder.value === 'desc' ? result : -result;

      });
    };
    const updateUser = async () => {
      if (token) {
        try {
          await api.updateUserProfile({
            name: editUserName.value,
            email: editUserEmail.value,
            github: editUserGithub.value,
            linkedin: editUserLinkedin.value
          }, token);

          
          await fetchUser();

        
          user_dialog.value = false;

          toast.success('User profile updated successfully!', {
            toastClassName: "my-custom-toast-class",
            bodyClassName: ["custom-class-1"]
          });
        } catch (error) {
          console.error("Error updating user profile:", error);
          toast.error('Failed to update user profile.', {
            toastClassName: "my-custom-toast-class",
            bodyClassName: ["custom-class-1"]
          });
        }
      } else {
        alert("Invalid token.");
      }
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
      logout,
      user_dialog,
      editUserData,
      editUserName,
      editUserEmail,
      editUserGithub,
      editUserLinkedin,
      updateUser,
      sortByName,
      sortByDate,
      filteredLinks,
      searchQuery,
 
    };
  },
};
</script>


<template>
  <v-row>
    <v-col class="d-flex justify-end mr-5" style="margin-top: -40px;">
      <v-btn @click="logout" size="large" variant="outlined" color="red" text>Logout</v-btn>
    </v-col>
  </v-row>
  <v-container class="home" style="text-align: center; margin: -20px 50px 50px 50px; height: 100vh;">
    <v-row>
      <v-col cols="3">
        <v-card class="pa-5 rounded-lg" elevation="5" color="deep-orange-darken-2">
          <v-card-title class="text-h5" style="text-align: center;">User Info</v-card-title>
          <v-card-text class="text-white">
            <p class="text-left"><strong>Name:</strong> {{ user.name }}</p>
            <p class="text-left"><strong>Email:</strong> {{ user.email }}</p>
            <p v-if="user.github !== ''" class="text-left"><strong>GitHub:</strong> {{ user.github }}
              <v-icon size="12" @click="copyToClipboard(user.github)">mdi-content-copy</v-icon>
            </p>
            <p v-else class="text-left"><b>Add Github Link</b></p>
            <p v-if="user.linkedin !== ''" class="text-left"><strong>Linkedin:</strong> {{ user.linkedin }}
              <v-icon size="12" @click="copyToClipboard(user.linkedin)">mdi-content-copy</v-icon>
            </p>
            <p v-else class="text-left"><b>Add LinkedIn Link</b></p>
            <v-btn @click="editUserData" variant="outlined" color="white" class="mt-5">Update Profile</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="9">
        <h2 class="font-weight-black text-white ">Job Application Tracker</h2>
        <div class="d-flex justify-center mt-2">
          <v-card width="auto" color="green-accent-4" class="white-glow">
            <v-card-text class="text-h6 text-white">
              Total Applications: {{ links.length }}
            </v-card-text>
          </v-card>
        </div>
        <v-conatiner class="mx-10 align-center justify-center ">
          <v-row class="d-flex align-center justify-center">
            <v-col cols="4" class="pr-1">
              <v-text-field class="text-white" :rules="rules" v-model="name" hide-details="auto"
                label="Name of application" variant="outlined" rounded>
              </v-text-field>
            </v-col>
            <v-col cols="6" class="pl-1">
              <v-text-field class="text-white" v-model="newLink" :rules="rules" hide-details="auto"
                label="Enter application link" variant="outlined" rounded>
              </v-text-field>
            </v-col>
          </v-row>
          <v-row class="d-flex justify-center mt-1">
            <v-col cols="auto">
              <v-btn variant="outlined" @click="addLink" color="white">Add Link</v-btn>
            </v-col>
          </v-row>
        </v-conatiner>

        <v-card class="mx-auto my-8 custom-card" max-width="900">
          <v-text-field v-model="searchQuery" label="Search Applications" variant="outlined" rounded
            class="mx-4 mt-4"></v-text-field></v-card>

        <v-card class="mx-auto
         my-8 custom-card" elevation="10" max-width="900" rounded="lg" color="grey-darken-4">

          <v-table fixed-header class="custom-card" theme="grey-darken-4" hover=true>
            <thead>
              <tr>
                <th class="text-center">
                  Id
                </th>
                <th class="text-center">
                  Name <v-icon size="16" @click="sortByName">mdi-sort</v-icon>
                </th>
                <th class="text-center">
                  Data Time <v-icon size="16" @click="sortByDate">mdi-sort</v-icon>
                </th>
                <th class="text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in filteredLinks" :key="item.id">
                <td class="text-center ">{{ index + 1 }}</td>
                <td class="text-center "><a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.name
                    }}</a></td>
                <td class="text-center">{{ new Date(item.dataTime).toLocaleDateString('pl-PL', {
                  year: 'numeric', month:
                    'long', day: 'numeric'
                }).replace(/\b[a-z]/g, char => char.toUpperCase())}}</td>
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

    <v-dialog v-model="user_dialog" max-width="500px">
      <v-card class="rounded-lg">
        <v-card-title class="text-center mt-3">
          <b>Update User</b>
        </v-card-title>
        <v-card-text style="margin-bottom: -20px; margin-top: -20px;">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field class="text-white" :rules="rules" hide-details="auto" variant="outlined" rounded
                  v-model="editUserName" label="Name"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field class="text-white" :rules="rules" hide-details="auto" variant="outlined" rounded
                  v-model="editUserEmail" label="Mail"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field class="text-white" :rules="rules" hide-details="auto" variant="outlined" rounded
                  v-model="editUserGithub" label="Github Link"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field class="text-white" :rules="rules" hide-details="auto" variant="outlined" rounded
                  v-model="editUserLinkedin" label="LinkedIn Link"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mb-5 justify-center">
          <v-btn color="green-accent-4" size="large" width="70px" @click="updateUser">Save</v-btn>
          <v-btn color="red-accent-4" size="large" width="70px" text @click="user_dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card class="rounded-lg">
        <v-card-title class="text-center">
          <span>Edit Application</span>
        </v-card-title>
        <v-card-text style="margin-bottom: -20px;">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field class="text-white" :rules="rules" hide-details="auto" variant="outlined" rounded
                  v-model="editName" label="Name of application"></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field class="text-white" :rules="rules" hide-details="auto" variant="outlined" rounded
                  v-model="editNewLink" label="Enter application link"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mb-5 justify-center">
          <v-btn color="green-accent-4" size="large" width="70px" @click="updateLink">Save</v-btn>
          <v-btn color="red-accent-4" size="large" width="70px" text @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>



<style>
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


.Vue-Toastification__toast-body.custom-class-1 {
  font-size: 15px;
}
</style>