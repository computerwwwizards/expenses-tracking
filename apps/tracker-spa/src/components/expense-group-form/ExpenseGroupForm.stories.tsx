import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import ExpenseGroupForm from './ExpenseGroupForm';

const meta: Meta<typeof ExpenseGroupForm> = {
  title: 'Components/Forms/ExpenseGroupForm',
  component: ExpenseGroupForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-full max-w-150">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ExpenseGroupForm>;

export const Default: Story = {
  args: {
    onSubmit: async () => {}
  },
};

export const WithDefaults: Story = {
  args: {
    defaultValues: {
      name: 'Food & Dining',
      icon: 'food',
      color: 'orange',
      description: 'Restaurants, groceries, and snacks',
    },
    onSubmit: async () => {},
  },
};

export const SlowSave: Story = {
  args: {
    onSubmit: async () => {
      await new Promise((r) => setTimeout(r, 2000));
    },
  },
};

export const WithError: Story = {
  args: {
    onSubmit: async () => {
      await new Promise((r) => setTimeout(r, 300));
      throw new Error('Group name already exists');
    },
  },
};
