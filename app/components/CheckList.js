import React, {Component, PropTypes} from 'react';

class CheckList extends Component {
  render() {
    const tasks = this.props.tasks.map(task => (
      // key
      <li key={task.id} className="checklist__task">
        <input type="checkbox" defaultChecked={task.done} />
        {task.name}
        <a href="#" className="checklist__task--remove"/>
      </li>
    ));
    return (
      <div className="checklist">
        <ul>{tasks}</ul>
      </div>
    );
  }
}

CheckList.propTypes = {};
CheckList.defaultProps = {};

export default CheckList;
