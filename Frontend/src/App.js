import React from 'react';
import Layout from './routes/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from './Validate/AuthContext';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { GlobalStoreContext } from 'context/GlobalContext';
const clientQuery = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={clientQuery}>
      <GlobalStoreContext>
        <ToastContainer
          autoClose={3000}
          style={{ width: 250 }}
          hideProgressBar={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
        />
        {/* auth config  */}
        <AuthContext>
          {/* page layout  */}
          <Layout />
        </AuthContext>
      </GlobalStoreContext>
    </QueryClientProvider>
  );
};

export default App;
