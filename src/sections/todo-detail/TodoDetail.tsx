import React from 'react';

import { Card, Stack, Typography } from '@mui/material';

import { Todo } from 'src/types/todoTypes';

const TodoDetail = ({ name, description }: Todo) => (
  <Card
    sx={{
      p: 3,
      maxWidth: '50%',
    }}
  >
    <Stack spacing={3}>
      <Typography variant="h1">{name}</Typography>

      <Typography variant="body1">{description}</Typography>
      {/* <RHFTextField name="name" label="Name" />

      <RHFTextField name="description" label="Description" multiline rows={4} />

      <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
        {isCreate ? 'Create Todo ' : 'Save Changes'}
      </LoadingButton> */}
    </Stack>
  </Card>
);

export default TodoDetail;
