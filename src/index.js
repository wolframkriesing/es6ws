import React from 'react';
import {Loader} from './Loader.js';
import {KataGroups} from './KataGroups.js';

class HomePage extends React.Component {

  render() {
    const {groups} = this.props;
    //const groupNames = Object.keys(groups);
    return <KataGroups groups={groups} />
  }
}

const location = 'http://katas.tddbin.com/katas/es6/language';
const jsonfile = '__grouped__.json';
const url = `${location}/${jsonfile}`;
Loader.loadRemoteFile(url, (err, {groups={}}) => {
  React.render(<HomePage groups={groups} />, document.getElementById("app"));
});
