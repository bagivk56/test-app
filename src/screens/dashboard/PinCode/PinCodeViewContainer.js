// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import PinCodeView from './PinCodeView';

export default compose(
  connect(
    state => ({}),
    dispatch => ({}),
  ),
)(PinCodeView);
