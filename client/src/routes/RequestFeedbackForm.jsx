import { useLazyQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';

const RequestFeedbackForm = ({ match }) => {
  console.log(match);

  return (
    <Container maxWidth="lg">
      <iframe
        className="airtable-embed airtable-dynamic-height"
        src="https://airtable.com/embed/shrMshfMcwGPT7t2t?backgroundColor=cyan"
        frameBorder="0"
        onMouseWheel=""
        width="100%"
        height={2052}
        style={{
          background: 'transparent',
          border: 'none',
          borderRadius: 0,
        }}
      ></iframe>
    </Container>
  );
};

export default RequestFeedbackForm;
