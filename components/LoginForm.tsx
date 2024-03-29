import { useState } from "react";
import React, { FunctionComponent } from "react";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import Link from "next/link";
import { signInUser } from "../lib/firebase";

const defaultFormFields = {
  email: "",
  password: "",
};

const LoginForm: FunctionComponent<{}> = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formError, setFormError] = useState("");

  const { email, password } = formFields;
  const handleChange: any = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit: any = async (event: any) => {
    event.preventDefault();

    if (email === "" || password === "") {
      setFormError("All fields are required.");
      return;
    }

    try {
      return await signInUser(email, password);
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          setFormError("Incorrect password for this email address.");
          break;
        case "auth/user-not-found":
          setFormError("No user associated with this email.");
          break;
        case "auth/invalid-email":
          setFormError("Email address is invalid.");
          break;
        default:
          setFormError(error);
      }
    }
  };

  return (
    <div className="bg-semi-dark-blue p-8 w-11/12 md:w-7/12 lg:w-4/12 flex flex-col justify-center">
      <h1 className="text-3xl font-light">Login</h1>
      {formError && (
        <span className="font-light text-md bg-bright-red/70 text-white p-3 mt-3">
          {formError}
        </span>
      )}
      <div className="mt-2 mb-5">
        <FormInput
          handleChange={handleChange}
          placeholder="Email address"
          type="text"
          name="email"
          value={email}
        />
        <FormInput
          handleChange={handleChange}
          placeholder="Password"
          type="password"
          name="password"
          value={password}
        />
        <FormButton buttonText="Login to your account" onClick={handleSubmit} />

        <span className="font-light block text-center">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up">
            <a className="text-bright-red">Sign Up</a>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
