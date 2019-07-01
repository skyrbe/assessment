import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
      // document.title = (META[this.props.location.pathname] && `${META[this.props.location.pathname].title} - POD.Works`) || 'Welcome to POD.Works';
      // if (window.localStorage.getItem('userData')) {
      //   this.props.getUnreadCount();
      // }
    }
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
