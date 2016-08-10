import React, { Component } from 'react';
import {render} from 'react-dom';
import KanbanBoard from './components/KanbanBoard';

import { cardList } from "./cardlist";

class Hello extends Component {
  render() {
    return <KanbanBoard cards={cardList}/>;
  }
}
render(<Hello />, document.getElementById('root'));