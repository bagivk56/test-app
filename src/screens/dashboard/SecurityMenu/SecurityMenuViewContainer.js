// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import SecurityMenuView from './SecurityMenuView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(SecurityMenuView);
