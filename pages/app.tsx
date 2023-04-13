import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import { UserProfile } from '@auth0/nextjs-auth0/client';
import React, { FC } from 'react';

interface IAPP {
  user: UserProfile;
}

const App: FC<IAPP> = ({ user }) => {
  return <div>This is the App page {user.name} </div>;
};

export const getServerSideProps = withPageAuthRequired();

export default App;
