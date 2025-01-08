<script>
import { ref } from "vue";
import * as api from "../API/ServerApi.js";
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

export default {
  name: "RegisterPanel",
  setup() {
    const toast = useToast();
    const name= ref("");
    const email = ref("");
    const password = ref("");
    const confirmPassword = ref("");
    const error = ref("");
    const router = useRouter(); 

    const validateInputs = () => {
      if (!name.value) {
        error.value = "Name is required.";
        return false;
      }
      if (!email.value) {
        error.value = "Email is required.";
        return false;
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value)) {
        error.value = "Invalid email format.";
        return false;
      }
      if (!password.value) {
        error.value = "Password is required.";
        return false;
      }
      if (password.value.length < 6) {
        error.value = "Password must be at least 6 characters long.";
        return false;
      }
      if (password.value !== confirmPassword.value) {
        error.value = "Passwords do not match.";
        return false;
      }
      return true;
    };
    
    const handleRegister = async () => {
      if (!validateInputs()) {
        return;
      }
      try {
        await api.registerUser(name.value, email.value, password.value);
        toast.success("Registration successful!");
        router.push("/login");
        error.value = "";
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          error.value = err.response.data.message;
        } else {
          error.value = "Registration failed. Please try again.";
        }
      }
    };

    return {
      name,
      email,
      password,
      confirmPassword,
      error,
      handleRegister,
    };
  },
};
</script>



  

  <template>
    <v-container class="d-flex justify-center align-center" style="height: 85vh;">
      <v-card class="pa-5 rounded-lg" width="350" elevation="5" color="grey-lighten-4">
        <v-card-title class="text-h5" style="text-align: center;">Register</v-card-title>
        <v-form @submit.prevent="handleRegister">
          <v-text-field
            v-model="name"
            label="Name"
            type="name"
            class="mb-4 no-underline"
            variant="outlined"
            rounded
            
          />
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
          <v-text-field
            v-model="confirmPassword"
            label="Password"
            type="password"
            class="mb-4  no-underline"
            rounded
            variant="outlined"
          />
          <v-btn type="submit" color="green"  >Register</v-btn>
          <v-card-text>
            <router-link to="/login">Already have account?<br><b>Login here.</b></router-link>
          </v-card-text>
        </v-form>
        <v-alert v-if="error" type="error" class="mt-5" dense>
          {{ error }}
        </v-alert>
      </v-card>
    </v-container>
  </template>
  
 
  
  <style scoped>
  
  </style>
  