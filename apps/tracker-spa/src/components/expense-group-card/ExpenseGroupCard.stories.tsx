import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import { ExpenseGroupCard } from './ExpenseGroupCard';
import { MoneyIcon, FoodIcon, CarIcon, HomeIcon, HealthIcon } from '../icon/Icon';

const meta = {
  component: ExpenseGroupCard,
  title: 'Components/ExpenseGroupCard',
  tags: ['autodocs'],
  argTypes: {
    onEdit: { action: 'edit clicked' },
  },
  parameters: {
    layout: 'centered'
  },
  decorators: [Story=><div style={{'width': '300px'}} ><Story/></div>
  ],
} satisfies Meta<typeof ExpenseGroupCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: 'Groceries',
    amount: 450.00,
    icon: <FoodIcon size={24} />,
    expenseId: 'groceries',
    color: '#3B82F6'
  },
};

export const WithoutEdit: Story = {
  args: {
    name: 'Transportation',
    amount: 120.50,
    icon: <CarIcon size={24} />,
    expenseId: 'transportation',
    color: '#22C55E'
  },
};

export const LargeAmount: Story = {
  args: {
    name: 'Rent',
    amount: 2500.00,
    icon: <HomeIcon size={24} />,
    expenseId: 'rent',
    color: '#A855F7'
  },
};

export const SmallAmount: Story = {
  args: {
    name: 'Coffee',
    amount: 4.50,
    icon: <MoneyIcon size={24} />,
    expenseId: 'coffee',
    color: '#F97316'
  },
};

export const Healthcare: Story = {
  args: {
    name: 'Medical',
    amount: 350.75,
    icon: <HealthIcon size={24} />,
    expenseId: 'medical',
    color: '#EF4444'
  },
};

export const List = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <ExpenseGroupCard
        name="Groceries"
        amount={450.00}
        icon={<FoodIcon size={24} />}
        expenseId="groceries"
        color="#3B82F6"
        onEdit={()=>{}}
      />
      <ExpenseGroupCard
        name="Transportation"
        amount={120.50}
        icon={<CarIcon size={24} />}
        expenseId="transportation"
        color="#22C55E"
        onEdit={()=>{}}
      />
      <ExpenseGroupCard
        name="Rent"
        amount={2500.00}
        icon={<HomeIcon size={24} />}
        expenseId="rent"
        color="#A855F7"
        onEdit={()=>{}}
      />
      <ExpenseGroupCard
        name="Medical"
        amount={350.75}
        icon={<HealthIcon size={24} />}
        expenseId="medical"
        color="#EF4444"
        onEdit={()=>{}}
      />
      <ExpenseGroupCard
        name="Coffee"
        amount={4.50}
        icon={<MoneyIcon size={24} />}
        expenseId="coffee"
        color="#F97316"
        onEdit={()=>{}}
      />
    </div>
  ),
};
