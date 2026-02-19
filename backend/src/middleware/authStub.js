import { userRepo } from '../models/repositories.js';

export const injectDemoUser = (req, _res, next) => {
  req.user = userRepo.upsertDemoUser();
  next();
};
