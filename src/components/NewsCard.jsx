import LinkIcon from "@mui/icons-material/Link";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import ReactTimeAgo from "react-time-ago";

const NewsCard = ({ news, sx }) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Typography variant="h5" component="div">
          {news.title}
        </Typography>
        <Typography color="text.secondary">
          {news.channel === "REDDIT" ? "r/" + news.subChannel : news.subChannel}
        </Typography>
        <Typography variant="caption" sx={{ mb: 1.5 }} color="text.secondary">
          <ReactTimeAgo date={news.created} locale="en-US" />
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton href={news.url} target="_blank">
          <LinkIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default memo(NewsCard, (a, b) => a.id === b.id);
