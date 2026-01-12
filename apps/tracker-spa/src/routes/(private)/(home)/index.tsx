import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(private)/(home)/')({
  loader: async ({ context }) => {
    const user = context.globalContainer.get('user');
    const budgetQuery = context.budgetContainer.get("budgetQuery");

    const latestModified = Promise.all([
      import('@components/icon/Icon').then(module => module.getIconsByName()),
      budgetQuery.getLatestModified()
    ]).then(([iconsByName, budgets]) => {
      return budgets.map(({ icon, ...rest }) => ({
        ...rest,
        icon: iconsByName[icon]({})
      }));
    });

    const [fullName, email] = await Promise.all([
      user.getFullName(),
      user.getEmail(),
    ]);

    return { fullName, email, latestModified };

  },
})

