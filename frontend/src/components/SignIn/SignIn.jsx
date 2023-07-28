import React, { lazy, Component } from "react";
const SignInForm = lazy(() => import("./SignInForm"));

class SignInView extends Component {
    onSubmit = async (values) => {
        const storedUsersMap = localStorage.getItem("usersMap");
    
        if (storedUsersMap) {
          const usersMap = new Map(JSON.parse(storedUsersMap));
          const user = usersMap.get(values.mobileNo);
    
          if (user) {
            // Hash the password using SHA-256 (client-side hashing, for educational purposes only)
            const hashedPassword = await this.hashPassword(values.password);
    
            if (user.password === hashedPassword) {
              alert("Sign In successful!");
              localStorage.setItem("userAuthenticated", true);
              //change the path to home
              // this.props.history.push("/home");
              // window.location.href = "/home";
              // history.push("/home");
            } else {
              alert("Invalid credentials. Please try again.");
            }
          } else {
            alert("User not found. Please sign up first.");
          }
        } else {
          alert("No registered users found. Please sign up first.");
        }
      };
    
      hashPassword = async (password) => {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
      };
    
    
  render() {
    return (
      <div className="container my-3">
        <div className="row border">
          <div className="col-md-3 p-3"></div>
          <div className="col-md-6 p-3">
            <h4 className="text-center">Sign In</h4>
            <SignInForm onSubmit={this.onSubmit} />
          </div>
          <div className="col-md-3 p-3"></div>
        </div>
      </div>
    );
  }
}

export default SignInView;
