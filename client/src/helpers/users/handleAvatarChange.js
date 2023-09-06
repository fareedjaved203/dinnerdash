export const handleAvatarChange = (e, setAvatarPreview, setAvatar) => {
  const reader = new FileReader();

  reader.onload = () => {
    if (reader.readyState === 2) {
      setAvatarPreview(reader.result);
      setAvatar(reader.result);
    }
  };

  reader.readAsDataURL(e.target.files[0]);
};
