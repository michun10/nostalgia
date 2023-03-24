import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  FormControl,
  Grid,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { setCommunities } from "../../store";
import CommunityCard from "./CommunityCard";
import AddCommunity from "./AddCommunity";

const CommunityList = () => {
  const { communities, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCommunities());
  }, []);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Filter Category
  const [state, setstate] = useState({
    query: "",
    list: [],
  });

  const handleChange = (e) => {
    const results = communities.filter((community) => {
      if (e.target.value === "") return community;
      return (
        community.state.toLowerCase().includes(e.target.value.toLowerCase()) ||
        community.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
        community.address.toLowerCase().includes(e.target.value.toLowerCase())
      );
    });
    setstate({
      query: e.target.value,
      list: results,
    });
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography align="left" variant="h3" component="h1" gutterBottom>
          Find a Community!
        </Typography>
        {auth.id && (
          <Button
            variant="contained"
            sx={{ borderRadius: 50 }}
            onClick={handleClickOpen}
          >
            Add New Community
          </Button>
        )}
      </Box>

      <Box sx={{ minWidth: 200, mt: 10, mb: 10 }}>
        <FormControl fullWidth>
          <TextField
            value={state.query}
            type="search"
            label="Location"
            onChange={handleChange}
          ></TextField>
        </FormControl>
      </Box>

      <Grid container spacing={2} sx={{ flexGrow: 1 }}>
        {state.query === ""
          ? communities.map((community) => {
              return (
                <Grid item zeroMinWidth key={community.id}>
                  <CommunityCard key={community.id} community={community} />
                </Grid>
              );
            })
          : state.list.map((community) => {
              return (
                <Grid item zeroMinWidth key={community.id}>
                  <CommunityCard key={community.id} community={community} />
                </Grid>
              );
            })}

        {/* {communities.length > 0 &&
          (location
            ? communities
                .filter((community) => community.state.includes(location))
                .map((community) => (
                  <CommunityCard key={community.id} community={community} />
                ))
            : communities.map((community) => (
                <CommunityCard key={community.id} community={community} />
              )))} */}
      </Grid>
      <AddCommunity open={open} onClose={handleClose} />
    </div>
  );
};

export default CommunityList;
