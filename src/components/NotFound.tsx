import React from 'react';

export function NotFound({ location }) {
  return (
    <div className="flex bg-teal-100 h-screen">
      <div className="m-auto">
        Sorry, no matching page for <code>{location.pathname}</code>
      </div>
    </div>
  );
}
