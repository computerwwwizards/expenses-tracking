import { useMemo } from 'react';
import './App.css';


import { routeTree } from './routeTree.gen'
import { createRouter,RouterProvider } from '@tanstack/react-router';
import { BasicContainer } from '@computerwwwizards/dependency-injection';
import type { GlobalServices } from './config/container/types';
import authPlugin from './config/container/bearerAuthState';
import userPlugin from './config/container/user'


const router = createRouter({ routeTree, context: null!, defaultViewTransition: {
  types: ['slide-from-right']
} })


declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}


const App = () => {
  const globalContainer = useMemo(()=>{
    const container = new BasicContainer<GlobalServices>();

    //Maybe we need a orchestrator fo containers
    
    container
      // Todo we need to register fallbacks I think
      // .useSubPlugin('alwaysAuth', 'mock')
      // we need to create a devtools
      .useMocks()
      .use(authPlugin)
      .use(userPlugin);


    return container;
  }, [])

  return (
    <RouterProvider 
      router={router} 
      context={{
        globalContainer
      }} 
    />
  );
};

export default App;
