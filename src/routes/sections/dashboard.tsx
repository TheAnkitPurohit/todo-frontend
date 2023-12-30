import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const TodoListPage = lazy(() => import('src/pages/dashboard/TodoListPage'));
const TodoDetailPage = lazy(() => import('src/pages/dashboard/TodoDetailPage'));
const CreateTodoPage = lazy(() => import('src/pages/dashboard/CreateTodoPage'));

// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <DashboardLayout>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      { element: <TodoListPage />, index: true },
      { path: ':id', element: <TodoDetailPage /> },
      { path: 'create', element: <CreateTodoPage /> },
    ],
  },
];
