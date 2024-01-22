import { useEffect } from 'react';

import Box from '@mui/material/Box';

import { useRouter } from 'src/routes/hooks';

import useAuth from 'src/hooks/use-auth';
import { useBoolean } from 'src/hooks/use-boolean';

import { PATH_AFTER_REGISTER } from 'src/config-global';

import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const nav = useBoolean();
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push(PATH_AFTER_REGISTER);
    }
  }, []);

  return (
    <>
      <Header onOpenNav={nav.onTrue} />

      <Box
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
        }}
      >
        <Main>{children}</Main>
      </Box>
    </>
  );
}
