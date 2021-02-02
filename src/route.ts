import { API } from './interface/API';
import { RouteHandler } from './interface/RouteHandler';
import { RouteRegistration } from './interface/RouteRegistration';
import { matchRouteRegistrations } from './matchRouteRegistrations';
import { tokenizePath } from './tokenizePath';

export const route = (domImpl: Window = window): API => {
  const routeRegistrations: Array<RouteRegistration> = [];

  const api = {
    tokenizePath,
    get: (path: string, handler: RouteHandler) => {
      routeRegistrations.push({
        tokenizedPath: tokenizePath(path),
        handler,
      });
      return api;
    },
    match: (path?: string) => matchRouteRegistrations(routeRegistrations, path || document.location.pathname),
    getRouteRegistrations: () => routeRegistrations,
  };

  const listenForRouteChanges = () => {
    // tested by TestCafé end-2-end smoke test
    /* istanbul ignore next */
    domImpl.addEventListener(
      'popstate',
      () => {
        matchRouteRegistrations(routeRegistrations, document.location.pathname);
      },
      false,
    );
  };

  // start listening for any route change,
  // including inital ones (DOM load event)
  listenForRouteChanges();

  return api;
};
