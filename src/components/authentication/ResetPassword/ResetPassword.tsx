import React from 'react';
import { useLocation } from 'react-router-dom';

import RequestResetPassword from './RequestResetPassword/RequestResetPassword';
import SetNewPassword from './SetNewPassword/SetNewPassword';

export type ResetPasswordStatus = 'request' | 'reset';

const ResetPassword: React.FC<{}> = () => {
  const location = useLocation();
  const email = new URLSearchParams(location.search).get('email');
  const code = new URLSearchParams(location.search).get('code');

  if (email && code && email.length > 0 && code.length > 0) {
    return <SetNewPassword email={email} code={code} />;
  } else {
    return <RequestResetPassword />;
  }
};

export default ResetPassword;
