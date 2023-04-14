import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`
const Spinner = () => {
  return (
    <SpinnerWrapper>
      <ClipLoader
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </SpinnerWrapper>
  );
};

export default Spinner;