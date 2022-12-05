import ExitIcon from "./ExitIcon";
import IconButton from "./IconButton";

interface IBasicDialogProps {
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
}
export default function BasicDialog(props: IBasicDialogProps) {
  console.log("Basic Dialog");
  const { open, onClose } = props;
  if (!open) {
    return <></>;
  }
  return (
    <div className="flex justify-center items-center">
      <div className="fixed top-24 z-50 overflow-auto bg-smoke-light flex m-4">
        <div className="relative px-8 py-6 bg-gray-100 w-full max-w-md m-auto flex-col flex rounded-lg">
          <div>{props.children}</div>
          <span className="absolute -top-1 right-0">
            <IconButton onClick={() => onClose()}>
              <ExitIcon />
            </IconButton>
          </span>
        </div>
      </div>
    </div>
  );
}
