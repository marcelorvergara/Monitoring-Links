interface IDialogButtonProps {
  children: React.ReactNode;
  type?: "submit" | "button" | "reset";
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
}

export default function DialogButton(props: IDialogButtonProps) {
  const { type = "button", children, onClick, className = "" } = props;
  return (
    <button
      className={`bg-primary hover:bg-primary-light text-white font-bold py-1.5 px-3 rounded focus:outline-none focus:shadow-outline ${className}`}
      type={type}
      onClick={onClick}>
      {children}
    </button>
  );
}
