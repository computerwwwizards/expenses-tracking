import type { Meta, StoryObj } from '@storybook/react';
import Timer from './Timer';

const meta: Meta<typeof Timer> = {
  title: 'Components/Timer',
  component: Timer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    initialEta: {
      control: { type: 'number' },
      description: 'Initial time in milliseconds',
    },
    refreshRate: {
      control: { type: 'number' },
      description: 'How often the timer updates (ms)',
    },
    step: {
      control: { type: 'number' },
      description: 'How much to decrease each tick (ms)',
    },
    onStop: {
      action: 'stopped',
      description: 'Callback when timer reaches zero',
    },
    onTick: {
      action: 'ticked',
      description: 'Callback on each tick with (prevEta, newEta)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Timer>;

export const Default: Story = {
  args: {
    initialEta: 60000,
  },
};

export const ThirtySeconds: Story = {
  args: {
    initialEta: 30000,
  },
};

export const FiveMinutes: Story = {
  args: {
    initialEta: 300000,
  },
};

export const FastTicking: Story = {
  args: {
    initialEta: 10000,
    refreshRate: 100,
    step: 100,
  },
};

export const SlowTicking: Story = {
  args: {
    initialEta: 30000,
    refreshRate: 2000,
    step: 2000,
  },
};

export const WithCallbacks: Story = {
  args: {
    initialEta: 10000,
    onStop: () => {
      console.log('Timer stopped!');
      alert('Timer finished!');
    },
    onTick: (prevEta: number, newEta: number) => {
      console.log(`Ticked from ${prevEta}ms to ${newEta}ms`);
    },
  },
};

export const CustomFormatter: Story = {
  args: {
    initialEta: 90000, // 1.5 minutes
    etaFormatter: (ms: number) => {
      const totalSeconds = Math.floor(ms / 1000);
      return `${totalSeconds}s remaining`;
    },
  },
};

export const HoursMinutesSeconds: Story = {
  args: {
    initialEta: 3665000, // 1 hour, 1 minute, 5 seconds
    etaFormatter: (ms: number) => {
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
  },
};

export const ShortDuration: Story = {
  args: {
    initialEta: 5000, // 5 seconds
  },
};
