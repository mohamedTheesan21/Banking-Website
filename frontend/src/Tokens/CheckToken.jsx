import { jwtDecode } from "jwt-decode";

// Check if token is expired
const isTokenExpired = (token) => {
  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000; // Convert current time to seconds
  return decodedToken.exp < currentTime;
};

const checkToken = (tokenName) => {
  const token = localStorage.getItem(tokenName);
  if (token){
    if (isTokenExpired(token)) {
        // Token is expired, remove it from localStorage
        localStorage.removeItem("transferData");
        localStorage.removeItem(tokenName);
        console.log();
        console.log("Token expired, removed from localStorage");
      }
  }
};
export { checkToken };
