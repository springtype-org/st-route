import { RouteHandler } from './RouteHandler';
import { TokenizedPath } from './TokenizedPath';

export interface RouteRegistration {
  tokenizedPath: TokenizedPath;
  handler: RouteHandler;
}
