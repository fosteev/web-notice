import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PropTypes from 'prop-types';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

Confirm.propTypes = {
    children: PropTypes.node,
    onCancel: PropTypes.func,
    onConfirm: PropTypes.func,
    open: PropTypes.bool
}

export default function Confirm({children, onCancel, onConfirm, onClose, open}) {
    const handleClose = () => {
        if (onClose) {
            onClose();
        }

        if (onCancel) {
            onCancel();
        }
    };

    const handlerConfirm = () => {
        if (onConfirm) {
            onConfirm();
        }
    }

    return (
        <Dialog open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle id="alert-dialog-slide-title">{"Confirm"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handlerConfirm} color="primary">
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
}
