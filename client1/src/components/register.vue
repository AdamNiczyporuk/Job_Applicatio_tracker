<script>
import { ref } from "vue";
import * as api from "../API/Api.js";

export default {
  name: "RegisterPanel",
  setup() {
    // Reactive variables for form fields and error handling
    const email = ref("");
    const password = ref("");
    const error = ref("");

    // Handle registration logic
    const handleRegister = async () => {
      try {
        await api.registerUser(email.value, password.value);
        alert("Registration successful!");
        error.value = ""; // Reset the error message
      } catch (err) {
        error.value = "Registration failed. Please try again."; // Set error message
      }
    };

    return {
      email,
      password,
      error,
      handleRegister,
    };
  },
};
</script>


<!-- <template>
    <div style="text-align: center; margin: 50px;">
      <h1>Register</h1>
  
      
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        style="padding: 10px; width: 300px; margin-bottom: 10px;"
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        style="padding: 10px; width: 300px; margin-bottom: 10px;"
      />
  
      
      <button @click="handleRegister" style="padding: 10px;">Register</button>
  
     
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </template> -->
  

  <template>
    <v-container class="d-flex justify-center align-center">
      <v-card class="pa-5 rounded-lg" width="300" elevation="5" color="grey-lighten-4">
        <v-card-title class="text-h5" style="text-align: center;">Register</v-card-title>
        <v-form @submit.prevent="handleRegister">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            class="mb-4 no-underline"
            variant="outlined"
            rounded
            
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            class="mb-4  no-underline"
            rounded
            variant="outlined"
          />
          <v-btn type="submit" color="green"  >Register</v-btn>
          <v-card-text>
            <router-link to="/login">Already have account?<br>Login here.</router-link>
          </v-card-text>
        </v-form>
        <v-alert v-if="error" type="error" class="mt-4" dense>
          {{ error }}
        </v-alert>
      </v-card>
    </v-container>
  </template>
  
 
  
  <style scoped>
  /* Stylizacja komponentu (opcjonalnie) */
  </style>
  