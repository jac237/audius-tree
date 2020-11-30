/* eslint-disable react/prop-types */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    backgroundColor: '#212121',
    color: 'white',
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
      <CardContent>
        <Typography variant="inherit" component="h3">
          404 Error
        </Typography>
        <Typography variant="inherit" component="p">
          Uh Oh! Looks like something went wrong!
        </Typography>
        <br />
        <Button
          variant="contained"
          size="small"
          color="primary"
          href="/"
          disableElevation
        >
          Home
        </Button>
      </CardContent>
    </Card>
  );
};

export default ErrorCard;
