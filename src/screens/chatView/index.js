import React, {useEffect, useRef, useState} from "react";
import {getMessages, pushMessage} from "../../actions/messages";
import {useDispatch, useSelector} from "react-redux";
import {MessageList} from 'react-chat-elements'
import {subscribeToChat, unsubscribeToChat} from '../../socket';
import {getUser} from "../../actions/user";

import SendMessageInput from '../../components/sendMessageInput';
import {getUsers} from "../../actions/users";
import {request} from "../../actions/main";

export default function ChatView({history}) {
    const id = useSelector(state => state.user._id);
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);

    if (!id) {
        dispatch(getUser());
    }

    const chatId = history.location.state ? history.location.state.id : null;

    const {items} = useSelector(state => state.messages)


    let page = 1;


    useEffect(() => {
        const limit = 50;
        dispatch(
            getMessages(chatId, limit, page)
        )
    }, [page, chatId]);


    useEffect(() => {
        subscribeToChat(chatId, msg => {
            const message = JSON.parse(msg);
            dispatch(pushMessage(message));
        })

        request('rooms/' + chatId).then(resp => {
            request('users', 'GET', {
                users: resp.data.users.join(',')
            }).then(resp => {
                setUsers(resp.data)
            })
        })

        return () => unsubscribeToChat(chatId);
    }, []);


    const messageDiv = useRef();

    const scrollToBottom = () => {
        messageDiv.current.scrollIntoView({behavior: "smooth", block: 'end'});
    }

    useEffect(() => {
        scrollToBottom();
    }, [items]);


    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            height: '93vh'
        }}>
            <div style={{
                flex: 10,
                overflow: "auto"
            }}>
                <MessageList className='message-list'
                             lockable={true}
                             toBottomHeight={'100%'}
                             dataSource={items.map(item => ({
                                 position: item.user === id ? 'right' : 'left',
                                 type: 'text',
                                 text: item.text,
                                 title: users.length ? users.find(u => u.id === item.user).email : item.user,
                                 date: new Date(item.date),
                             }))}/>
                <div ref={messageDiv}></div>
            </div>

            <div style={{
                flex: 1
            }}>
                <SendMessageInput user={id} room={chatId}/>
            </div>

        </div>
    )
}
