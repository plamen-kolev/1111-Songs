import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme, root) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    ...root
  }));