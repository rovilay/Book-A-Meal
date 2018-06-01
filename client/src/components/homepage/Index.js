import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import moment from 'moment';

import serverReq from '../../helpers/serverReq';
import { getFromLs } from '../../helpers/Ls';
import Showcase from './Showcase';
import Welcome from './Wlcdesc';
import Menu from './Menu';
import Footer from '../common/Footer';

class IndexPage extends Component {
  constructor(props) {
    super(props);

    this.onAddMealToCart = this.onAddMealToCart.bind(this);
  }

  componentWillMount() {
    const [DD, MM, YYYY] = moment().format('DD-MM-YYYY').split('-');
    const token = getFromLs('jwt');
    if (token) {
      serverReq('get', `/api/v1/menus/${DD}/${MM}/${YYYY}`, '', token)
        .then((response) => {
          const { data, success } = response;
          if (success) {
            console.log(data.menu[0].meals);
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  onAddMealToCart(e) {
    e.preventDefault();
    const { user, history } = this.props;

    if (!user.isLogin) {
      history.push('/login');
    }
  }

  render() {
    const { menu } = this.props;
    return (
      <div className="main-container">
        <Showcase />
        <Welcome />
        <Menu menu={menu} onAddMealToCart={this.onAddMealToCart} />
        <Footer />
      </div>
    );
  }
}

IndexPage.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

IndexPage.defaultProps = {
  menu: [
    {
      title: 'Sharwama',
      description: 'So sweet!',
      price: 500,
      image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1527282604/menu02.jpg'
    },
    {
      title: 'Beans and Bread',
      description: 'So sweet!',
      price: 500,
      image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1527282607/menu01.jpg'
    },
    {
      title: 'Rice and Stew',
      description: 'So sweet!',
      price: 500,
      image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1527282604/menu02.jpg'
    },
    {
      title: 'Spaghetti',
      description: 'So sweet!',
      price: 500,
      image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1527282604/menu02.jpg'
    },
    {
      title: 'Indomie',
      description: 'So sweet!',
      price: 500,
      image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1527282604/menu02.jpg'
    },
    {
      title: 'Ice cream',
      description: 'So sweet!',
      price: 500,
      image: 'https://res.cloudinary.com/dcqnswemi/image/upload/v1527282604/menu02.jpg'
    }
  ]
};

const mapStateToProps = state => ({
  user: state.login.user
});

export default connect(mapStateToProps)(withRouter(IndexPage));
