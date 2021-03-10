import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  ThemeProvider,
} from "@material-ui/core";
import theme from "./theme/theme";
import Header from "./components/Header/Header";
import SearchBar from "./components/SearchBar/SearchBar";
import JobCard from "./components/job/JobCard";
import CreateJobModal from "./components/job/CreateJobModal";
import { firestore, app } from "./firebase/config";
import { Close as CloseIcon } from "@material-ui/icons";
import ViewJobModal from "./components/job/ViewJobModal";

export default () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [customSearch, setCustomSearch] = useState(false);
  const [createJobModal, setCreateJobModal] = useState(false);
  const [viewJobModal, setViewJobModal] = useState({});

  const fetchJobs = async () => {
    setCustomSearch(false);
    setLoading(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const fetchJobsCustom = async (jobSearch) => {
    setLoading(true);
    setCustomSearch(true);
    const req = await firestore
      .collection("jobs")
      .orderBy("postedOn", "desc")
      .where("location", "==", jobSearch.location)
      .where("type", "==", jobSearch.type)
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate(),
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const postJob = async (jobDetails) => {
    await firestore.collection("jobs").add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp(),
    });
    fetchJobs();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header openCreateJobModal={() => setCreateJobModal(true)} />
      <Grid container justify="center">
        <Grid item xs={10}>
          <CreateJobModal
            closeModal={() => setCreateJobModal(false)}
            createJobModal={createJobModal}
            postJob={postJob}
          />
          <ViewJobModal
            job={viewJobModal}
            closeModal={() => setViewJobModal({})}
          />
          <SearchBar fetchJobsCustom={fetchJobsCustom} />
          {loading ? (
            <Box display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          ) : (
            <>
              {customSearch && (
                <Box my={2} display="flex" justifyContent="flex-end">
                  <Button onClick={fetchJobs}>
                    <CloseIcon size={20}></CloseIcon>
                    Search
                  </Button>
                </Box>
              )}

              {jobs.map((job) => (
                <JobCard
                  open={() => setViewJobModal(job)}
                  key={job.id}
                  {...job}
                />
              ))}
            </>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};
