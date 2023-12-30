import * as z from 'zod';
import { useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, Stack } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import todoService from 'src/services/todoService';

import RHFTextField from 'src/components/hook-form/RHFTextField';
import FormProvider from 'src/components/hook-form/form-provider';

import { Todo } from 'src/types/todoTypes';

interface TodoFormProps {
  todo?: Todo;
  type: 'create' | 'update';
}

const TodoForm = ({ todo, type }: TodoFormProps) => {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      name: todo?.name || '',
      description: todo?.description || '',
    }),
    [todo]
  );

  const NewTodoSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string(),
  });

  const methods = useForm({
    resolver: zodResolver(NewTodoSchema),
    defaultValues,
  });

  const isCreate = type === 'create';

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (isCreate) {
        await todoService.create(data);
      }
      reset();
      toast.success(!isCreate ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.root);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <RHFTextField name="name" label="Name" />

          <RHFTextField name="description" label="Description" multiline rows={4} />

          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            {isCreate ? 'Create Todo ' : 'Save Changes'}
          </LoadingButton>
        </Stack>
      </Card>
    </FormProvider>
  );
};

export default TodoForm;
