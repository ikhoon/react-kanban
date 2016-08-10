import React, {Component} from 'react';

export class GroceryList extends Component {
  render() {
    return (
      <ul>
        <ListItem quantity="1" name="Bread"/>
        <ListItem quantity="6" name="Eggs"/>
        <ListItem quantity="2" name="Milk"/>
        <ListItem quantity="3" name="Cider"/>
      </ul>
    )
  }
}


class ListItem extends Component {
  render() {
    return (
      <li>
        {this.props.quantity} x {this.props.name}
      </li>
    )
  }
}

export class GroceryList2 extends Component {
  render() {
    return (
      <ul>
        <ListItem2 quantity="1">Bread</ListItem2>
        <ListItem2 quantity="6">Eggs</ListItem2>
        <ListItem2 quantity="2">Milk</ListItem2>
        <ListItem2 quantity="3">Cider</ListItem2>
      </ul>
    )
  }
}

// this.props.children을 사용해서 태그 사이의 XXXX의 값을 알수 있다.
// <ListItem>XXXX</ListItem>
class ListItem2 extends Component {
  render() {
    return (
      <li>
        {this.props.quantity} x {this.props.children}
      </li>
    )
  }
}
