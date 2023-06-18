import express from 'express';

export function routerInstance(routesCallback) {
  const instance = express.Router();
  routesCallback(instance);
  return instance;
}
