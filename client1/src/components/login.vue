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
    <div class="login" style="text-align: center; margin: 50px; height: 100vh;">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin" style="display: flex; flex-direction: column; align-items: center;">
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
        <button type="submit" style="padding: 10px;">Login</button>
      </form>
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </template>
  
  
  
  <style scoped>
  /* Stylizacja komponentu */
  </style>
  