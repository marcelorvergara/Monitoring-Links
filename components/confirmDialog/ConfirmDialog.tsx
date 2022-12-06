import BasicDialog from "./BasicDialog";
import DialogButton from "./DialogButton";
interface IConfirmDialogProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  onClose: Function;
  onConfirm: Function;
}
export default function ConfirmDialog(props: IConfirmDialogProps) {
  const { open, onClose, title, children, onConfirm } = props;
  if (!open) {
    return <></>;
  }
  return (
    <BasicDialog open={open} onClose={onClose}>
      <h2 className="text-sm text-left my-4">{title}</h2>
      <div>{children}</div>
      <div className="flex justify-end mt-2">
        <div className="p-1">
          <DialogButton
            onClick={() => onClose()}
            className="bg-red-400 hover:bg-red-600">
            No
          </DialogButton>
        </div>
        <div className="p-1">
          <DialogButton
            onClick={() => {
              onClose();
              onConfirm();
            }}
            className="bg-green-400 hover:bg-green-600">
            Yes
          </DialogButton>
        </div>
      </div>
    </BasicDialog>
  );
}
