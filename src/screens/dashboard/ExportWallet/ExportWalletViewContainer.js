// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import ExportWalletView from './ExportWalletView';

export default compose(
  connect(
    state => ({
      wallet: state?.globalState?.wallets
    }),
    dispatch => ({}),
  ),
)(ExportWalletView);
