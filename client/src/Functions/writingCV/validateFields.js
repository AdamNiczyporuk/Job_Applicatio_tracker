export function validateFields(PromptData, errors) {
    let isValid = true;
    errors.value = {};
  
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