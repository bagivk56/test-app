// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TransactionDetailsView from './TransactionDetailsView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(TransactionDetailsView);
