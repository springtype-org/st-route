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
    match: (path: string) => matchRouteRegistrations(routeRegistrations, path),
    getRouteRegistrations: () => routeRegistrations,
  };

  const listenForRouteChanges = () => {
    let notYetInitiallyTriggered = false;

    // tested by TestCafé end-2-end smoke test
    /* istanbul ignore next */
    domImpl.addEventListener(
      'popstate',
      () => {
        matchRouteRegistrations(routeRegistrations, document.location.pathname);
      },
      false,
    );

    // initial routing on DOM load
    // tested by TestCafé end-2-end smoke test
    /* istanbul ignore next */
    domImpl.addEventListener(
      'load',
      () => {
        if (!notYetInitiallyTriggered) {
          matchRouteRegistrations(routeRegistrations, document.location.pathname);
          notYetInitiallyTriggered = true;
        }
      },
      false,
    );
  };

  // start listening for any route change,
  // including inital ones (DOM load event)
  listenForRouteChanges();

  return api;
};
