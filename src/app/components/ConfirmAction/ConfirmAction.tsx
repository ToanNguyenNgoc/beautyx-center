/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Button, Dialog } from "@mui/material";
import { createRef, forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface ConfirmActionOptions {
  message?: string;
  callBack?: () => void;
}
export interface ConfirmActionHandler {
  open: (options?: ConfirmActionOptions) => void;
}

export class ConfirmAction {
  //@ts-ignore
  private static confirmRef: React.RefObject<ConfirmActionHandler> = createRef();

  static register(ref: React.RefObject<ConfirmActionHandler>) {
    this.confirmRef = ref;
  }

  static open(options?: ConfirmActionOptions) {
    this.confirmRef.current?.open(options);
  }
}

export type ConfirmActionProps = object;

export const ConfirmActionComponent = forwardRef<ConfirmActionHandler, ConfirmActionProps>((_props, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const callBackRef = useRef<(() => void) | null>(null);

  useImperativeHandle(ref, () => ({
    open: (options) => {
      setOpen(true);
      setMessage(options?.message || 'Bạn có muốn xóa không ?');
      callBackRef.current = options?.callBack || null;
    },
  }));

  const onAccept = () => {
    if (callBackRef.current) {
      callBackRef.current();
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <div className="p-6" style={{ width: '25vw' }}>
        <h3 className="fw-bold text-center">Thông báo</h3>
        <p className="text-center">{message}</p>
        <div className="w-100 d-flex justify-content-center mt-3">
          <Button variant="contained" color="inherit" className="m-2" onClick={() => setOpen(false)}>
            Hủy
          </Button>
          <Button onClick={onAccept} variant="contained" color="success" className="m-2">
            Xác nhận
          </Button>
        </div>
      </div>
    </Dialog>
  );
});
