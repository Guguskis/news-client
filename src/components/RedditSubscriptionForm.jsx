import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import {
  Avatar,
  Button,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";

const RedditSubscriptionForm = ({
  subscribeSubreddits,
  unsubscribeSubreddits,
}) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionInput, setSubscriptionInput] = useState("");
  const [subscriptionError, setSubscriptionError] = useState(null);

  const handleSubscriptionInputChange = useCallback((e) => {
    setSubscriptionInput(e.target.value);
  }, []);

  const handleSubscriptionInputKeyDown = useCallback((e) => {
    if (e.key === "Enter") {
      handleSubscriptionSubmit();
    }
  }, []);

  const handleSubscriptionSubmit = useCallback(() => {
    if (subscriptionInput.length === 0) {
      setSubscriptionError("Subreddit name cannot be empty");
      return;
    }

    if (subscriptions.includes(subscriptionInput)) {
      setSubscriptionError("Subreddit already subscribed");
      return;
    }

    setSubscriptionError(null);
    setSubscriptions([...subscriptions, subscriptionInput]);
    setSubscriptionInput("");
  }, [subscriptions, subscriptionInput]);

  const handleSubscriptionRemove = useCallback(
    (subreddit) => {
      setSubscriptions(subscriptions.filter((s) => s !== subreddit));
    },
    [subscriptions]
  );

  return (
    <Grid item xs={12} md={6}>
      <Container sx={{ flexDirection: "row" }}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Avatar with text and icon
        </Typography>
        <Container sx={{ mb: 1 }}>
          <Button
            variant="contained"
            sx={{ mr: 1 }}
            onClick={() => subscribeSubreddits(["lithuania", "cryptoCurrency"])}
          >
            Subscribe
          </Button>
          <Button
            variant="contained"
            onClick={() => unsubscribeSubreddits(["lithuania"])}
          >
            Unsubscribe
          </Button>
        </Container>
      </Container>
      <List dense={true}>
        {[1, 2, 3].map((value) => (
          <ListItem
            key={value}
            secondaryAction={
              <IconButton edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <Avatar>
                <FolderIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary="Single-line item"
              secondary={true ? "Secondary text" : null}
            />
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

export default RedditSubscriptionForm;
