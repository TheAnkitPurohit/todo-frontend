import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useSettingsContext } from 'src/components/settings';

import TodoForm from '../todo-detail/TodoForm';
import TodoBackButton from '../todo-detail/TodoBackButton';

// ----------------------------------------------------------------------

export default function CreateTodo() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <TodoBackButton />

      <Box
        sx={{
          mt: 5,
        }}
      >
        <TodoForm type="create" />
      </Box>
    </Container>
  );
}
