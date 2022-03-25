/* eslint-disable consistent-return */
import { Error } from '../utils/helpers/response.helpers';

const dynamicValidator = async (schema, req, type) => {
  const requestTypes = {
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
  };
  requestTypes[type] = await schema.validateAsync(requestTypes[type]);
};

const baseValidator = async (schema, req, res, next, type) => {
  try {
    await dynamicValidator(schema, req, type);
    return next();
  } catch (error) {
    next(Error(error.message.replace(/["]/gi, ''), 400, res));
  }
};

export default baseValidator;
