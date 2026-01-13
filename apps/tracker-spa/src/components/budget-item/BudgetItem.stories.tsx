import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import BudgetItem from './BudgetItem';
import { MoneyIcon, HomeIcon, CarIcon, HealthIcon, FoodIcon } from '../icon/Icon';

const meta = {
  component: BudgetItem,
  title: 'Components/BudgetItem',
  tags: ['autodocs'],
  argTypes: {
    onEdit: { action: 'edit clicked' },
  },
  parameters: {
    layout: 'centered',
  },
  decorators: [Story => <div style={{ width: '300px' }}><Story /></div>],
} satisfies Meta<typeof BudgetItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Monthly Groceries',
    icon: <FoodIcon size={24} />,
    budgetId: 'groceries',
    color: '#3B82F6',
  },
};

export const Housing: Story = {
  args: {
    name: 'Housing',
    icon: <HomeIcon size={24} />,
    budgetId: 'housing',
    color: '#A855F7',
  },
};

export const Transport: Story = {
  args: {
    name: 'Transportation',
    icon: <CarIcon size={24} />,
    budgetId: 'transport',
    color: '#22C55E',
  },
};

export const Healthcare: Story = {
  args: {
    name: 'Healthcare',
    icon: <HealthIcon size={24} />,
    budgetId: 'healthcare',
    color: '#EF4444',
  },
};

export const Savings: Story = {
  args: {
    name: 'Monthly Savings',
    icon: <MoneyIcon size={24} />,
    budgetId: 'savings',
    color: '#F97316',
  },
};

export const List = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '400px' }}>
      <BudgetItem
        name="Monthly Groceries"
        icon={<FoodIcon size={24} />}
        budgetId="groceries"
        color="#3B82F6"
        onEdit={() => {}}
      />
      <BudgetItem
        name="Housing"
        icon={<HomeIcon size={24} />}
        budgetId="housing"
        color="#A855F7"
        onEdit={() => {}}
      />
      <BudgetItem
        name="Transportation"
        icon={<CarIcon size={24} />}
        budgetId="transport"
        color="#22C55E"
        onEdit={() => {}}
      />
      <BudgetItem
        name="Healthcare"
        icon={<HealthIcon size={24} />}
        budgetId="healthcare"
        color="#EF4444"
        onEdit={() => {}}
      />
      <BudgetItem
        name="Monthly Savings"
        icon={<MoneyIcon size={24} />}
        budgetId="savings"
        color="#F97316"
        onEdit={() => {}}
      />
    </div>
  ),
};
