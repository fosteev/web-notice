import React, {useEffect} from "react";
import {getRooms} from "../../actions/rooms";
import {useDispatch, useSelector} from "react-redux";
import ChatItem from "../../components/chatItem";

export default function Rooms({history}) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRooms())
    }, []);

    const {items} = useSelector(state => state.rooms)

    const handlerClickChat = id => {
        history.push('/view/' + id, {
            id: id
        });
    }

    return (
        items.map(item => <ChatItem header={item.name} id={item._id} onClick={handlerClickChat} />)
    )
}


