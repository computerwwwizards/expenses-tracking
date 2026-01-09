import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import TransactionForm from './IncomeForm';

const meta: Meta<typeof TransactionForm> = {
  title: 'Components/Forms/TransactionForm',
  component: TransactionForm,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TransactionForm>;

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-150">
      <TransactionForm onSubmit={async () => { /* pretend success */ }} />
    </div>
  ),
};

export const Income: Story = {
  render: () => (
    <div className="w-full max-w-150">
      <TransactionForm
        titleChip="Income"
        namePlaceholder="Name of income"
        onSubmit={async () => {}}
      />
    </div>
  ),
};

export const Expense: Story = {
  render: () => (
    <div className="w-full max-w-150">
      <TransactionForm
        titleChip="Expense"
        chipColor="danger"
        namePlaceholder="Name of expense"
        onSubmit={async () => {}}
      />
    </div>
  ),
};

export const WithDefaults: Story = {
  render: () => (
    <div className="w-full max-w-150">
      <TransactionForm
        defaultValues={{ name: 'Salary', amount: 2500, description: 'Main job', monthly: true }}
        onSubmit={async () => {}}
      />
    </div>
  ),
};

export const SlowSave: Story = {
  render: () => (
    <div className="w-full max-w-150">
      <TransactionForm
        onSubmit={async () => {
          await new Promise((r) => setTimeout(r, 2000));
        }}
      />
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-full max-w-150">
      <TransactionForm
        onSubmit={async () => {
          await new Promise((r) => setTimeout(r, 300));
          throw new Error('Backend says nope: invalid amount');
        }}
      />
    </div>
  ),
};
