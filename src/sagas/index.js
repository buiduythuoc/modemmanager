import {takeLatest, all} from 'redux-saga/effects';

/* ------------- Types ------------- */

import {ModemTypes} from '../stores/modemRedux';
import {AuthTypes} from '../stores/authRedux';
import {TimelineTypes} from '../stores/timelineRedux';

/* ------------- Sagas ------------- */

import {addModem, fetchModems, editModem} from './modemSaga';
import {login, signup} from './authSaga';
import {addTimeline, fetchTimelines, fetchTimelineDetail, editTimeline} from './timelineSaga';

/* ------------- API ------------- */

// The API we use is only used from Sagas, so we create it here and pass along
// to the sagas which need it.

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action

    // some sagas receive extra parameters in addition to an action
    takeLatest(AuthTypes.AUTH_LOGIN, login),
    takeLatest(AuthTypes.AUTH_REGISTER, signup),
    takeLatest(ModemTypes.MODEM_FETCH, fetchModems),
    takeLatest(ModemTypes.MODEM_ADD, addModem),
    takeLatest(ModemTypes.MODEM_EDIT, editModem),
    takeLatest(TimelineTypes.TIMELINE_FETCH, fetchTimelines),
    takeLatest(TimelineTypes.TIMELINE_ADD, addTimeline),
    takeLatest(TimelineTypes.TIMELINE_DETAIL, fetchTimelineDetail),
    takeLatest(TimelineTypes.TIMELINE_EDIT, editTimeline),
  ]);
}
