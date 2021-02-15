import { makeStyles } from '@material-ui/core/styles';

export const useBoardStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#000d1a',
        flexGrow: 1,
    },
    title: {
        fontSize: 'calc(20px + 2vmin)',
        color: 'white',
    },
}));