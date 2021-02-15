import { makeStyles } from '@material-ui/core/styles';

export const useColumnStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#e6ffe6',
    },
    columnName: {
        paddingLeft: 'calc(15px + 2vmin)',
        fontSize: 'calc(15px + 2vmin)',
    },
    columnButton: {
        float: 'right',
    },
    anotherCard: {
        fontSize: 'calc(10px + 2vmin)',
    }
}));