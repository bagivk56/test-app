// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import DashboardView from './DashboardView';
import {
  updateWallets
} from "../../../state/GlobalState";

export default compose(
  connect(
    state => ({
      wallets: state?.globalState?.wallets || {}
    }),
    dispatch => ({
      updateWallets: (wallet) => dispatch(updateWallets(wallet))
    }),
  ),
)(DashboardView);
