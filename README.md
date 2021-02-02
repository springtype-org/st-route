<h1 align="center">SpringType: st-route</h1>

> Nano library for client-side DOM routing

[![Gitter](https://badges.gitter.im/springtype-official/springtype.svg)](https://gitter.im/springtype-official/springtype?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)

<h2 align="center">Purpose</h2>

This is an exremely tiny, yet powerful library for HTML5 history API based DOM routing. `st-route` makes client-side page navigation dead simple.

<h2 align="center">Features</h2>

- ✅ Abstracts the HTML5 history API
- ✅ Tiny: `391 bytes` (best, brotli) - `556 bytes` (worst, umd, gz)
- ✅ Zero dependencies
- ✅ First class TypeScript support
- ✅ 100% Unit Test coverage
- ✅ TestCafé smoke tests

<h2 align="center">How to</h2>

This is how using `st-route` looks like:

```tsx
import { tsx, render, Ref } from 'springtype';
import { $ } from 'st-query';
import { route, RouterRequest } from '../../../dist';

const HomePage = () => (
  <div>
    HomePage
    <br />
    <a href="/blog">Go to BlogPage</a>
  </div>
);
const BlogPage = () => <div>BlogPage</div>;

const BlogArticlePage = ({ request }: { request: RouterRequest }) => (
  <div>
    Blog / show article:
    {request.params.slug}
  </div>
);

const RouteList = () => {
  const containerRef: Ref = {};
  const nav = route();

  nav.get('/', () => {
    containerRef.current = $(containerRef.current).replaceWith(<HomePage />);
  });

  nav.get('/blog', () => {
    containerRef.current = $(containerRef.current).replaceWith(<BlogPage />);
  });

  nav.get('/blog/article/:slug', (request: Request) => {
    containerRef.current = $(containerRef.current).replaceWith(<BlogArticlePage request={request} />);
  });

  return <div ref={containerRef}>Loading...</div>;
};
render(<RouteList />, document.body);
```

<h2 align="center">API</h2>

The following contract is made between the webapp and `st-router`:

```typescript
export interface API {
  get(path: string, handler: RouteHandler): API;
  match(path: string): RouteRequest | false;
  getRouteRegistrations(): Array<RouteRegistration>;
  tokenizePath(path: string): TokenizedPath;
}

// calling route() returns the API object like:
// const nav = route();
// nav.get('/foo')
export route = () => API;
```

<h2 align="center">Troubleshooting</h2>

⚠️ Please make sure that you have a http server in place that can handle `pushState` well (re-routes all `HTTP GET` requests back to the `index.html` file serving the JavaScript). Please read about "SPA / Single Page Application routing" if you have any further questions about this.

<h2 align="center">Backers</h2>

Thank you so much for supporting us financially! 🙏🏻😎🥳👍

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars2.githubusercontent.com/u/17221813?v=4&s=150">
        </br>
        <a href="https://github.com/jsdevtom">Tom</a>
      </td>
    </tr>
  <tbody>
</table>

<h2 align="center">Maintainers</h2>

`st-route` is brought to you by:

<table>
  <tbody>
    <tr>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars3.githubusercontent.com/u/454817?v=4&s=150">
        </br>
        <a href="https://github.com/kyr0">Aron Homberg</a>
      </td>
      <td align="center">
        <img width="150" height="150"
        src="https://avatars.githubusercontent.com/u/45510?s=150&v=4">
        </br>
        <a href="https://github.com/PaulKinlan">Paul Kinlan</a>
      </td>
    </tr>
  <tbody>
</table>

Original implementation of the routing logic is based on ideas of <a href="https://github.com/PaulKinlan/leviroutes" target="_blank">LeviRoutes</a> developed by Paul Kinlan about 10 years ago -- however, this is a TypeScript-based clean room re-implementation which improves the original code in a few aspects.

<h2 align="center">Contributing</h2>

Please help out to make this project even better and see your name added to the list of our
[CONTRIBUTORS.md](./CONTRIBUTORS.md) :tada:
