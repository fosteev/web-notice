import React, {Component} from 'react'
import './App.css';
import Button from '@material-ui/core/Button';
import { Widget, addResponseMessage } from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

import { subscribeToTimer, subscribeToChat } from './socket';

const App = () => {
    subscribeToChat('5eaeaa3ba6bd332350f141e7', msg => {
        console.log(msg);
    })

    return (
       <div>
           <Widget></Widget>
       </div>
    )
};

export default App;
