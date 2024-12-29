import React, { Suspense } from 'react';

const App1 = React.lazy(() => import('app1/App'));
const App2 = React.lazy(() => import('app2/App'));
const App3 = React.lazy(() => import('app3/App'));

function App() {
  return (
    <div>
      Container APP
      <h1>Container App</h1>
      <Suspense fallback={<div>Loading App 1...</div>}>
        <App1 />
      </Suspense>
      <Suspense fallback={<div>Loading App 2...</div>}>
        <App2 />
      </Suspense>
      <Suspense fallback={<div>Loading App 3...</div>}>
        <App3 />
      </Suspense>
    </div>
  );
}

export default App;
