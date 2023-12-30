import { Helmet } from 'react-helmet-async';

import TodoDetail from 'src/sections/todo-detail/view';

// ----------------------------------------------------------------------

export default function TodoDetailPage() {
  return (
    <>
      <Helmet>
        <title> TodoDetail</title>
      </Helmet>

      <TodoDetail />
    </>
  );
}
