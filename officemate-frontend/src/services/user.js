// import * as usersAPI from "../api/users";
// import { getToken } from "../util/security";

// /* === SIGN UP === */
// export async function signUp(userData) {
//   console.log("service", userData);
//   const token = await usersAPI.signUp(userData);
//   return token;
// }

// /* === GET LOGIN DETAILS === */
// export async function getLoginDetails(email) {
//   console.log("getLoginDetails", email);
//   const loginDetails = await usersAPI.getLoginDetails(email);
//   return loginDetails;
// }

// /* === LOGIN USER === */
// export async function loginUser(userData) {
//   const res = await usersAPI.loginUser(userData);

//   return res;
// }

// /* === LOGOUT USER === */
// export async function logoutUser() {
//   const token = getToken();
//   console.log("parse data", JSON.parse(atob(token.split(".")[1])).payload);
//   if (token) {
//     const res = await usersAPI.logoutUser(
//       token,
//       JSON.parse(atob(token.split(".")[1])).payload
//     );
//     console.log("token", res);
//     localStorage.removeItem("token");
//   }
//   return;
// }

// /* === GET USER === */
// export function getUser() {
//   const token = getToken();
//   return token ? JSON.parse(atob(token.split(".")[1])).payload.user : null;
// }

// /* === GET USER === */
// export function getUserDetails() {
//   const token = getToken();
//   return token ? JSON.parse(atob(token.split(".")[1])).payload : null;
// }

// /* === GET USER === */
// export async function userUpdate(userData) {
//   const data = await usersAPI.userUpdate(userData);
//   return data;
// }
