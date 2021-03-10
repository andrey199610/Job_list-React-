import React from "react";
import { Box, Grid, Typography, Button, makeStyles } from "@material-ui/core";
import { formatDistance } from "date-fns";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    border: "1px solid #a59696",
    cursor: "pointer",
    transition: ".3s",
    marginBottom: "7px",
    borderRadius: "4px",
    "&:hover": {
      boxShadow: "0px 5px 25px rgba(0,0,0,0.1)",
      borderLeft: "6px solid #4d64e4",
    },
  },
  companyName: {
    fontSize: "14px",
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(0.75),
    borderRadius: "5px",
    display: "inline-block",
    fontWeight: 600,
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
    <Box p={3} className={classes.wrapper}>
      <Grid container alignItems="center">
        <Grid item xs>
          <Typography variant="subtitle1">{props.title}</Typography>
          <Typography className={classes.companyName} variant="subtitle2">
            {props.companyName}
          </Typography>
        </Grid>
        <Grid item container xs>
          {props.skills.map((skill) => (
            <Grid key={skill} className={classes.skill} item>
              {skill}
            </Grid>
          ))}
        </Grid>
        <Grid item container direction="column" alignItems="flex-end" xs>
          <Grid item>
            <Typography variant="caption">
              {formatDistance(Date.now(), props.postedOn)} ago / {props.type} /{" "}
              {props.location}
            </Typography>
          </Grid>
          <Grid item>
            <Box mt={2}>
              <Button onClick={props.open} variant="outlined">
                Check
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
