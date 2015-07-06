import React from 'react';
import {Loader} from './Loader.js';

class HomePage extends React.Component {

  render() {
    const {groups} = this.props;
    const groupNames = Object.keys(groups);
    const groupCount = Object.keys(groups);
    return (
      <ul>
        {groupNames.map(name => <KataGroup name={name} count={groups[name].items.length} />) }
      </ul> );
  }
}

class KataGroup extends React.Component {
  render() {
    const {name, count} = this.props;
    return <li>{name} ({count})</li>
  }
}

const location = 'http://katas.tddbin.com/katas/es6/language';
const jsonfile = '__grouped__.json';
const url = `${location}/${jsonfile}`;
Loader.loadRemoteFile(url, (err, {groups={}}) => {
  React.render(<HomePage groups={groups} />, document.getElementById("app"));
});
