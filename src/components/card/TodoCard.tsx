import React from 'react';

import { Box, Paper, Stack, ListItemText } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { Todo } from 'src/types/todoTypes';

const TodoCard = ({ created, description, id, name, updated }: Todo) => {
  const router = useRouter();

  const handleProduct = () => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={1}
      alignItems="flex-start"
      onClick={handleProduct}
      sx={{
        p: 2.5,
        //   maxWidth: 222,
        flex: 1,
        borderRadius: 2,
        bgcolor: 'unset',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <Box>
        <Box
          component="img"
          src="/assets/icons/files/ic_folder.svg"
          sx={{ width: 36, height: 36 }}
        />
      </Box>

      <ListItemText
        primary={name}
        secondary={
          <>
            {/* {fData(folder.size)} */}
            {description}
            {/* <Box
                  component="span"
                  sx={{
                    mx: 0.75,
                    width: 2,
                    height: 2,
                    borderRadius: '50%',
                    bgcolor: 'currentColor',
                  }}
                />
                {folder.totalFiles} files */}
          </>
        }
        primaryTypographyProps={{
          noWrap: true,
          typography: 'subtitle1',
        }}
        secondaryTypographyProps={{
          mt: 0.5,
          component: 'span',
          alignItems: 'center',
          typography: 'caption',
          color: 'text.disabled',
          display: 'inline-flex',
        }}
      />

      {/* {renderAction}
      
          {renderText} */}
    </Stack>
  );
};

export default TodoCard;
