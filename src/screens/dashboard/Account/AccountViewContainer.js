// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AccountView from './AccountView';

export default compose(
  connect(
    state => ({
      wallets: state?.globalState?.wallets
    }),
    dispatch => ({}),
  ),
)(AccountView);
