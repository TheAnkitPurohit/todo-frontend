import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import { GridColDef } from '@mui/x-data-grid';
import { Button, Rating } from '@mui/material';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import todoService from 'src/services/todoService';

import TodoCard from 'src/components/card/TodoCard';
import CustomizedProgressBars from 'src/components/loader';
import { useSettingsContext } from 'src/components/settings';

import { Todo } from 'src/types/todoTypes';

// ----------------------------------------------------------------------

export default function TodoList() {
  const settings = useSettingsContext();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['products'],
    queryFn: todoService.getAll,
  });

  const router = useRouter();

  const ProductColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'category', headerName: 'category', width: 130 },
    { field: 'title', headerName: 'Title', width: 300 },
    {
      field: 'price',
      headerName: 'price',
      type: 'number',
      width: 90,
    },
    {
      field: 'rate',
      headerName: 'Rating',
      type: 'number',
      width: 180,
      renderCell: (params) => (
        <>
          <Rating name="half-rating" defaultValue={params?.row?.rating.rate || 0} precision={0.5} />
          <Typography sx={{ ml: 1 }}>{params?.row?.rating.rate || 0}</Typography>
        </>
      ),
    },
  ];

  const handleAddTodo = () => {
    router.push(paths.dashboard.create);
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

        <Button onClick={handleAddTodo}>Add Todo</Button>
      </Box>

      <Box
        sx={{
          mt: 5,
          width: 1,
          padding: '10px',
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)', // Set up five equal-width columns
            gap: 2, // Adjust the gap as needed
          }}
        >
          {data?.map((todo: Todo) => <TodoCard {...todo} />)}
        </Box>
        {/* <ProductTable data={data} columns={ProductColumns} /> */}
      </Box>
    </Container>
  );
}
