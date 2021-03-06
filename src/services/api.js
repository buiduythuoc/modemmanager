import axios from 'axios';
import _ from 'lodash';
import qs from 'querystring';
import {BASE_API_URL} from '../configs';
import StorageHelpers from '../helpers/StorageHelper';
import NavigationService from '../services/navigationService';

const create = () => {
  const api = axios.create({
    baseURL: BASE_API_URL,
    timeout: 6000,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  });

  api.interceptors.request.use(config => {
    config.headers.common.Authorization = `Bearer ${StorageHelpers.getToken()}`;
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
  });

  api.interceptors.response.use(
    function(response) {
      return response;
    },
    function(error) {
      const isLoggedIn = !!StorageHelpers.getToken();
      if (_.get(error, 'response.status') === 401 && isLoggedIn) {
        NavigationService.navigate('LoginScreen');
      }
    },
  );

  const login = (username, password) =>
    api.post('login.php', qs.stringify({username, password}), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

  const signup = (username, password, role) =>
    api.post('register.php', qs.stringify({username, password, role}), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

  const getListModems = userId =>
    api.post('getlistmodem.php', qs.stringify({user_id: userId}), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

  const addModem = (domain, port, loginName, loginPass, userId, modemName) => {
    const data = {
      domain,
      port,
      login_name: loginName,
      login_pass: loginPass,
      user_id: userId,
      modem_name: modemName,
    };
    return api.post('addmodem.php', qs.stringify({data}), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  };

  const getListTimelines = userId =>
    api.post('getlistpost.php', qs.stringify({user_id: userId}), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

  const addTimeline = (title, subTitle, userId, modemId, content) => {
    const data = {
      title,
      sub_title: subTitle,
      user_id: userId,
      modem_id: modemId,
      content,
    };
    return api.post('createpost.php', qs.stringify({data}), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  };

  return {
    login,
    signup,
    getListModems,
    addModem,
    getListTimelines,
    addTimeline,
  };
};

export default {
  create,
};
