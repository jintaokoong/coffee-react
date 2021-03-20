import { Button, CircularProgress, makeStyles, PropTypes } from "@material-ui/core"

interface Props {
  className?: string | undefined;
  size?: "small" | "medium" | "large" | undefined;
  disabled?: boolean | undefined;
  variant?: "text" | "outlined" | "contained" | undefined;
  color?: PropTypes.Color | undefined;
  fullWidth?: boolean | undefined;
  
  loading?: boolean | undefined;
  content?: string | undefined;
}

const useStyles = makeStyles((themes) => ({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

export const SubmitButton: React.FC<Props> = (props) => {
  const text = props.content ?? 'Undefined';
  const classes = useStyles();

  return <Button type={'submit'}
    size={props.size}
    disabled={props.disabled}
    variant={props.variant}
    color={props.color}
    fullWidth={props.fullWidth}
    className={props.className}
  >
    {text}
    {
      props.loading ? <CircularProgress className={classes.buttonProgress} size={24} /> : null
    }
  </Button>;
}