import React from 'react';
import {AuthProvider} from './AuthProvider';
import NavigationList from './NavigationList';

const Provider = () => {
  return (
    <AuthProvider>
      <NavigationList />
    </AuthProvider>
  );
};

export default Provider;
