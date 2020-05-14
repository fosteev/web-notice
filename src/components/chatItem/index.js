import React, {useEffect} from "react";
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    root: {
        overflow: 'hidden',
    },
    paper: {
        maxWidth: 400,
        padding: theme.spacing(2),
        '&:hover': {
            background: '#e5e5e5',
            cursor: 'pointer'
        }
    },
    header: {
        paddingLeft: 10
    },
    active: {
        background: '#bbbbbb',
    }
}));

export default function ChatItem({header, id, onClick}) {
    const classes = useStyles();

    const handlerClickRoom = () => {
        if (onClick) {
            onClick(id)
        }
    }

    return (
        <div className={classes.root} onClick={handlerClickRoom}>
            <Paper className={clsx(classes.paper, location.pathname.split('/')[2] === id ? classes.active : null)}>
                <Grid container wrap="nowrap" alignItems={"center"}>
                    <Grid item>
                        <Avatar>{header.substr(0, 1).toUpperCase()}</Avatar>
                    </Grid>
                    <Grid item xs zeroMinWidth className={classes.header}>
                        <Typography noWrap>{header}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}
