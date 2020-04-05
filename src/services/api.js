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

  const signup = (username, password, type, avatar = '') =>
    api.post('register.php', qs.stringify({username, password, type, avatar}));

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
    publicIp,
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
      public_ip: publicIp,
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

  const unblockDevice = (userId, modemId, deviceMac, deviceName) =>
    api.post(
      'unblockdevice.php',
      qs.stringify({
        user_id: userId,
        modem_id: modemId,
        device_mac: deviceMac,
        device_name: deviceName,
      }),
    );

  const getBlockList = (userId, modemId) =>
    api.post(
      'getlistblockdevice.php',
      qs.stringify({
        user_id: userId,
        modem_id: modemId,
      }),
    );

  // timeline
  const getListTimelines = (userId, listIp) =>
    api.post(
      'getlistpost.php',
      qs.stringify({user_id: userId, public_ip: listIp}),
    );

  const getListTimelinesByModemId = (userId, modemId) =>
    api.post(
      'getlistpostbymodem.php',
      qs.stringify({user_id: userId, modem_id: modemId}),
    );
  const addTimeline = (
    title,
    subTitle,
    userId,
    modemId,
    content,
    imgMain,
    img1,
    img2,
  ) => {
    const data = {
      title,
      sub_title: subTitle,
      user_id: userId,
      modem_id: modemId,
      content,
    };
    if (imgMain) {
      data.imageurl_main = imgMain;
    }
    if (img1) {
      data.imageurl_sub1 = img1;
    }
    if (img2) {
      data.imageurl_sub2 = img2;
    }

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
    imgMain,
    img1,
    img2,
  ) => {
    const data = {
      post_id: timelineId,
      title,
      sub_title: subTitle,
      // user_id: userId,
      // modem_id: modemId,
      content,
      imageurl_main: imgMain,
      imageurl_sub1: img1,
      imageurl_sub2: img2,
    };
    return api.post('updatepost.php', qs.stringify(data));
  };

  const deleteTimeline = (userId, postId) => {
    const data = {
      post_id: postId,
      user_id: userId,
    };
    return api.post('deletepost.php', qs.stringify(data));
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

  const updateProfile = (userId, username, status, expireDate, avatar) =>
    api.post(
      'updateprofile.php',
      qs.stringify({
        user_id: userId,
        username,
        status,
        expired_date: expireDate,
        avatar,
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

  const getPublicIp = () => api.get('https://api.ipify.org/');

  const getNotificationSetting = userId =>
    api.post('getconfignoti.php', qs.stringify({user_id: userId}));

  const updateNotificationSetting = (userId, noOfDevice, isActive) =>
    api.post(
      'updateconfignoti.php',
      qs.stringify({
        user_id: userId,
        no_of_device: noOfDevice,
        is_active: isActive,
      }),
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
    getBlockList,
    unblockDevice,
    // timeline
    getListTimelines,
    getListTimelinesByModemId,
    addTimeline,
    deleteTimeline,
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
    getPublicIp,
    getNotificationSetting,
    updateNotificationSetting,
  };
};

export default {
  create,
};
