import { FunctionComponent } from "react";

type ButtonProps = {
  buttonText: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

const FormButton: FunctionComponent<ButtonProps> = ({
  buttonText,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-bright-red w-full py-3 rounded-lg font-light mt-10 mb-6"
    >
      {buttonText}
    </button>
  );
};

export default FormButton;
