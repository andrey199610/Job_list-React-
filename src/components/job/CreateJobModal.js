import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FilledInput,
  Grid,
  MenuItem,
  Select,
  Typography,
  makeStyles,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  skill: {
    padding: theme.spacing(0.75),
    color: theme.palette.secondary.main,
    margin: theme.spacing(0.5),
    fontSize: "15px",
    borderRadius: "5px",
    fontWeight: 600,
    cursor: "pointer",
    border: `1px solid ${theme.palette.secondary.main}`,
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff",
    },
  },
  included: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
}));

const skills = [
  "Javascript",
  "React",
  "Vue",
  "PHP",
  "Node",
  "C++",
  "Python",
  "Go",
  "Swift",
];
const initialState = {
  title: "",
  type: "Full time",
  companyName: "",
  companyUrl: "",
  location: "Remote",
  link: "",
  description: "",
  skills: [],
};

export default (props) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [jobDetails, setJobDetails] = useState(initialState);
  const handleChange = (e) => {
    e.persist();
    setJobDetails((oldState) => ({
      ...oldState,
      [e.target.name]: e.target.value,
    }));
  };

  const addRemoveSkill = (skill) =>
    jobDetails.skills.includes(skill)
      ? setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.filter((s) => s !== skill),
        }))
      : setJobDetails((oldState) => ({
          ...oldState,
          skills: oldState.skills.concat(skill),
        }));

  const handleSubmit = async () => {
    for (const field in jobDetails) {
      if (typeof jobDetails[field] === "string" && !jobDetails[field]) return;
    }
    if (!jobDetails.skills.length) return;
    setLoading(true);
    await props.postJob(jobDetails);
    setLoading(false);
  };

  const closeModal = () => {
    setJobDetails(initialState);
    setLoading(false);
    props.closeModal();
  };

  return (
    <Dialog open={props.createJobModal} fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          Post job
          <IconButton onClick={closeModal}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="title"
              value={jobDetails.title}
              autoComplete="off"
              placeholder="Job title *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              name="type"
              value={jobDetails.type}
              fullWidth
              disableUnderline
              variant="filled"
            >
              <MenuItem value="Full time">Full time</MenuItem>
              <MenuItem value="Part time">Part time</MenuItem>
              <MenuItem value="Contract">Cotract</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyName"
              value={jobDetails.companyName}
              autoComplete="off"
              placeholder="Company name *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="companyUrl"
              value={jobDetails.companyUrl}
              autoComplete="off"
              placeholder="Company url *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              onChange={handleChange}
              name="location"
              value={jobDetails.location}
              fullWidth
              disableUnderline
              variant="filled"
            >
              <MenuItem value="Remote">Remote</MenuItem>
              <MenuItem value="Office">Part time</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={6}>
            <FilledInput
              onChange={handleChange}
              name="link"
              value={jobDetails.link}
              autoComplete="off"
              placeholder="Job link *"
              disableUnderline
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <FilledInput
              onChange={handleChange}
              name="description"
              value={jobDetails.description}
              autoComplete="off"
              placeholder="Description *"
              disableUnderline
              fullWidth
              multiline
              rows={4}
            />
          </Grid>
        </Grid>
        <Box mt={2}>
          <Typography>Skills</Typography>
          <Box display="flex">
            {skills.map((skill) => (
              <Box
                onClick={() => addRemoveSkill(skill)}
                className={`${classes.skill} ${
                  jobDetails.skills.includes(skill) && classes.included
                }`}
                key={skill}
              >
                {skill}
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Box
          color="red"
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption">* Required fields</Typography>
          <Button
            variant="contained"
            disableElevation
            color="primary"
            onClick={handleSubmit}
          >
            {loading ? (
              <CircularProgress color="secondary" size={22} />
            ) : (
              "Post Job"
            )}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
