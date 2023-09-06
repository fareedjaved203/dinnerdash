export const isNameValid = (name, min, max) => {
  return (
    name?.length >= min &&
    name?.length <= max &&
    /\S/.test(name) &&
    !/\s{2,}/.test(name)
  );
};

export const isEmailValid = (email) => {
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const parts = email.split("@");

  return (
    parts.length === 2 &&
    pattern.test(email) &&
    parts[1].split(".").length === 2
  );
};

export const isPasswordValid = (password) => {
  return password.length >= 8 && !/\s/.test(password);
};

export const createFormData = (data) => {
  const myForm = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    myForm.set(key, value);
  });

  return myForm;
};
