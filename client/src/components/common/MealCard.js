import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';

class MealCard extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   redirect: false
  //   // };

  //   // this.onSubmit = this.onSubmit.bind(this);
  // }

  // onSubmit(e) {
  //   e.preventDefault();
  //   const { user, history } = this.props;

  //   if (!user.isLogin) {
  //     history.push('/login');
  //   }
  // }

  render() {
    const { mealData, onSubmit } = this.props;
    return (
      <div className="menu-box">
        <img src={mealData.image} alt="menu02" />
        <form className="menu-info" onSubmit={onSubmit}>
          <h3>
            {mealData.title}
          </h3>
          <p className="bold">Price (&#8358;):
            <span> {mealData.price}</span>
          </p>
          <p>{mealData.description}</p>
          <p className="bold">
              Portion: &nbsp;<input type="number" min="1" id="Qty" className="Qty" />
          </p>
          <p>
            <input type="submit" id="order" className="order" value="order" />
          </p>
        </form>
      </div>
    );
  }
}

MealCard.propTypes = {
  mealData: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
  // user: PropTypes.object.isRequired,
  // history: PropTypes.object.isRequired
};

// const mapStateToProps = state => ({
//   user: state.login.user
// });

export default MealCard;

