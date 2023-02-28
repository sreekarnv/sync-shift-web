import { AppContext } from '@/providers/app-provider';
import React from 'react';

const useAppContext = () => React.useContext(AppContext);

export default useAppContext;
