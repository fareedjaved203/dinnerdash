import getCookie from "./getCookie";

const token = getCookie("token");

const requestHeader = (contentType = "application/json") => {
  const config = {
    headers: {
      "Content-Type": contentType,
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
};

export default requestHeader;
