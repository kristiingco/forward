import { useState } from "react";
import React, { FunctionComponent } from "react";
import FormInput from "./FormInput";
import FormButton from "./FormButton";
import Link from "next/link";

const defaultFormFields = {
  email: "",
  password: "",
};

const LoginForm: FunctionComponent<{}> = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;
  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="bg-semi-dark-blue p-8 w-11/12 flex flex-col justify-center">
      <h1 className="text-3xl font-light">Login</h1>
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
        <FormButton buttonText="Login to your account" />

        <span className="font-light block text-center">
          Don&apos;t have an account?{" "}
          <Link href="/">
            <a className="text-bright-red">Sign Up</a>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default LoginForm;
