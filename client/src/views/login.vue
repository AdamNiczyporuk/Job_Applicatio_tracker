<script>
  import { ref } from 'vue';
   import { useRouter } from 'vue-router';
  import * as api from "../API/ServerApi.js";


  
  export default {
    name: 'LoginPanel',
    setup() {
      const email = ref('');
      const password = ref('');
      const error = ref('');
      const router = useRouter(); 

      const validateInputs = () => {
      if (!email.value) {
        error.value = "Email is required.";
        return false;
      }
      if (!password.value) {
        error.value = "Password is required.";
        return false;
      }
      return true;
    };

    const handleLogin = async () => {
      if (!validateInputs()) {
        return;
      }
      try {
        const response = await api.loginUser(email.value, password.value);
       localStorage.setItem('token', response.data.token);
        router.push("/home");
        error.value = "";
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          error.value = err.response.data.message;
        } else {
          error.value = "Login failed. Please try again.";
          console.log(err);
        }
      }
    };
      return {
        email,
        password,
        error,
        handleLogin,
      };
    },
  };
  </script>
<template>
  <v-container class="d-flex justify-center align-center"  style="height: 75vh;">
    <v-card class="pa-5 rounded-lg" width="300" elevation="5" color="grey-lighten-4">
      <v-card-title class="text-h5" style="text-align: center;">Login</v-card-title>
      <v-form @submit.prevent="handleLogin">
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
        <v-btn type="submit" color="green"  >Login</v-btn>
        <v-card-text>
          <router-link to="/register">Don't have an account?<br><b>Register here.</b></router-link>
        </v-card-text>
      </v-form>
      <v-alert v-if="error" type="error" class="mt-4 dense text-center" :icon="false">
        {{ error }}
      </v-alert>
    </v-card>
  </v-container>
</template>
  
  
<style scoped>

</style>
  