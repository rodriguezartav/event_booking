var React = require('react');
require('./style.css');


class App extends React.Component {

  render() {
    return <div className="test">
        <h1>{this.props.name}</h1>
      </div>
  }
}

module.exports = App;
