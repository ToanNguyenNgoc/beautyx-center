import {Snackbar, Alert} from '@mui/material'
interface SnackAlertProp {
  open: boolean
  onClose: () => void
  title: string
  severity?: 'success' | 'info' | 'warning' | 'error'
}

export function SnackAlert(props: SnackAlertProp) {
  const {open, onClose, title, severity = 'success'} = props
  return (
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
    >
      <Alert variant='filled' onClose={onClose} severity={severity} sx={{width: '100%'}}>
        {title}
      </Alert>
    </Snackbar>
  )
}
