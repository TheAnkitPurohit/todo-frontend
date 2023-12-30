import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import { useParams, useRouter } from 'src/routes/hooks';

import todoService from 'src/services/todoService';

import CustomizedProgressBars from 'src/components/loader';
import { useSettingsContext } from 'src/components/settings';

import TodoForm from './TodoForm';
import TodoDetail from './TodoDetail';
import TodoBackButton from './TodoBackButton';

export default function TodoDetailView() {
  const settings = useSettingsContext();
  const { id } = useParams();

  const router = useRouter();

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['product'],
    queryFn: () => todoService.getTodoById(String(id)),
  });

  if (isLoading) {
    return <CustomizedProgressBars />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <TodoBackButton />

        <Button
          onClick={() => {
            setIsEdit(!isEdit);
          }}
          variant="contained"
          size="medium"
          sx={{
            paddingX: 2,
          }}
          startIcon={!isEdit ? <EditOutlinedIcon /> : <CloseOutlinedIcon />}
        >
          {!isEdit ? 'Edit' : 'Cancel'}
        </Button>
      </Box>

      <Box
        sx={{
          mt: 5,
        }}
      >
        {isEdit ? <TodoForm type="update" todo={data} /> : <TodoDetail {...data} />}
      </Box>
    </Container>
  );
}
