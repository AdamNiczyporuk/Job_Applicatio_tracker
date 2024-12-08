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
       const router = useRouter(); 

      
      const handleLogin = async () => 
    {
      api.loginUser(email.value,password.value)
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token); // Zapisz token JWT w localStorage
        router.push('/home'); // Przekieruj na stronę główną
      })
      
    }
        // Add Handling errors in handleLogidn



      // const handleLogin = async () => {
      //   try {
      //     const response = await api.loginUser(email.value, password.value);
      //     console.log(response.data);
      //     const { token } = response.data;
      //     const { userId } = response.data;
      //     localStorage.setItem('userId', userId); 
      //     localStorage.setItem('token', token); // Zapisz token w localStorage
      //     alert('Login successful!');
      //     error.value = ''; // Zresetuj ewentualny błąd
      //     router.push('/home'); // Przenieś użytkownika do strony głównej
      //   } catch (err) {
      //     error.value = 'Login failed. Please try again.'; // Ustaw błąd, jeśli coś poszło nie tak
      //   }
      // };
  
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
          <router-link to="/register">Don't have an account?<br>Register here.</router-link>
        </v-card-text>
      </v-form>
      <v-alert v-if="error" type="error" class="mt-4" dense>
        {{ error }}
      </v-alert>
    </v-card>
  </v-container>
</template>
  
  
<style scoped>

</style>
  