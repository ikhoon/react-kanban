import React, {Component, PropTypes} from "react";
import Card from './Card';

class List extends Component {
  render() {
    const cards = this.props.cards.map(card =>
      <Card
        id={card.id}
        title={card.title}
        description={card.description}
        tasks={card.tasks}
      />
    );
    return (
      <div className="list">
        <h1>{this.props.title}</h1>
        {cards}
      </div>
    );
  }
}

List.propTypes = {};
List.defaultProps = {};

export default List;
