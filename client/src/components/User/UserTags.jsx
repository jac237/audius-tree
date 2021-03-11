import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
const MAX_NUM_TAGS = 5;

const classes = {
  root: {
    marginTop: 5,
  },
  chip: {
    background: 'lightgray',
    borderRadius: 20,
    fontSize: '0.7rem',
    fontWeight: 'bold',
  },
};

const Tags = ({ string }) => {
  const [tags, setTags] = useState([]);
  const [validTags, setValidTags] = useState(false);

  useEffect(() => {
    const found = (string ? string : '').indexOf('Tags: ');
    if (found !== -1) {
      setValidTags(true);
      const trimmed = string.replace('Tags: ', '');
      const tags = trimmed.split(',').slice(0, MAX_NUM_TAGS);
      setTags(tags);
    }
  }, []);

  return !validTags ? (
    <div>{string ? `${string.slice(0, 80)}` : null}</div>
  ) : (
    <Grid container spacing={1} style={classes.root}>
      {tags.map((tag) => (
        <Grid item key={tag}>
          <Chip
            clickable
            centerRipple
            size="small"
            label={`#${tag}`}
            style={classes.chip}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Tags;
