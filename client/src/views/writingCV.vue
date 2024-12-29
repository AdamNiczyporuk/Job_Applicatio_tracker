<script>




  
  export default {
    name: 'WritingCV',
    setup() {

      return {
        
      };
    },
  };
  </script>



<template >
  <v-container  class=" justify-center align-center">
  <v-card-title class="text-white" style="margin-top:-5vh">
        <h2>Writing CV</h2>
      </v-card-title>
  <v-container>
    <v-card class="rounded-lg mx-auto"  color="grey-darken-3"  width="75vw" style="overflow: auto;">
      <v-text-field 
        label="Job Title" 
        variant="outlined" 
        rounded    
        class="mt-4 text-white ml-5" max-width="25vw">
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
  </v-container> 
</template>
  
  
<style scoped>

</style>
  