import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import Chip from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Misc/Chip',
  component: Chip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  render: () => <Chip>Income</Chip>,
};

export const Variants: Story = {
  render: () => (
    <div className="grid gap-3">
      <Chip color="success">Success</Chip>
      <Chip color="warning">Warning</Chip>
      <Chip color="danger">Danger</Chip>
      <Chip color="neutral">Neutral</Chip>
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className="grid gap-3">
      <Chip color="success" tone="outline">Success</Chip>
      <Chip color="warning" tone="outline">Warning</Chip>
      <Chip color="danger" tone="outline">Danger</Chip>
      <Chip color="neutral" tone="outline">Neutral</Chip>
    </div>
  ),
};
