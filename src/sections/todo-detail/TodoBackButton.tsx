import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';

const TodoBackButton = () => (
  <Button
    component={RouterLink}
    href={paths.dashboard.root}
    startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
  >
    Back
  </Button>
);

export default TodoBackButton;
