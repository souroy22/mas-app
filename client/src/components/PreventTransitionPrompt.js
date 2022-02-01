import { useEffect, useState, useCallback } from 'react';
import { useBlocker, useNavigate, useLocation } from 'react-router-dom';
import { DialogTitle, DialogContent, Dialog, DialogContentText, DialogActions, Button } from '@material-ui/core';

export const AlertDialog = ({isBlocking}) => {
  const useCallbackPrompt = when => {
    const navigate = useNavigate();
    const location = useLocation();
    const [showPrompt,setShowPrompt] = useState(false);
    const [lastLocation, setLastLocation] = useState(null);
    const [confirmedNavigation, setConfirmedNavigation] = useState(false);

    const cancelNavigation = useCallback(() => {
      setShowPrompt(false);
    }, [])

    const handleBlockNavigation = useCallback(nextLocation => {
      if (!confirmedNavigation && nextLocation.location.pathname !== location.pathname) {
        setShowPrompt(true);
        setLastLocation(nextLocation)
        return false;
      }
      return true

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmedNavigation])
    
    const confirmNavigation = useCallback(() => {
      setShowPrompt(false);
      setConfirmedNavigation(true);
    }, []);

    useEffect(() => {
      if (confirmedNavigation && lastLocation) {
        navigate(lastLocation.location.pathname);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [confirmedNavigation, lastLocation])

    useBlocker(handleBlockNavigation, when);

    return [showPrompt, confirmNavigation, cancelNavigation];
  }

  const [showPrompt, confirmNavigation, cancelNavigation] = useCallbackPrompt(isBlocking);

  return (
    <Dialog
      open={showPrompt}
    >
      <DialogTitle>{"Cảnh báo"}</DialogTitle>

      <DialogContent>
          <DialogContentText id="alert-dialog-description">
            There are unsaved changes. Do you wish to exit?
          </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={cancelNavigation} color="primary">
          Exit
        </Button>
        <Button onClick={confirmNavigation} color="primary" autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  )
}