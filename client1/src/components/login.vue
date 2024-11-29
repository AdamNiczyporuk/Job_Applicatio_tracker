<script>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router'; // Do obsługi nawigacji
  import * as api from "../API/Api.js";

  export default {
    name: 'LoginPanel',
    setup() {
      const email = ref('');
      const password = ref('');
      const error = ref('');
      const router = useRouter(); // Używamy Vue Router do nawigacji
  
      const handleLogin = async () => {
        try {
          const response = await api.loginUser(email.value, password.value);
          const { token } = response.data;
          localStorage.setItem('token', token); // Zapisz token w localStorage
          alert('Login successful!');
          error.value = ''; // Zresetuj ewentualny błąd
          router.push('/home'); // Przenieś użytkownika do strony głównej
        } catch (err) {
          error.value = 'Login failed. Please try again.'; // Ustaw błąd, jeśli coś poszło nie tak
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
    <v-container class="d-flex justify-center align-center" style="height: 100vh;">
      <v-card class="pa-5" max-width="400px" elevation="2">
        <v-card-title class="text-h5" style="text-align: center;">Login</v-card-title>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="Email"
            type="email"
            class="mb-4"
          />
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            class="mb-4"
          />
          <v-btn type="submit" color="primary" block>Login</v-btn>
        </v-form>
        <v-alert v-if="error" type="error" class="mt-4" dense>
          {{ error }}
        </v-alert>
      </v-card>
    </v-container>
  </template>
  
  
  <style scoped>
  .login {
  max-width: 400px;
  margin: auto;
}
  </style>
  