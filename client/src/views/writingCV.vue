<script>
import { ref,reactive } from 'vue';
import { useRouter } from 'vue-router';
import { generateCV } from '@/API/GptAPI.js'; 

  export default {
    name: 'WritingCV',
    setup() {
      const router = useRouter();
      const cvText = ref('');
      const showForm = ref(true);
      const PromptData = reactive({
        name: '',
        surname: '',
        email: '',
        jobTitle: '',
        company: '',
        reqExperience: '',
        jobDescription: '',
      })
      
      const getCV = async() =>
      { 
        cvText.value = await generateCV(PromptData);
        console.log("Generated CV:\n",cvText);
      }//Naprawa wyświetlania Cv 
       
  

      const logout = () => {
      localStorage.removeItem('token');
      window.location.reload();
    };

    const routeHome = () => {
    router.push("/home");
    }; 
    


      return {
        logout,
        routeHome,
        getCV,
        cvText,
        PromptData

      };
    },
  };
  </script>



<template >
  <v-row>
    <v-col class="d-flex justify-start ml-5" style="margin-top: -40px;">
      <v-btn @click="routeHome" size="large" variant="outlined" color="green" text>Back</v-btn>
    </v-col>
    <v-col class="d-flex justify-end mr-5" style="margin-top: -40px;">
      <v-btn @click="logout" size="large" variant="outlined" color="red" text>Logout</v-btn>
    </v-col>
  </v-row>
  <v-row>
  <v-container  class="d-flex justify-center">
    <v-card class="rounded-lg mx-auto"  color="grey-darken-3"  width="75vw" >
      <v-card-title class="text-white ">
        <h2>Fill Data to Generate CV</h2>
      </v-card-title>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
          v-model="PromptData.name"
            label="Name" 
            variant="outlined" 
            rounded    
            class="text-white ml-5" >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field 
          v-model="PromptData.surname"
            label="Surname" 
            variant="outlined" 
            rounded
            class="mr-5  text-white">
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field 
          v-model="PromptData.email"
            label="Mail" 
            variant="outlined" 
            rounded
            class="mr-5  text-white">
          </v-text-field>
        </v-col>
    </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field 
          v-model="PromptData.jobTitle"
            label="Job Title" 
            variant="outlined" 
            rounded    
            class="text-white ml-5" >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field 
          v-model="PromptData.company"
            label="Company name" 
            variant="outlined" 
            rounded
            class="mr-5  text-white">
          </v-text-field>
        </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12">
        <v-textarea 
        v-model="PromptData.jobDescription"
        label="Job description"
        rows="3"
        maxlength="700"
        counter
        rounded
        auto-grow
        variant="outlined"
        class="mx-5 text-white"
        ></v-textarea>
    </v-col>
  </v-row>
  <v-row> 
    <v-col cols="12" md="12">
        <v-textarea
        v-model="PromptData.reqExperience"
        label="Required Experience"
        rows="2"
        maxlength="500"
        counter
        auto-grow
        rounded
        variant="outlined"
        class=" mx-5 text-white"
      ></v-textarea>
    </v-col>
  </v-row>
    <v-card-actions>
      <v-btn 
      color="green" 
      variant="outlined"
      class="mx-auto"
      @click="getCV"
      >Generate CV</v-btn>
    </v-card-actions> 
    <v-card-text v-if="cvText">
          <pre>{{ cvText }}</pre>  <!--Naprawa wyświetlania Cv-->
      </v-card-text>  
  </v-card>
</v-container>
</v-row>
</template>
  
  
<style scoped>

</style>
  