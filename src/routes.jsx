import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import OnRouteChange from '@components/common/OnRouteChange';
import PageLoader from '@components/common/PageLoader';
import Header from '@components/common/Header';

const LoadingComponent = ({ isLoading, isError }) => {
  if (isLoading) {
    return <PageLoader />;
  }
  if (isError) {
    return (
      <div>
        Sorry, unable to load the page
      </div>
    );
  }
  return null;
};

const Home = Loadable({
  loader: () => import('@components/Home'),
  loading: LoadingComponent
});

const Search = Loadable({
  loader: () => import('@components/Search'),
  loading: LoadingComponent
});

export default (
  <Router>
    <div className="container-fluid p-0">
      <div className="row">
        <div className="col">
          <OnRouteChange>
            <Header />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/search" component={Search} />
            </Switch>
          </OnRouteChange>
        </div>
      </div>
    </div>
  </Router>
);
