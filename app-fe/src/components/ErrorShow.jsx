import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

function ErrorShow({ error, onClose }) {
    const open = Boolean(error);

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Chyba</DialogTitle>

            <DialogContent>
                <Typography color="error">
                    {error}
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button variant="contained" onClick={onClose}>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ErrorShow;
