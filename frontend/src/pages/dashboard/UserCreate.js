import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
import { getUserList } from '../../redux/slices/user';

// components
import Page from '../../components/Page';
import UserNewForm from '../../components/_dashboard/user/UserNewForm';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { pathname } = useLocation();
  const { name } = useParams();

  return (
    <Page title="User: Create a new user | Minimal-UI">
      <Container maxWidth={'lg'}>
        <UserNewForm  />
      </Container>
    </Page>
  );
}
