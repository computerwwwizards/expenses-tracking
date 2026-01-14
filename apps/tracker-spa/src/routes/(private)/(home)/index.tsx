import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/(home)/')({
  loaderDeps({ search }: {search : {userName?: string, email?: string}}){

    return {
      userName: search.userName,
      email: search.email
    }
  },
  loader: async ({ context, deps }) => {
    const loader = await import('./-index/loader');
    return await loader.default(
      { globalContainer: context.globalContainer, budgetContainer: context.budgetContainer },
      deps
    );
  },
})

