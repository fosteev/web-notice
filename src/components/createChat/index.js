import React, {useState} from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Checkbox from '@material-ui/core/Checkbox';
import DialogContent from '@material-ui/core/DialogContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import {useDispatch, useSelector} from "react-redux";
import {createRoom} from "../../actions/rooms";
import {getUsers} from "../../actions/users";
import {isMobile} from "react-device-detect";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateChat() {
    const [open, setOpen] = React.useState(false);
    const [checked, setChecked] = useState([]);
    const [name, setName] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const users = useSelector(state => state.users.items);
    const dispatch = useDispatch();

    if (!users.length) {
        dispatch(
            getUsers()
        )
    }

    const handlerChecked = (user, event) => {
        if (event.target.checked) {
            setChecked(
                checked.concat([user])
            )
        } else {
            setChecked(
                checked.filter(u => u._id !== user._id)
            )
        }
    }

    const user = useSelector(state => state.user);

    const handlerCreate = () => {
        dispatch(
            createRoom({
                name: name,
                admin: user._id,
                users: JSON.stringify(
                    checked.map(c => c._id).concat([user._id])
                )
            })
        )
        handleClose();
    }

    return (
        <>
            <Button onClick={handleClickOpen}>
                Create chat
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                fullScreen={isMobile}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">
                    {"Choose user for create Chat"}
                </DialogTitle>
                <DialogContent>
                    <TextField label="Enter chat name"
                               onChange={e => setName(e.target.value)}
                               value={name}/>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {
                            users.map(u => (
                                    <FormControlLabel
                                        label="Primary"
                                        control={
                                            <Checkbox
                                                //checked={state.checkedF}
                                                onChange={(e) => handlerChecked(u, e)}
                                                name="checkedF"
                                                indeterminate
                                            />
                                        }
                                        label={u.email}
                                    />
                                )
                            )
                        }
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handlerCreate}
                            disabled={!(name && checked.length)}
                            color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
