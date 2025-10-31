/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AppSnackBar, AppSnackHandler, InitAlert } from "../../components/AppSnack/AppSnackBar";
import { createRef, Fragment, memo, useEffect } from "react";
import { ConfirmAction, ConfirmActionComponent, ConfirmActionHandler } from "../ConfirmAction/ConfirmAction";
import { Loading, LoadScreen, LoadScreenHandle } from "../LoadingPage/LoadingPage";

export const RegisterGlobalLayout = memo(() => {
  const snackBarRef = createRef<AppSnackHandler>();
  const confirmRef = createRef<ConfirmActionHandler>();
  const loaderRef = createRef<LoadScreenHandle>();
  useEffect(() => {
    //@ts-ignore
    InitAlert.register(snackBarRef);
    //@ts-ignore
    ConfirmAction.register(confirmRef);
    //@ts-ignore
    Loading.register(loaderRef)
  }, [snackBarRef, confirmRef, loaderRef])
  return (
    <Fragment>
      <AppSnackBar ref={snackBarRef} />
      <ConfirmActionComponent ref={confirmRef} />
      <LoadScreen ref={loaderRef} />
    </Fragment>
  )
})