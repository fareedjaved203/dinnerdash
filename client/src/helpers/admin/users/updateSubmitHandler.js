import { createFormData, isEmailValid } from "./formValidation";

export const updateUserSubmitHandler = (
  e,
  email,
  role,
  alert,
  userId,
  dispatch,
  updateUser
) => {
  e.preventDefault();

  const isEmail = isEmailValid(email);

  if (!isEmail) {
    return alert.error("Invalid Email");
  } else {
    const user = {
      email: email,
      role: role,
    };

    const myForm = createFormData(user);

    dispatch(updateUser(userId, myForm));
    alert.success("Role Updated Successfully");
  }
};
