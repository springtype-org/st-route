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
