/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
  },
  img: {
    height: '100%',
  },
}));

const ErrorCard = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root} square>
      <CardMedia
        className={classes.img}
        component="img"
        src="https://i.imgur.com/fy2Ejxc.png"
        title="404 Error Image"
      />
    </Card>
  );
};

export default ErrorCard;
