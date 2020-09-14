import React from 'react';
import { ApiConsumer } from '../../contexts/ApiContext';

const withApi = () => (Wrapped) => {
  return (props) => {
    return (
      <ApiConsumer>
        {(api) => {
          return <Wrapped {...props} api={api} />;
        }}
      </ApiConsumer>
    );
  };
};

export default withApi;
