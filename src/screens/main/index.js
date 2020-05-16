import React, {Suspense, useState} from "react";
import {
    BrowserRouter,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import Rooms from "../rooms";
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import ForumIcon from '@material-ui/icons/Forum';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import {isMobile} from "react-device-detect";
import clsx from 'clsx';
import ChatView from "../chatView";
import Users from "../users";
import CreateChat from "../../components/createChat";
import RoomEditor from "../../components/roomEditor";
import Button from "@material-ui/core/Button";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = isMobile ? window.screen.width : 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    toolbarIconRight: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    drawerMenu: {
        width: isMobile ? window.screen.width : 240
    }
}));

export default function Main({history}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const [menu, setMenu] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    const handlerMenuOpen = () => {
        setMenu(true);
    }

    const handlerMenuClose = () => {
        setMenu(false);
    }

    const handlerSelectChat = () => {
        if (isMobile) {
            handleDrawerClose();
        }
    }

    const handlerExit = () => {
        localStorage.setItem('login', '');
        location.reload();
    }


    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <Badge badgeContent={4} color="secondary">
                            <ForumIcon/>
                        </Badge>
                    </IconButton>

                    <RoomEditor className={classes.title} />

                    <IconButton onClick={handlerMenuOpen}
                                color="inherit"
                                className={clsx(classes.menuButton, menu && classes.menuButtonHidden)}>
                        <MenuIcon></MenuIcon>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={isMobile ? 'temporary' : "permanent"}
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                {open && <CreateChat/>}
                <Rooms history={history} onSelect={handlerSelectChat} />
            </Drawer>

            <Drawer anchor={'right'}
                    classes={{
                        paper: classes.drawerMenu
                    }}
                    open={menu}
            >
                <div className={classes.toolbarIconRight}>
                    <IconButton onClick={handlerMenuClose}>
                        <ChevronRight/>
                    </IconButton>
                </div>
                <Divider/>

                <Button onClick={handlerExit}>
                    Exit
                </Button>
            </Drawer>

            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Switch>
                    <Route path={'/view/:id'} component={ChatView}/>
                </Switch>
            </main>
        </div>
    );
}
