import { FunctionComponent } from "react";

type ButtonProps = {
  buttonText: string;
};

const FormButton: FunctionComponent<ButtonProps> = ({ buttonText }) => {
  return (
    <button
      onClick={() => {}}
      className="bg-bright-red w-full py-3 rounded-lg font-light mt-10 mb-6"
    >
      {buttonText}
    </button>
  );
};

export default FormButton;
