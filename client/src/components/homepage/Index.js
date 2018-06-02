import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import serverReq from '../../helpers/serverReq';
import { getFromLs, storeInLs } from '../../helpers/Ls';
import setTodayMenu from '../../actions/menu';
import Showcase from './Showcase';
import Welcome from './Wlcdesc';
import Menu from '../common/Menu';
import Footer from '../common/Footer';

class IndexPage extends Component {
  componentWillMount() {
    const [DD, MM, YYYY] = moment().format('DD-MM-YYYY').split('-');
    const token = getFromLs('jwt');
    if (token) {
      serverReq('get', `/api/v1/menus/${DD}/${MM}/${YYYY}`, '', token)
        .then((response) => {
          const { data } = response;
          if (data) {
            storeInLs('todayMenu', data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const { history } = this.props;
      history.push('/');
    }
  }

  componentDidMount() {
    this.addMenuToStore();
  }


  addMenuToStore() {
    const { dispatch } = this.props;
    const todayMenu = getFromLs('todayMenu');
    if (todayMenu) {
      const { success, message, menu } = todayMenu;
      const { Meals } = menu[0];
      return dispatch(setTodayMenu({ success, message, Meals }));
    }
  }

  render() {
    const { menu } = this.props;
    return (
      <div className="main-container">
        <Showcase />
        <Welcome />
        <Menu menu={menu} />
        <Footer />
      </div>
    );
  }
}

IndexPage.propTypes = {
  menu: PropTypes.array.isRequired,
  // user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  user: state.login.user,
  menu: state.todayMenu.Meals
});

export default connect(mapStateToProps)(withRouter(IndexPage));
