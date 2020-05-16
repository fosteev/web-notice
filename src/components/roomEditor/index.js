import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from 'prop-types';
import {useSelector} from "react-redux";
import {isMobile} from "react-device-detect";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Divider from "@material-ui/core/Divider";
import CreateChat from "../createChat";
import Rooms from "../../screens/rooms";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import Confirm from "../confirm";
import {request} from "../../actions/main";

RoomEditor.propTypes = {
    className: PropTypes.string
}

RoomEditor.defaultProps = {
    className: ''
}

export default function RoomEditor({className}) {
    const rooms = useSelector(state => state.rooms.items);
    const [header, setHeader] = useState('');
    const [users, setUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [isChat, setIsChat] = useState(false);
    const [isOpenConfirm, setOpenConfirm] = useState(false);

    useEffect(() => {
        const split = location.pathname.split('/');

        if (split[1] === 'view') {
            const roomId = location.pathname.split('/')[2];
            const room = rooms.find(r => r._id === roomId);

            if (room) {
                setHeader(room.name);
                setUsers(room.users);
                setIsChat(true);
            } else {
                setHeader(location.pathname.split('/')[1]);
            }
        } else {
            setHeader(split[1]);
            setIsChat(false);
        }



    }, [location.pathname, rooms]);

    const handlerOpen = () => {
        if (!isChat) {
            return;
        }
        setOpen(true);
    }

    const handlerClose = () => {
        setOpen(false);
    }

    const handlerCloseConfirm = () => {
        setOpenConfirm(false);
        setOpen(true);
    }

    const handlerOpenConfirm = () => {
        setOpenConfirm(true);
        setOpen(false);
    }

    const handlerConfirm = async () => {
        await deleteChat()
        setOpenConfirm(false);
        setOpen(false);
    }


    const user = useSelector(state => state.user);

    const deleteChat = async () => {
        try {
            await request(`rooms/${location.pathname.split('/')[2]}`, 'DELETE', {
                user: user._id
            });
            location.reload();
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className={className}>
            <Typography component="h1" variant="h6" color="inherit" noWrap onClick={handlerOpen}>
                {header}
            </Typography>
            <Drawer anchor={'top'}
                    //variant={'permanent'}
                    open={open}
            >
                <Button onClick={handlerOpenConfirm}>
                    Delete chat
                </Button>

                <IconButton onClick={handlerClose}>
                    <KeyboardArrowUpIcon></KeyboardArrowUpIcon>
                </IconButton>
            </Drawer>

            <Confirm open={isOpenConfirm}
                     onConfirm={handlerConfirm}
                     onCancel={handlerCloseConfirm}>
                Are you shure wanna delete this chat ?
            </Confirm>
        </div>
    )
}
