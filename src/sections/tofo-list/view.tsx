import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import todoService from 'src/services/todoService';

import TodoCard from 'src/components/card/TodoCard';
import CustomizedProgressBars from 'src/components/loader';
import { useSettingsContext } from 'src/components/settings';
import DeleteTodoModal from 'src/components/models/DeleteTodoModal';

import { Todo } from 'src/types/todoTypes';

// ----------------------------------------------------------------------

export default function TodoList() {
  const settings = useSettingsContext();

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: todoService.getAll,
  });

  console.log({ data });

  const router = useRouter();

  const handleAddTodo = () => {
    router.push(paths.dashboard.create);
  };

  const [open, setOpen] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<number>();

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleClick = (id: number) => {
    setSelectedTodo(id);
    setOpen(true);
  };

  const handleDeleteTodo = async () => {
    try {
      await todoService.delete(selectedTodo as number);
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    } catch (error) {
      console.log({ error });
    } finally {
      setOpen(false);
      setSelectedTodo(undefined);
    }
  };

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
        <Typography variant="h4"> Todo Page </Typography>

        <Button
          onClick={handleAddTodo}
          variant="contained"
          size="medium"
          startIcon={<AddOutlinedIcon />}
        >
          Add Todo
        </Button>
      </Box>

      <Box
        sx={{
          mt: 5,
          width: 1,
          padding: '10px',
          borderRadius: 2,
          // bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          // border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)', // Set up five equal-width columns
            gap: 2, // Adjust the gap as needed
          }}
        >
          {data?.map((todo: Todo) => <TodoCard {...todo} handleClick={handleClick} />)}
        </Box>

        <DeleteTodoModal
          open={open}
          handleClose={handleCloseModal}
          handleDelete={handleDeleteTodo}
        />
      </Box>
    </Container>
  );
}
