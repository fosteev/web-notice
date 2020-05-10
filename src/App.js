import React, {Component, Suspense} from 'react'
import './App.css';
import Button from '@material-ui/core/Button';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';
import Login from "./screens/login";
import Main from "./screens/main";
import { subscribeToTimer, subscribeToChat } from './socket';
import {
    BrowserRouter,
    Route,
    Redirect
} from 'react-router-dom';
import Chats from "./screens/chats";

const App = () => {
    subscribeToChat('5eaeaa3ba6bd332350f141e7', msg => {
        console.log(msg);
    })

    const login = localStorage.getItem('login');

    if (login) {
        return (
            <BrowserRouter>
                <div className='router'>
                    <Suspense fallback={() => <p>Loading...</p>}>
                        <Route path={'/'} component={Main}/>
                    </Suspense>
                </div>
            </BrowserRouter>
        )
    } else {
        return (
            <BrowserRouter>
                <div className='router'>
                    <Suspense fallback={() => <p>Loading...</p>}>
                        <Route path={'/'} component={Login}/>
                    </Suspense>
                </div>
            </BrowserRouter>
        )
    }
};

export default App;
