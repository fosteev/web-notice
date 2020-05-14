import React, {useEffect, useRef, useState} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import SendIcon from '@material-ui/icons/Send';
import {request} from "../../actions/main";
import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    padding: {
        padding: theme.spacing(3),
    },
    textField: {
        width: '100%',
        background: '#fff'
    },
}));

export default function SendMessageInput({user, room, onSendMessage}) {
    const classes = useStyles();
    const [text, setText] = useState();

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handlerSendMessage = async () => {
        try {
            const send = await request(`message`, 'POST', {
                user: user,
                room: room,
                text: text
            });
        } catch (e) {

        }
        setText('');

        if (onSendMessage) {
            onSendMessage();
        }
    }

    const handlerKeyDown = (e) => {
        const keyEnter = 13;
        if (e.keyCode === keyEnter) {
            handlerSendMessage();
        }
    }

    return (
        <FormControl className={clsx(classes.padding, classes.textField)}>
            <Input value={text}
                   onKeyDown={handlerKeyDown}
                   onChange={handleChange}
                   placeholder={'Write message text...'}
                   endAdornment={
                       <InputAdornment position="end">
                           <Fade in={text}>
                               <IconButton onClick={handlerSendMessage}
                                           onMouseDown={handleMouseDownPassword}
                               >
                                   <SendIcon></SendIcon>
                               </IconButton>
                           </Fade>
                       </InputAdornment>
                   }
            />
        </FormControl>
    );
}
