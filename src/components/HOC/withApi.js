import React from 'react';
import { ApiConsumer } from '../../contexts/ApiContext';

const withApi = () => (Wrapped) => {
  return (props) => {
    return (
      <ApiConsumer>
        {(apiService) => {
          return <Wrapped {...props} apiService={apiService} />;
        }}
      </ApiConsumer>
    );
  };
};

export default withApi;
