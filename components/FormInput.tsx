import { FunctionComponent } from "react";
import { isError } from "util";

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
    <div className="relative">
      {false && (
        <span className="absolute font-light text-sm right-0 top-6 text-bright-red">
          be empty
        </span>
      )}

      <input
        className="bg-transparent text-lg font-light p-5 mr-4 border-b-2 outline-0 border-b-grayish-blue focus:border-b-white  w-full caret-bright-red"
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
