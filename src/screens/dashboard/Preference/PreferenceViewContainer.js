// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import PreferenceView from './PreferenceView';
import {
  updateLanguage
} from "../../../state/GlobalState";

export default compose(
  connect(
    state => ({
      language: state.globalState?.language || "en-EN"
    }),
    dispatch => ({
      updateLanguage: (lang) => dispatch(updateLanguage(lang))
    }),
  ),
)(PreferenceView);
