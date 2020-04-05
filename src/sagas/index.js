import {takeLatest, all} from 'redux-saga/effects';

/* ------------- Types ------------- */

import {ModemTypes} from '../stores/modemRedux';
import {AuthTypes} from '../stores/authRedux';
import {TimelineTypes, fetchTimelineByModemId} from '../stores/timelineRedux';
import {MyPageTypes} from '../stores/myPageRedux';
import {AccountTypes} from '../stores/accountRedux';

/* ------------- Sagas ------------- */

import {
  addModem,
  fetchModems,
  editModem,
  fetchProviders,
  blockDevice,
  unblockDevice,
  fetchBlockDevices,
} from './modemSaga';
import {login, signup} from './authSaga';
import {
  addTimeline,
  fetchTimelines,
  fetchTimelineDetail,
  editTimeline,
  postComment,
  fetchComments,
  deleteTimeline,
  fetchTimelinesByModemId,
} from './timelineSaga';
import {fetchMyProfile, updateMyProfile, changePassword} from './myPageSaga';
import {
  fetchAccounts,
  deleteAccount,
  fetchProfile,
  updateProfile,
  fetchNotificationSetting,
  updateNotificationSetting,
} from './accountSaga';

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
    // modem
    takeLatest(ModemTypes.MODEM_FETCH, fetchModems),
    takeLatest(ModemTypes.DEVICE_BLOCK, blockDevice),
    takeLatest(ModemTypes.DEVICE_UNBLOCK, unblockDevice),
    takeLatest(ModemTypes.PROVIDER_FETCH, fetchProviders),
    takeLatest(ModemTypes.MODEM_ADD, addModem),
    takeLatest(ModemTypes.MODEM_EDIT, editModem),
    takeLatest(ModemTypes.DEVICE_BLOCK_LIST_FETCH, fetchBlockDevices),
    // timeline
    takeLatest(TimelineTypes.TIMELINE_FETCH, fetchTimelines),
    takeLatest(
      TimelineTypes.TIMELINE_FETCH_BY_MODEM_ID,
      fetchTimelinesByModemId,
    ),
    takeLatest(TimelineTypes.TIMELINE_ADD, addTimeline),
    takeLatest(TimelineTypes.TIMELINE_DETAIL, fetchTimelineDetail),
    takeLatest(TimelineTypes.TIMELINE_EDIT, editTimeline),
    takeLatest(TimelineTypes.TIMELINE_DELETE, deleteTimeline),
    takeLatest(TimelineTypes.TIMELINE_POST_COMMENT, postComment),
    takeLatest(TimelineTypes.TIMELINE_FETCH_COMMENTS, fetchComments),
    // myPage
    takeLatest(MyPageTypes.MY_PAGE_FETCH, fetchMyProfile),
    takeLatest(MyPageTypes.MY_PAGE_UPDATE, updateMyProfile),
    takeLatest(MyPageTypes.MY_PAGE_CHANGE_PASSWORD, changePassword),
    // account
    takeLatest(AccountTypes.ACCOUNT_FETCH, fetchAccounts),
    takeLatest(AccountTypes.ACCOUNT_DELETE, deleteAccount),
    takeLatest(AccountTypes.ACCOUNT_FETCH_PROFILE, fetchProfile),
    takeLatest(AccountTypes.ACCOUNT_UPDATE_PROFILE, updateProfile),
    takeLatest(
      AccountTypes.ACCOUNT_FETCH_NOTIFICATION_SETTING,
      fetchNotificationSetting,
    ),
    takeLatest(
      AccountTypes.ACCOUNT_UPDATE_NOTIFICATION_SETTING,
      updateNotificationSetting,
    ),
  ]);
}
