/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AppSnackBar, AppSnackHandler, InitAlert } from "../../components/AppSnack/AppSnackBar";
import { createRef, Fragment, memo, useEffect } from "react";
import { ConfirmAction, ConfirmActionComponent, ConfirmActionHandler } from "../ConfirmAction/ConfirmAction";

export const RegisterGlobalLayout = memo(() => {
  const snackBarRef = createRef<AppSnackHandler>();
  const confirmRef = createRef<ConfirmActionHandler>();
  useEffect(() => {
    //@ts-ignore
    InitAlert.register(snackBarRef);
    //@ts-ignore
    ConfirmAction.register(confirmRef);
  }, [snackBarRef, confirmRef])
  return (
    <Fragment>
      <AppSnackBar ref={snackBarRef} />
      <ConfirmActionComponent ref={confirmRef} />
    </Fragment>
  )
})