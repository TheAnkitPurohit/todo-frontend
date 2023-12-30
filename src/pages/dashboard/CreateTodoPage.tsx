import { Helmet } from 'react-helmet-async';

import CreateTodo from 'src/sections/create-todo/view';

// ----------------------------------------------------------------------

export default function CreateTodoPage() {
  return (
    <>
      <Helmet>
        <title> Create </title>
      </Helmet>

      <CreateTodo />
    </>
  );
}
