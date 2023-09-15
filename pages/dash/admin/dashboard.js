import React from 'react';
import withAuth from '../../../components/Auth/withAuth';
import Dashboard from '../../../components/Auth/Dashboard';

function AuthenticatedDashboard() {
  return (
    <div>
      <h1>Holaaaa Authenticated Dashboard</h1>
      <Dashboard />
    </div>
  );
}

export default withAuth(AuthenticatedDashboard);
