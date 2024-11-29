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


<template>
    <div style="text-align: center; margin: 50px;">
      <h1>Register</h1>
  
      <!-- Input fields for email and password -->
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
  
      <!-- Register button -->
      <button @click="handleRegister" style="padding: 10px;">Register</button>
  
      <!-- Error message if registration fails -->
      <p v-if="error" style="color: red;">{{ error }}</p>
    </div>
  </template>
  
 
  
  <style scoped>
  /* Stylizacja komponentu (opcjonalnie) */
  </style>
  