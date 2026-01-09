import { Link, Outlet, createFileRoute } from '@tanstack/react-router'


//TODO: ai generated bad catch, lets refactor
export const Route = createFileRoute('/(private)/(home)')({
  loader: async ({ context }) => {
    try {
      const user = context.globalContainer.get('user');
      const [fullName, email] = await Promise.all([
        user.getFullName(),
        user.getEmail(),
      ]);
      return { fullName, email };
    } catch (e){
      console.error(e)
      return { fullName: 'User', email: '' };
    }
  },
  component: HomeLayout,
});

function TabLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="px-4 py-2 rounded-full border transition-colors text-sm
                 border-gray-300 dark:border-gray-600
                 hover:bg-gray-100 dark:hover:bg-gray-800
                 data-[status=active]:bg-gray-900 data-[status=active]:text-white
                 data-[status=active]:dark:bg-gray-100 data-[status=active]:dark:text-gray-900"
      activeOptions={{ exact: true }}
      activeProps={{
        'data-status': 'active',
      }}
    >
      {children}
    </Link>
  );
}

function HomeLayout() {
  const data = Route.useLoaderData() as any;
  const { fullName, email } = data ?? {};

  return (
    <div className="grid gap-4">
      <header className="grid gap-1">
        <h1 className="text-xl font-semibold">Welcome {fullName}</h1>
        {email && <p className="text-sm text-gray-600 dark:text-gray-400">{email}</p>}
      </header>

      <nav className="flex items-center gap-2">
        <TabLink to="/expenses">Expenses</TabLink>
        <TabLink to="/incomes">Incomes</TabLink>
        <TabLink to="/analysis">Analysis</TabLink>
      </nav>

      <Outlet />
    </div>
  );
}
