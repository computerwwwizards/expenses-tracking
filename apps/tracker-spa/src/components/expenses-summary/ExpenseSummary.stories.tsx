import type { Meta, StoryObj } from "storybook-react-rsbuild";
import ExpensesSummary from "./ExpenseSummary";

const meta: Meta<typeof ExpensesSummary> = {
  component: ExpensesSummary,
  title: "Components/ExpensesSummary",
  tags: ["autodocs"],
  parameters: {
    layout: 'centered'
  },
  decorators: [Story=><div id="wrapper" style={{
    width:250,
    height: 250
  }}><Story /></div>]
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    expenses: [
      { groupName: "Food", amount: 500, color: "#3b82f6" },
      { groupName: "Transport", amount: 300, color: "#ef4444" },
      { groupName: "Entertainment", amount: 200, color: "#10b981" },
    ],
    outerLabelClassName: "text-xs font-bold fill-white",
  },
};

export const SingleExpense: Story = {
  args: {
    expenses: [{ groupName: "Rent", amount: 1500, color: "#3b82f6" }],
    outerLabelClassName: "text-xs font-bold fill-white",
  },
};

export const MultipleExpenses: Story = {
  args: {
    expenses: [
      { groupName: "Groceries", amount: 450, color: "#3b82f6" },
      { groupName: "Gas", amount: 200, color: "#ef4444" },
      { groupName: "Electricity", amount: 150, color: "#10b981" },
      { groupName: "Internet", amount: 80, color: "#f59e0b" },
      { groupName: "Dining Out", amount: 320, color: "#8b5cf6" },
    ],
    outerLabelClassName: "text-xs font-bold fill-white",
  },
};

export const UnbalancedExpenses: Story = {
  args: {
    expenses: [
      { groupName: "Housing", amount: 2000, color: "#3b82f6" },
      { groupName: "Food", amount: 400, color: "#ef4444" },
      { groupName: "Other", amount: 100, color: "#10b981" },
    ],
    outerLabelClassName: "text-xs font-bold fill-white",
  },
};

export const HighVariance: Story = {
  args: {
    expenses: [
      { groupName: "Rent", amount: 1200, color: "#3b82f6" },
      { groupName: "Utilities", amount: 150, color: "#ef4444" },
      { groupName: "Food", amount: 400, color: "#10b981" },
      { groupName: "Entertainment", amount: 50, color: "#f59e0b" },
      { groupName: "Travel", amount: 800, color: "#8b5cf6" },
    ],
    outerLabelClassName: "text-xs font-bold fill-white",
  },
};
