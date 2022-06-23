import { useState } from "react";
import React, { FunctionComponent } from "react";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import Link from "next/link";
import { createUser, createUserDocFromAuth } from "../lib/firebase";

const defaultFormFields = {
  email: "",
  password: "",
  repeatPassword: "",
};

const SignUpForm: FunctionComponent<{}> = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [formError, setFormError] = useState("");

  const { email, password, repeatPassword } = formFields;
  const handleChange: any = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit: any = async (event: any) => {
    event.preventDefault();

    if (email === "" || password === "" || repeatPassword === "") {
      setFormError("All fields are required.");
      return;
    }

    if (password !== repeatPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    try {
      const { user } = await createUser(email, password);

      return await createUserDocFromAuth(user);
    } catch (error: any) {
      switch (error.code) {
        case "auth/email-already-exists":
          setFormError("User already exists.");
          break;
        case "auth/invalid-email":
          setFormError("Email address is invalid.");
          break;
        case "auth/weak-password":
          setFormError("Password should have 6 or more characters.");
          break;
        default:
          setFormError(error);
      }
    }
  };

  return (
    <div className="bg-semi-dark-blue p-8 w-11/12 md:w-7/12 lg:w-4/12 flex flex-col justify-center">
      <h1 className="text-3xl font-light">Sign Up</h1>
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
        <FormInput
          handleChange={handleChange}
          placeholder="Repeat password"
          type="password"
          name="repeatPassword"
          value={repeatPassword}
        />
        <FormButton buttonText="Create an account" onClick={handleSubmit} />

        <span className="font-light block text-center">
          Already have an account?{" "}
          <Link href="/login">
            <a className="text-bright-red">Login</a>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
