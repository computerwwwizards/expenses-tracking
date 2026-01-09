import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import type { ChangeEvent, ComponentProps } from 'react';
import { useState } from 'react';
import Switch from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Inputs/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Switch aria-label="Enable notifications" />
      <span>Enable notifications</span>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="grid gap-3">
      <div className="flex items-center gap-2"><Switch size="sm" aria-label="Small" /><span>Small</span></div>
      <div className="flex items-center gap-2"><Switch size="md" aria-label="Medium" /><span>Medium</span></div>
      <div className="flex items-center gap-2"><Switch size="lg" aria-label="Large" /><span>Large</span></div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="grid gap-3">
      <div className="flex items-center gap-2"><Switch disabled aria-label="Disabled off" /><span>Disabled off</span></div>
      <div className="flex items-center gap-2"><Switch disabled defaultChecked aria-label="Disabled on" /><span>Disabled on</span></div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="grid gap-3">
      <div className="flex items-center gap-2"><Switch variant="primary" aria-label="Primary" /><span>Primary</span></div>
      <div className="flex items-center gap-2"><Switch variant="neutral" aria-label="Neutral" /><span>Neutral</span></div>
    </div>
  ),
};

export const Controlled: Story = {
  render: (args: ComponentProps<typeof Switch>) => {
    const [on, setOn] = useState(false);
    return (
      <div className="grid gap-3">
        <div className="flex items-center gap-2">
          <Switch
            {...args}
            checked={on}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setOn(e.currentTarget.checked)}
            aria-label="Controlled switch"
          />
          <span>Controlled: {on ? 'On' : 'Off'}</span>
        </div>
        <button className="px-3 py-2 rounded bg-blue-600 text-white" onClick={() => setOn((v) => !v)}>
          Toggle from parent
        </button>
      </div>
    );
  },
};
