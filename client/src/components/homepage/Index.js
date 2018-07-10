import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import { setDefaultNav } from '../../actions/navLinks';
import getTodayMenu from '../../actions/menu';
import Showcase from './Showcase';
import Welcome from './Wlcdesc';
import Menu from '../common/Menu';

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.addMealToCart = this.addMealToCart.bind(this);
  }

  componentDidMount() {
    this.props.setDefaultNav();
    this.props.getTodayMenu();
  }

  addMealToCart() {
    this.props.history.push('/login');
  }

  render() {
    const { menu } = this.props;
    return (
      <div>
        <Showcase />
        <Welcome />
        {
          (menu.length > 0)
          &&
          <div className="container">
            <Menu
              menu={menu}
              addMealToCart={this.addMealToCart}
              notify={this.notify}
              {...this.props}
            />
          </div>
        }
      </div>
    );
  }
}

IndexPage.propTypes = {
  menu: PropTypes.array.isRequired,
  getTodayMenu: PropTypes.func.isRequired,
  setDefaultNav: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  user: state.login.user,
  menu: state.todayMenu.Meals
});

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setDefaultNav,
    getTodayMenu,
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(IndexPage));
