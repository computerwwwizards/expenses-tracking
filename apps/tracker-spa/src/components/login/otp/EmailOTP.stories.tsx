import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import EmailOTPLogin from './EmailOTP';

const meta: Meta<typeof EmailOTPLogin> = {
  title: 'Components/Login/EmailOTP',
  component: EmailOTPLogin,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmailOTPLogin>;

export const Default: Story = {
  args: {
    sendEmail: async (email: string) => {
      console.log('Sending email to:', email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
  },
};

export const WithError: Story = {
  args: {
    sendEmail: async (email: string) => {
      console.log('Attempting to send email to:', email);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error('Failed to send email. Please try again.');
    },
  },
};

export const SlowNetwork: Story = {
  args: {
    sendEmail: async (email: string) => {
      console.log('Sending email to:', email);
      await new Promise((resolve) => setTimeout(resolve, 3000));
    },
  },
};

export const InstantSuccess: Story = {
  args: {
    sendEmail: async (email: string) => {
      console.log('Email sent to:', email);
    },
  },
};
