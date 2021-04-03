import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
const MAX_NUM_TAGS = 5;
const MAX_NUM_CHARS = 80;

const classes = {
  root: {
    marginTop: 0,
  },
  chip: {
    background: '#c3c3c3',
    color: 'black',
    borderRadius: 5,
    fontSize: '0.7rem',
    fontWeight: 'bold',
    height: '1.25rem',
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
    <Typography variant="subtitle2" style={{ color: 'gray' }} gutterBottom>
      {string ? `${string.slice(0, MAX_NUM_CHARS)}` : null}
    </Typography>
  ) : (
    <Grid container spacing={1} style={classes.root}>
      {tags.map((tag) => (
        <Grid item key={tag}>
          <Chip size="small" label={`#${tag.trim()}`} style={classes.chip} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Tags;
