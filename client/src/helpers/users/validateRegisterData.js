import {
  isNameValid,
  isPasswordValid,
  isEmailValid,
} from "../admin/users/formValidation";

export const validateRegisterData = (
  fullName,
  name,
  email,
  password,
  alert
) => {
  const isFullNameValid = isNameValid(fullName, 4, 32);
  const isDisplayNameValid = isNameValid(name, 2, 32);
  const isEmail = isEmailValid(email);
  const isPassword = isPasswordValid(password);

  if (!isFullNameValid) {
    alert.error("Name Should Contain Atleast 4 Characters");
    return false;
  }
  if (!isDisplayNameValid) {
    alert.error("Name Should Contain Atleast 2 Characters And Must Be Valid");
    return false;
  } else if (!isEmail) {
    alert.error("Invalid Email");
    return false;
  } else if (!isPassword) {
    alert.error("Password must be 8 characters Long");
    return false;
  }

  return true;
};
