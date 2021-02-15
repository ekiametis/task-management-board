import { makeStyles } from '@material-ui/core/styles';

export const useCardStyles = makeStyles((theme) => ({
    root: {
        borderRadius: '5px',
        margin: '10px 10px 0px 10px',
    },
    grid: {
        backgroundColor: 'white',
        height: 100,
    },
    modal: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
}));