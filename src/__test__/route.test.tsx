import { RouteRequest } from '../interface/RouteRequest';
import { route } from '../route';

describe('route', () => {
  it('is defined', () => {
    expect(route).toBeDefined();
  });

  it('can register GET route handlers', () => {
    const nav = route();
    const handler = () => {};

    nav.get('/', handler);

    expect(nav.getRouteRegistrations().length).toEqual(1);
  });

  it('can register routes with params', () => {
    const nav = route();
    const path = '/:someId/foo/:someOtherParam';
    const handler = () => {};

    nav.get(path, handler);

    expect(nav.getRouteRegistrations()[0].tokenizedPath).toEqual(nav.tokenizePath(path));
  });

  it('can match a route with params (exact)', () => {
    const nav = route();
    const path = '/:someId/foo/:someOtherParam';
    const handler = () => {};

    nav.get(path, handler);

    const match = nav.match('/234aef/foo/some-slug-for-a-blog-article');

    expect(!!match).toEqual(true);
    expect((match as RouteRequest).params.someId).toEqual('234aef');
    expect((match as RouteRequest).params.someOtherParam).toEqual('some-slug-for-a-blog-article');
  });

  it('can match a route with params (relative)', () => {
    const nav = route();
    const path = ':someId/foo/:someOtherParam';
    const handler = () => {};

    nav.get(path, handler);

    const match = nav.match('234aef/foo/some-slug-for-a-blog-article');

    expect(!!match).toEqual(true);
    expect((match as RouteRequest).params.someId).toEqual('234aef');
    expect((match as RouteRequest).params.someOtherParam).toEqual('some-slug-for-a-blog-article');
  });

  it('does not match when routes actually do NOT match', () => {
    const nav = route();
    const path = ':someId/foo1/:someOtherParam';
    const handler = () => {};

    nav.get(path, handler);

    const match = nav.match('234aef/foo/some-slug-for-a-blog-article');

    expect(match).toEqual(false);
  });

  it('does match with no path name provided', () => {
    const nav = route();
    const path = '/';
    const handler = () => {};

    nav.get(path, handler);

    const match = nav.match();

    expect(!!match).toEqual(true);
  });
});
