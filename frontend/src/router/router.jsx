import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const RouterComponent = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <h1>Home</h1>} />
        <Route path="/about" component={() => <h1>About</h1>} />
        <Route path="/contact" component={() => <h1>Contact</h1>} />
      </Switch>
    </Router>
  );
};

export default RouterComponent;
