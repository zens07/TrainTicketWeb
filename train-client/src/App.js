import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "./page/home";
import HomeUser from "./page/homeUser";
import HomeAdmin from "./page/homeAdmin";
import OrderTicket from "./page/orderTicket";
import Payment from "./page/payment";
class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/user/payment" component={Payment} />
          <Route path="/user/order" component={OrderTicket} />
          <Route path="/user/home" component={HomeUser} />
          <Route path="/admin/home" component={HomeAdmin} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
