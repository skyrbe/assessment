import React from 'react';
import Sidebar from '@components/Sidebar';
import ContentPane from '@components/ContentPane';

const App = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-3 p-0">
          <Sidebar />
        </div>
        <div className="col-9">
          <ContentPane />
        </div>
      </div>
    </div>
  );
};

export default App;
