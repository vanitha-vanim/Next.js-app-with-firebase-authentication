import React from 'react';
import withAuth from '../../components/Auth/withAuth';
import Dashboard from '../../components/Auth/Dashboard';

function SignedUserAccount() {
  return (
    <div>
      <h1>Holaaaa User account</h1>
      <Dashboard />
    </div>
  );
}

// export default withAuth(AuthenticatedDashboard);
export default withAuth(SignedUserAccount, ['user', 'admin']);

