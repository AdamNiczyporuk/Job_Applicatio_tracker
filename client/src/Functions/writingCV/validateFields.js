export function validateFields(PromptData, errors) {
    let isValid = true;
    errors.value = {};
  
    if (!PromptData.name) {
      errors.name = "Name is required";
      isValid = false;
    }
    if (!PromptData.surname) {
      errors.surname = "Surname is required";
      isValid = false;
    }
    if (!PromptData.email) {
      errors.email = "Email is required";
      isValid = false;
    }
    if (!PromptData.jobTitle) {
      errors.jobTitle = "Job Title is required";
      isValid = false;
    }
    if (!PromptData.company) {
      errors.company = "Company name is required";
      isValid = false;
    }
    if (!PromptData.jobDescription) {
      errors.jobDescription = "Job Description is required";
      isValid = false;
    }
    if (!PromptData.reqExperience) {
      errors.reqExperience = "Required Experience is required";
      isValid = false;
    }
    return isValid;
  }