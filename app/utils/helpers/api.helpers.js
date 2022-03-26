import axios from 'axios';
import { Error } from './response.helpers';

const sendHttpRequest = async (url, method, options = {}) => {
  try {
    const { status, data } = await axios({ url, method, ...options });
    return { status, data };
  } catch (e) {
    const error = Error(e.message, e.response ? e.response.status : 500);
    // eslint-disable-next-line no-undef
    logger.error('sendHttpRequest::apiHelpers', error);
    throw error;
  }
};

export default sendHttpRequest;
