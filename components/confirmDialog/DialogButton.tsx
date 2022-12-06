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
      className={`text-xs bg-red-400 hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2.5 border border-gray-400 rounded shadow ${className}`}
      type={type}
      onClick={onClick}>
      {children}
    </button>
  );
}
