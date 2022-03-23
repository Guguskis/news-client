import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import MenuBarContainer from "../components/MenuBarContainer.jsx";

const RedditSubscriptionForm = ({
  subscribeSubreddits,
  unsubscribeSubreddits,
}) => {
  const [subreddits, setSubreddits] = useState([]);
  const [subredditInput, setSubredditInput] = useState("");
  const [subredditError, setSubredditError] = useState(null);

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
    subscribeSubreddits([subredditInput]);
  }, [subredditInput, subreddits, subscribeSubreddits]);

  const handleSubredditInputKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSubredditSubmit();
      }
    },
    [handleSubredditSubmit]
  );

  const handleSubredditRemove = useCallback(
    (subreddit) => {
      setSubreddits((subreddits) => subreddits.filter((s) => s !== subreddit));
      unsubscribeSubreddits([subreddit]);
    },
    [unsubscribeSubreddits]
  );

  return (
    <MenuBarContainer>
      <Grid item xs={12} md={6}>
        {/* todo force text and button in the same row */}
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">r/</InputAdornment>
            ),
          }}
          sx={{ mb: 1 }}
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
            <ListItem key={subreddit}>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleSubredditRemove(subreddit)}
                sx={{ mr: 1 }}
              >
                <DeleteIcon color="primary" />
              </IconButton>
              <ListItemText primary={"r/" + subreddit} />
            </ListItem>
          ))}
        </List>
      </Grid>
    </MenuBarContainer>
  );
};

export default RedditSubscriptionForm;
