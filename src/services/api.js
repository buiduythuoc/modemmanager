import axios from 'axios';
import _ from 'lodash';
import qs from 'querystring';
import {BASE_API_URL} from '../configs';

const create = () => {
  const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 60000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  api.interceptors.request.use(request => {
    console.log('Starting Request', request);
    return request;
  });

  api.interceptors.response.use(response => {
    console.log('Response:', response);
    return response;
  });

  // auth
  const login = (username, password) =>
    api.post('login.php', qs.stringify({username, password}));

  const signup = (username, password, type) =>
    api.post('register.php', qs.stringify({username, password, type}));

  const getListModems = userId =>
    api.post('getlistmodem.php', qs.stringify({user_id: userId}));

  const getListDevices = (
    userId,
    modemId,
    domain,
    port,
    username,
    password,
  ) => {
    const data = {
      user_id: userId,
      modem_id: modemId,
      domain,
      port,
      username,
      password,
    };
    return api.post('getlistdevice.php', qs.stringify(data));
  };

  const getListProviders = userId =>
    api.post('getlistprovider.php', qs.stringify({user_id: userId}));

  const addModem = (
    domain,
    port,
    loginName,
    loginPass,
    userId,
    modemName,
    provider,
    modemProvider,
  ) => {
    const data = {
      domain,
      port,
      login_name: loginName,
      login_pass: loginPass,
      user_id: userId,
      modem_name: modemName,
      provider,
      provider_modem: modemProvider,
    };
    return api.post('addmodem.php', qs.stringify(data));
  };

  const editModem = (
    modemId,
    domain,
    port,
    loginName,
    loginPass,
    userId,
    modemName,
  ) => {
    const data = {
      modem_id: modemId,
      domain,
      port,
      login_name: loginName,
      login_pass: loginPass,
      user_id: userId,
      modem_name: modemName,
    };
    return api.post('updatemodem.php', qs.stringify(data));
  };

  const blockDevice = (userId, modemId, deviceMac, deviceName) =>
    api.post(
      'blockdevice.php',
      qs.stringify({
        user_id: userId,
        modem_id: modemId,
        device_mac: deviceMac,
        device_name: deviceName,
      }),
    );

  // timeline
  const getListTimelines = userId =>
    api.post('getlistpost.php', qs.stringify({user_id: userId, modem_id: ''}));

  const addTimeline = (title, subTitle, userId, modemId, content) => {
    const data = {
      title,
      sub_title: subTitle,
      user_id: userId,
      modem_id: modemId,
      content,
    };
    return api.post('createpost.php', qs.stringify(data));
  };

  const getTimelineDetail = (userId, postId) =>
    api.post(
      'getpostdetail.php',
      qs.stringify({user_id: userId, post_id: postId}),
    );

  const editTimeline = (
    timelineId,
    title,
    subTitle,
    userId,
    modemId,
    content,
  ) => {
    const data = {
      post_id: timelineId,
      title,
      sub_title: subTitle,
      // user_id: userId,
      // modem_id: modemId,
      content,
    };
    return api.post('updatepost.php', qs.stringify(data));
  };

  const postComment = (userId, postId, comment) => {
    const data = {
      post_id: postId,
      user_id: userId,
      comment,
    };
    return api.post('addcomment.php', qs.stringify(data));
  };

  const fetchComments = (userId, postId) => {
    const data = {
      post_id: postId,
      user_id: userId,
    };
    return api.post('getpostcomment.php', qs.stringify(data));
  };

  // my page
  const getProfile = userId =>
    api.post('getprofile.php', qs.stringify({user_id: userId}));

  const updateProfile = (userId, username, status, expireDate) =>
    api.post(
      'updateprofile.php',
      qs.stringify({
        user_id: userId,
        username,
        status,
        expired_date: expireDate,
      }),
    );

  const changePassword = (userId, currentPassword, newPassword) =>
    api.post(
      'updatepassword.php',
      qs.stringify({
        user_id: userId,
        current_pass: currentPassword,
        new_pass: newPassword,
      }),
    );

  // account
  const getListAccounts = userId =>
    api.post('getlistadmin.php', qs.stringify({user_id: userId}));

  const deleteAccount = (userId, deleteId) =>
    api.post(
      'deleteaccountadmin.php',
      qs.stringify({user_id: userId, delete_id: deleteId}),
    );

  return {
    login,
    signup,
    // modem
    getListModems,
    getListProviders,
    getListDevices,
    addModem,
    editModem,
    blockDevice,
    // timeline
    getListTimelines,
    addTimeline,
    getTimelineDetail,
    editTimeline,
    postComment,
    fetchComments,
    //my page
    getProfile,
    updateProfile,
    changePassword,
    // account
    getListAccounts,
    deleteAccount,
  };
};

export default {
  create,
};
