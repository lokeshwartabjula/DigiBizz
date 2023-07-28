import React, { lazy, Component } from "react";

const SingUpForm = lazy(() => import("./SignUpForm"));

class SignUpView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usersMap: new Map(),
    };
  }

  onSubmit = async (values) => {
    // Hash the password using SHA-256 (client-side hashing, for educational purposes only)
    const hashedPassword = await this.hashPassword(values.password);

    // Create the user object with the hashed password
    const user = {
      firstName: values.firstName,
      lastName: values.lastName,
      mobileNo: values.mobileNo,
      password: hashedPassword,
    };

    // Save the user object to the usersMap
    const usersMap = this.state.usersMap;
    usersMap.set(values.mobileNo, user);

    // Serialize the usersMap to JSON and save it in local storage
    localStorage.setItem("usersMap", JSON.stringify(Array.from(usersMap)));

    // Update the state with the new usersMap
    this.setState({ usersMap });

    // Alert to indicate successful registration
    alert("Registration successful!");
    localStorage.setItem("userAuthenticated", true);
    // window.location.href = "/home";
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
            <h4 className="text-center">Sign Up</h4>
            <SingUpForm onSubmit={this.onSubmit} />
          </div>
          <div className="col-md-3 p-3"></div>
        </div>
      </div>
    );
  }
}

export default SignUpView;
