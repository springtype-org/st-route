import { RouteHandler } from './RouteHandler';
import { RouteRegistration } from './RouteRegistration';
import { RouteRequest } from './RouteRequest';
import { TokenizedPath } from './TokenizedPath';

export interface API {
  get(path: string, handler: RouteHandler): API;
  match(path?: string): RouteRequest | false;
  getRouteRegistrations(): Array<RouteRegistration>;
  tokenizePath(path: string): TokenizedPath;
}
