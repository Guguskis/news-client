import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import {
  Avatar,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";

const RedditSubscriptionForm = ({
  subscribeSubreddits,
  unsubscribeSubreddits,
}) => {
  const [subreddits, setSubreddits] = useState([]);
  const [subredditInput, setSubredditInput] = useState("");
  const [subredditError, setSubredditError] = useState(null);

  useEffect(() => {
    console.log(subredditInput);
  }, [subredditInput]);

  const handleSubredditInputChange = useCallback((e) => {
    setSubredditInput(e.target.value);
  }, []);

  const handleSubredditSubmit = useCallback(() => {
    if (subredditInput.length === 0) {
      setSubredditError("Subreddit name cannot be empty");
      return;
    }

    if (subreddits.includes(subredditInput)) {
      setSubredditError("Subreddit already subscribed");
      return;
    }

    setSubredditError(null);
    setSubreddits([...subreddits, subredditInput]);
    setSubredditInput("");
  }, [subreddits, subredditInput]);

  const handleSubredditInputKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSubredditSubmit();
      }
    },
    [handleSubredditSubmit]
  );

  const handleSubredditRemove = useCallback((subreddit) => {
    setSubreddits((subreddits) => subreddits.filter((s) => s !== subreddit));
  }, []);

  return (
    <Grid item xs={12} md={6} sx={{ pt: 2 }}>
      <TextField
        InputProps={{
          startAdornment: <InputAdornment position="start">r/</InputAdornment>,
        }}
        sx={{ mb: 2 }}
        variant="outlined"
        label="Subreddit"
        value={subredditInput}
        onChange={handleSubredditInputChange}
        onKeyDown={handleSubredditInputKeyDown}
        error={subredditError !== null}
        helperText={subredditError}
      />

      <IconButton color="primary" onClick={handleSubredditSubmit}>
        <AddCircleIcon />
      </IconButton>

      <List dense={true}>
        {subreddits.map((subreddit) => (
          <ListItem
            key={subreddit}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleSubredditRemove(subreddit)}
              >
                <DeleteIcon color="primary" />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={"r/" + subreddit} />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default RedditSubscriptionForm;
