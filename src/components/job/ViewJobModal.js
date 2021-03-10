import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  IconButton,
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { format } from "date-fns";

const useStyles = makeStyles((theme) => ({
  info: {
    "&>*": {
      margin: "4px",
    },
  },
  skill: {
    padding: theme.spacing(0.75),
    backgroundColor: theme.palette.secondary.main,
    margin: theme.spacing(0.5),
    fontSize: "15px",
    borderRadius: "5px",
    fontWeight: 600,
    color: "#fff",
  },
}));

export default (props) => {
  const classes = useStyles();
  return (
    <Dialog open={!!Object.keys(props.job).length} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {props.job.title} @ {props.job.companyName}
          <IconButton onClick={props.closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box>
          <Box display="flex" className={classes.info}>
            <Typography variant="body2">Posted on: </Typography>
            <Typography variant="body2">
              {props.job.postedOn &&
                format(props.job.postedOn, "dd/MMM/yyyy HH:MM")}
            </Typography>
          </Box>
          <Box display="flex" className={classes.info}>
            <Typography variant="body2">Posted type: </Typography>
            <Typography variant="body2">{props.job.type}</Typography>
          </Box>
          <Box display="flex" className={classes.info}>
            <Typography variant="body2">Location: </Typography>
            <Typography variant="body2">{props.job.location}</Typography>
          </Box>
          <Box display="flex" className={classes.info}>
            <Typography variant="body2">Description: </Typography>
            <Typography variant="body2">{props.job.description}</Typography>
          </Box>
          <Box display="flex" className={classes.info}>
            <Typography variant="body2">Company: </Typography>
            <Typography variant="body2">{props.job.companyName}</Typography>
          </Box>
          <Box display="flex" className={classes.info}>
            <Typography variant="body2">Company url: </Typography>
            <Typography variant="body2">{props.job.companyUrl}</Typography>
          </Box>
          <Box ml={0.5}>
            <Typography variant="body2">Skills: </Typography>
            <Grid item container xs>
              {props.job.skills &&
                props.job.skills.map((skill) => (
                  <Grid key={skill} className={classes.skill} item>
                    {skill}
                  </Grid>
                ))}
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          component="a"
          href={props.job.link}
          target="_blank"
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};
