import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import * as userActions from '../actions/user';

class App extends Component {
  // renderButton() {
  //   if (this.props.auth) {
  //     return (
  //         <button onClick={() => this.props.changeAuth(false)}>Sign Out</button>
  //     );
  //   } else {
  //     return (
  //         <button onClick={() => this.props.changeAuth(true)}>Sign In</button>
  //     );
  //   }
  // }

  // renderHeader() {
  //   return (
  //       <ul>
  //         <li>
  //           <Link to="/">Home</Link>
  //         </li>
  //         <li>
  //           <Link to="/post">Post A Comment</Link>
  //         </li>
  //         <li>{this.renderButton()}</li>
  //       </ul>
  //   );
  // }

  render() {
    return (
        <div>
            hello
          {/*{this.renderHeader()}*/}
          {/*<Route path="/post" component={CommentBox} />*/}
          {/*<Route path="/" exact component={CommentList} />*/}
        </div>
    );
  }
}

export default App;