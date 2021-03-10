import React, { useState } from "react";
import {
  Box,
  Button,
  Select,
  MenuItem,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";

const useStyles = makeStyles({
  wrapper: {
    backgroundColor: "#fff",
    display: "flex",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "5px",
    "&>*": {
      flex: 1,
      height: "45px",
      margin: "8px",
    },
  },
});

export default (props) => {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [jobSearch, setJobSearch] = useState({
    type: "Full time",
    location: "Remote",
  });

  const handleChange = (e) => {
    e.persist();
    setJobSearch((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const Search = async () => {
    setLoading(true);
    await props.fetchJobsCustom(jobSearch);
    console.log(props.fetchJobsCustom);
    setLoading(false);
  };

  return (
    <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
      <Select
        value={jobSearch.type}
        name="type"
        onChange={handleChange}
        disableUnderline
        variant="filled"
      >
        <MenuItem value="Full time">Full time</MenuItem>
        <MenuItem value="Part time">Part time</MenuItem>
        <MenuItem value="Contract">Contract</MenuItem>
      </Select>
      <Select
        name="location"
        value={jobSearch.location}
        disableUnderline
        variant="filled"
        onChange={handleChange}
      >
        <MenuItem value="Remote">Remote</MenuItem>
        <MenuItem value="Office">Office</MenuItem>
      </Select>
      <Button
        disabled={loading}
        variant="contained"
        color="primary"
        disableElevation
        onClick={Search}
      >
        {loading ? <CircularProgress color="secondary" size={22} /> : "Search"}
      </Button>
    </Box>
  );
};
