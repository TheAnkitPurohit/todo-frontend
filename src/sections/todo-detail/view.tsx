import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { useParams, useRouter } from 'src/routes/hooks';

import todoService from 'src/services/todoService';

import CustomizedProgressBars from 'src/components/loader';
import { useSettingsContext } from 'src/components/settings';

import TodoForm from './TodoForm';
import TodoBackButton from './TodoBackButton';

export default function TodoDetail() {
  const settings = useSettingsContext();
  const { id } = useParams();

  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product'],
    queryFn: () => todoService.getTodoById(String(id)),
  });

  if (isLoading) {
    return <CustomizedProgressBars />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <TodoBackButton />

      <Box
        sx={{
          mt: 5,
        }}
      >
        <TodoForm type="update" todo={data} />
      </Box>
    </Container>
  );
}
