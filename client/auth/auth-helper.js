import { signout } from "./api-auth";

const auth = {
  //Save the JWT credentials that are received from the server on successful sign-in
  authenticate(jwt, cb) {
    //Ensuring this code is running in a browser
    if (typeof window !== "undefined")
      sessionStorage.setItem("jwt", JSON.stringify(jwt));
    /*it executes the callback function that is passed in.
     This callback will allow the component to define actions that should take place after successfully signing in */
    cb();
  },

  //This function will return either the stored credentials or false
  isAuthenticated() {
    if (typeof window == "undefined") return false;

    if (sessionStorage.getItem("jwt"))
      return JSON.parse(sessionStorage.getItem("jwt"));
    else return false;
  },

  /*The passed in cb() function allows the component initiating the signout functionality
 to dictate what should happen after a successful sign-out*/
  clearJWT(cb) {
    if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
    cb();
    signout().then((data) => {
      document.cookie = "t=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
  },
};

export default auth;
