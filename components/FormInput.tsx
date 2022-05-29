import { FunctionComponent } from "react";

type FormInputProps = {
  handleChange: (event: any) => void;
  placeholder: string;
  type: string;
  name: string;
  value: string;
};

const FormInput: FunctionComponent<FormInputProps> = ({
  handleChange,
  placeholder,
  type,
  name,
  value,
}: FormInputProps) => {
  return (
    <div className="">
      <input
        className="bg-transparent text-lg font-light p-5 mr-4 border-b-2 outline-0 border-b-grayish-blue w-full"
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        autoComplete="off"
      />
    </div>
  );
};

export default FormInput;
