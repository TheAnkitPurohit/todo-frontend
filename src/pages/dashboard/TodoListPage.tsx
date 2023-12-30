import { Helmet } from 'react-helmet-async';

import TodoList from 'src/sections/tofo-list/view';

// ----------------------------------------------------------------------

export default function TodoListPage() {
  return (
    <>
      <Helmet>
        <title> TodoList</title>
      </Helmet>

      <TodoList />
    </>
  );
}
