<script>
  export default {
    name: 'WritingCV',
    setup() {
      const router = useRouter();


      const logout = () => {
      localStorage.removeItem('token');
      window.location.reload();

      conts 
    };

      return {
        logout
      };
    },
  };
  </script>



<template >
  <v-row>
    <v-col class="d-flex justify-start ml-5" style="margin-top: -40px;">
      <v-btn @click="logout" size="large" variant="outlined" color="green" text>Back</v-btn>
    </v-col>
    <v-col class="d-flex justify-end mr-5" style="margin-top: -40px;">
      <v-btn @click="logout" size="large" variant="outlined" color="red" text>Logout</v-btn>
    </v-col>
  </v-row>
  <v-container  class="justify-center align-center" style="margin-top: -6vh;">
    <v-card class="rounded-lg mx-auto"  color="grey-darken-3"  width="75vw" style="overflow: auto;">
      <v-card-title class="text-white ">
        <h2>Fill Data to Generate CV</h2>
      </v-card-title>
      <v-text-field 
        label="Job Title" 
        variant="outlined" 
        rounded    
        class="text-white ml-5" max-width="25vw">
      </v-text-field>
      <v-text-field 
        label="Company name" 
        variant="outlined" 
        rounded
        class="ml-5  text-white" max-width="25vw">
      </v-text-field>
      <v-textarea 
      width="60vw"
      label="Job description"
      maxlength="500"
      rows="3"
      counter
      rounded
      auto-grow
      variant="outlined"
      class="mx-4 mt-2 text-white"
    ></v-textarea>
      <v-textarea
      width="60vw"
      label="Required Experience"
      maxlength="300"
      rows="2"
      counter
      auto-grow
      rounded
      variant="outlined"
      class="mx-4 mt-2 text-white"
    ></v-textarea>
    <v-textarea
      width="60vw"
      label="Key Values of the Company"
      maxlength="200"
      rows="2"
      counter
      auto-grow
      rounded
      variant="outlined"
      class="mx-4 mt-2 text-white"
    ></v-textarea>
    <v-card-actions>
      <v-btn 
      color="green" 
      variant="outlined"
      class="mx-auto">Generate CV</v-btn>
    </v-card-actions>   
    </v-card>
  </v-container>
</template>
  
  
<style scoped>

</style>
  