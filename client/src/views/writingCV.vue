<script>
import { ref,reactive } from 'vue';
import { useRouter } from 'vue-router';
import { generateCV } from '@/API/GptAPI.js'; 

  export default {
    name: 'WritingCV',
    setup() {
      const router = useRouter();
      const cvText = ref('');
      const isLoading = ref(false);
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
        if (!PromptData.name || !PromptData.surname || !PromptData.email || !PromptData.jobTitle || !PromptData.company || !PromptData.jobDescription || !PromptData.reqExperience) {
        toast.error("Please fill in all required fields.");
        return;
        }
        showForm.value = false;
        isLoading.value = true;
        try
        {
          cvText.value = await generateCV(PromptData);
          console.log("Generated CV:\n",cvText);
        } 
        catch (error) 
        {
          console.log(error)
        }
        finally 
        {
          isLoading.value = false;
        }
    };
       
  

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
        PromptData,
        showForm,
        isLoading

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
  <v-container  class="justify-center">
    <v-card class="rounded-lg"  color="grey-darken-3"  width="75vw" min-height="400px" >
      <div v-if="isLoading" class="d-flex justify-center align-center" height="100px">
        <v-progress-circular
          indeterminate
          color="green"
          :size="50"
        ></v-progress-circular>
      </div>
      <template v-else>
      <v-card-title v-if="showForm" class="text-white ">
        <h2>Fill Data to Generate CV</h2>
      </v-card-title>
      <v-row v-if="showForm">
        <v-col cols="12" md="4">
          <v-text-field
          id="name-input"
          v-model="PromptData.name"
            label="Name" 
            variant="outlined" 
            rounded
            required    
            class="text-white ml-5" >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field 
            id="surname-input"
          v-model="PromptData.surname"
            label="Surname" 
            variant="outlined"
            required 
            rounded
            class="mr-5  text-white">
          </v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field 
            id="mail-input"
          v-model="PromptData.email"
            label="Mail" 
            required
            variant="outlined" 
            rounded
            class="mr-5  text-white">
          </v-text-field>
        </v-col>
    </v-row>
      <v-row v-if="showForm">
        <v-col cols="12" md="6">
          <v-text-field 
            id="job-tiitle-input"
            required
          v-model="PromptData.jobTitle"
            label="Job Title" 
            variant="outlined" 
            rounded    
            class="text-white ml-5" >
          </v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field 
            id="company-name-input"
          v-model="PromptData.company"
            label="Company name" 
            variant="outlined" 
            rounded
            required
            class="mr-5  text-white">
          </v-text-field>
        </v-col>
    </v-row>
    <v-row v-if="showForm">
      <v-col cols="12" md="12">
        <v-textarea
        id="job-description-input" 
        v-model="PromptData.jobDescription"
        label="Job description"
        rows="3"
        required
        maxlength="700"
        counter
        rounded
        auto-grow
        variant="outlined"
        class="mx-5 text-white"
        ></v-textarea>
    </v-col>
  </v-row>
  <v-row v-if="showForm"> 
    <v-col cols="12" md="12">
        <v-textarea
        id="req-experience-input"
        v-model="PromptData.reqExperience"
        label="Required Experience"
        rows="2"
        maxlength="500"
        counter
        auto-grow
        required
        rounded
        variant="outlined"
        class=" mx-5 text-white"
      ></v-textarea>
    </v-col>
  </v-row>
    <v-card-actions v-if="showForm">
      <v-btn 
      color="green" 
      variant="outlined"
      class="mx-auto"
      @click="getCV"
      >Generate CV</v-btn>
    </v-card-actions> 
    </template>
    <v-card-text v-if="!showForm">
          <pre>{{ cvText }}</pre>  
    </v-card-text>  
  </v-card>
</v-container>
</v-row>
</template>
  
  
<style scoped>

</style>
  