import { Card } from '@material-ui/core';
import { createElement } from 'react';
import {  Box, Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import cartouche from './cartouche.png';

const CardWithIcon = props => {
    const { icon, children, title, subtitle } = props;
    const classes = useStyles(props);
    return (
        <Card className={classes.card}>
                <div className={classes.main}>
                    <Box width="3em" className="icon">
                        {createElement(icon, { fontSize: 'large' })}
                    </Box>
                    <Box textAlign="right">
                        <Typography
                            className={classes.title}
                            color="textSecondary"
                            >
                            {title}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {subtitle || ' '}
                        </Typography>
                    </Box>
                </div>
            {children && <Divider />}
            {children}
        </Card>
    );
};

const useStyles = makeStyles(theme => ({
    card: {
        minHeight: 52,
        padding: 0,
        margin: 5,
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        '& a': {
            textDecoration: 'none',
            color: 'inherit',
        },
    },
    main: (props) => ({
        overflow: 'inherit',
        padding: 16,
        background: `url(${ cartouche}) no-repeat`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        '& .icon': {
            color: '#dc2440',
        },
    }),
    title: {},
}));

export default CardWithIcon;
