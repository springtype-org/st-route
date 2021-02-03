import { tsx, render, Ref } from 'springtype';
import { $ } from 'st-query';
import { route, RouteRequest } from '../../../dist';

const nav = route();

const HomePage = () => (
  <div>
    HomePage
    <br />
    <a href="/blog">Go to BlogPage</a>
  </div>
);
const BlogPage = () => <div>BlogPage</div>;

const BlogArticlePage = ({ request }: { request: RouteRequest }) => (
  <div>
    Blog / show article:
    {request.params.slug}
  </div>
);

const RouteList = () => {
  const containerRef: Ref = {};

  nav.get('/', () => {
    $(containerRef.current).html(<HomePage />);
  });

  nav.get('/blog', () => {
    $(containerRef.current).html(<BlogPage />);
  });

  nav.get('/blog/article/:slug', (request: RouteRequest) => {
    $(containerRef.current).html(<BlogArticlePage request={request} />);
  });

  return <div ref={containerRef}>Loading...</div>;
};
render(<RouteList />);

// initial match after initial render
nav.match();
