/* eslint-disable @typescript-eslint/ban-ts-comment */
import { AppSnackBar, AppSnackHandler, InitAlert } from "../../components/AppSnack/AppSnackBar";
import { createRef, Fragment, memo, useEffect } from "react";

export const RegisterGlobalLayout = memo(() => {
  const snackBarRef = createRef<AppSnackHandler>()
  useEffect(() => {
    //@ts-ignore
    InitAlert.register(snackBarRef)
  }, [snackBarRef])
  return (
    <Fragment>
      <AppSnackBar ref={snackBarRef} />
    </Fragment>
  )
})