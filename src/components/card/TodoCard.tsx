/* eslint-disable no-nested-ternary */
import React from 'react';

import { Box, Paper, Stack, alpha, ListItemText } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { Todo } from 'src/types/todoTypes';

interface TodoCardProps extends Todo {
  handleClick: (id: number) => void;
}

const TodoCard = ({ created, description, id, name, updated, handleClick }: TodoCardProps) => {
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
        // bgcolor: 'unset',
        cursor: 'pointer',
        position: 'relative',
        bgcolor: (theme) => alpha(theme.palette.info.darker, 0.04),
      }}
    >
      <Box onClick={(e) => e.stopPropagation()}>
        <Box
          component="img"
          src="/assets/icons/files/ic_folder.svg"
          sx={{ width: 36, height: 36 }}
          onClick={() => {
            handleClick(id);
          }}
        />
      </Box>

      <ListItemText
        primary={name}
        secondary={
          <>
            {/* {fData(folder.size)} */}
            {description
              ? description?.length < 50
                ? description
                : `${description?.slice(0, 50)}...`
              : ''}
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
