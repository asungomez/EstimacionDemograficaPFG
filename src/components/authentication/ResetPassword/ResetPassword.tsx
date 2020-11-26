import React, { useState } from 'react';

import RequestResetPassword from './RequestResetPassword/RequestResetPassword';

export type ResetPasswordStatus = 'request' | 'reset';

const ResetPassword: React.FC<{}> = () => {
  const [status] = useState<ResetPasswordStatus>('request');

  if (status === 'request') {
    return <RequestResetPassword />;
  } else {
    return null;
  }
};

export default ResetPassword;
