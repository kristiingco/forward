import { useState } from "react";
import React, { FunctionComponent } from "react";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import Link from "next/link";

const defaultFormFields = {
  email: "",
  password: "",
  repeatPassword: "",
};

const SignUpForm: FunctionComponent<{}> = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password, repeatPassword } = formFields;
  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="bg-semi-dark-blue p-8 w-11/12 flex flex-col justify-center">
      <h1 className="text-3xl font-light">Sign Up</h1>
      <div className="my-5">
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
          name="password"
          value={repeatPassword}
        />
        <FormButton buttonText="Create an account" />

        <span className="font-light block text-center">
          Already have an account?{" "}
          <Link href="/">
            <a className="text-bright-red">Login</a>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
