import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import ChatItem from "../../components/chatItem";
import {getUsers} from "../../actions/users";

export default function Users({history}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers())
    }, []);

    const {items} = useSelector(state => state.users)

    const handlerClickChat = id => {

    }

    return (
        items.map(item => <ChatItem header={item.email} id={item._id} onClick={handlerClickChat} />)
    )
}


