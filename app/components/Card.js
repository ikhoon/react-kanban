import React, {Component, PropTypes} from 'react';
import CheckList from './CheckList';

class Card extends Component {
  constructor() {
    super(...arguments);
    this.state = {
      showDetails : false
    }
  }
  render() {
    let cardDetails;
    if(this.state.showDetails) {
      cardDetails = <div className="card_details">
        {this.props.description}
        <CheckList cardId={this.props.id} tasks={this.props.tasks} />
      </div>
    }
    let sideColor = {
      position: "absolute",
      zlndex: -1,
      top: 0,
      bottom: 0,
      left: 0,
      width: 7,
      backgroundColor: this.props.color
    };

    return (
      <div className="card">
        <div
          style={sideColor}
          className="card__title"
          onClick={() => this.setState({showDetails : !this.state.showDetails})}
        >{this.props.title}</div>
        {cardDetails}
      </div>
    );
  }
}

Card.propTypes = {
  description: React.PropTypes.string,
  id: React.PropTypes.number,
  tasks: React.PropTypes.array
};
Card.defaultProps = {};

export default Card;
