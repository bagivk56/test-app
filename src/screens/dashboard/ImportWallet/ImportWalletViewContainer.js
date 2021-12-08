// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import ImportWalletView from './ImportWalletView';
import {
  updateWallets
} from "../../../state/GlobalState";

export default compose(
  connect(
    state => ({}),
    dispatch => ({
      updateWallets: (wallets) => dispatch(updateWallets(wallets))
    }),
  ),
)(ImportWalletView);
