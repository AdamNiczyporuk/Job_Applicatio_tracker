export function validateFields(PromptData, errors) {
    let isValid = true;
    errors.value = {};
  
    if (!PromptData.name) {
      errors.value.name = "Name is required";
      isValid = false;
    }
    if (!PromptData.surname) {
      errors.value.surname = "Surname is required";
      isValid = false;
    }
    if (!PromptData.email) {
      errors.value.email = "Email is required";
      isValid = false;
    }
    if (!PromptData.jobTitle) {
      errors.value.jobTitle = "Job Title is required";
      isValid = false;
    }
    if (!PromptData.company) {
      errors.value.company = "Company name is required";
      isValid = false;
    }
    if (!PromptData.jobDescription) {
      errors.value.jobDescription = "Job Description is required";
      isValid = false;
    }
    if (!PromptData.reqExperience) {
      errors.value.reqExperience = "Required Experience is required";
      isValid = false;
    }
    return isValid;
  }