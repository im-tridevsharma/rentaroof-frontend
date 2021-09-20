import React from "react";
import UseAuthentication from "../../hooks/UseAuthentication";
import isAuthenticated from "../../lib/frontend/auth";

function Dashboard() {
  //authentication hook
  UseAuthentication();

  return isAuthenticated() ? (
    <div>
      <p>Tenant Dashboard</p>
    </div>
  ) : (
    <code>Unauthenticated!</code>
  );
}

export default Dashboard;
