import React, { useContext, useState } from 'react';

const FailureContext = React.createContext();
const SuccessContext = React.createContext();
const FailureToggleContext = React.createContext();
const SuccessToggleContext = React.createContext();

export const Failure = () => {
  return useContext(FailureContext);
};

export const Success = () => {
  return useContext(SuccessContext);
};

export const FailureToggle = () => {
  return useContext(FailureToggleContext);
};

export const SuccessToggle = () => {
  return useContext(SuccessToggleContext);
};

const StatusFetchContext = ({ children }) => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const toggleSuccess = () => setSuccess((prevStatus) => !prevStatus);
  const toggleFailure = () => setFailure((prevStatus) => !prevStatus);

  return (
    <SuccessContext.Provider value={success}>
      <FailureContext.Provider value={failure}>
        <SuccessToggleContext.Provider value={toggleSuccess}>
          <FailureToggleContext.Provider value={toggleFailure}>
            {children}
          </FailureToggleContext.Provider>
        </SuccessToggleContext.Provider>
      </FailureContext.Provider>
    </SuccessContext.Provider>
  );
};

export default StatusFetchContext;
