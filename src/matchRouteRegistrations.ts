import { RouteParams } from './interface/RouteParams';
import { RouteRegistration } from './interface/RouteRegistration';
import { RouteRequest } from './interface/RouteRequest';

export const matchRouteRegistrations = (routeRegistrations: Array<RouteRegistration>, url: string) => {
  let route = null;

  for (let i = 0; (route = routeRegistrations[i]); i++) {
    const routeMatch = route.tokenizedPath.regexp.exec(url);
    if (!routeMatch) continue;

    const params: RouteParams = {};
    const paramNames = Object.keys(route.tokenizedPath.groups);

    for (let j = 0; j < paramNames.length; j++) {
      const group = route.tokenizedPath.groups[paramNames[j]];
      params[paramNames[j].replace(':', '')] = routeMatch[group + 1];
    }

    const request: RouteRequest = {
      url,
      params,
    };
    route.handler(request);
    return request;
  }
  return false;
};
