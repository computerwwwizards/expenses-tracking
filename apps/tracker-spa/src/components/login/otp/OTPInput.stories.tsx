import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import OTPInput from './OTPInput';

const meta: Meta<typeof OTPInput> = {
  title: 'Components/Login/OTPInput',
  component: OTPInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof OTPInput>;

export const Default: Story = {
  args: {
    email: 'user@example.com',
    eta: 100000, // 100 seconds
    sendOTP: async (otp: string) => {
      console.log('Verifying OTP:', otp);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onResend: async () => {
      console.log('Resending OTP');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return 100000; // Returns new eta
    },
  },
};

export const ResendWithNewEta: Story = {
  args: {
    email: 'user@example.com',
    eta: 10000,
    sendOTP: async (otp: string) => {
      console.log('Verifying OTP:', otp);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onResend: async () => {
      console.log('Resending OTP');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return 20000;
    },
  },
};

export const ResendWithError: Story = {
  args: {
    email: 'user@example.com',
    eta: 100000,
    sendOTP: async (otp: string) => {
      console.log('Attempting to verify OTP:', otp);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error('Invalid OTP. Please try again.');
    },
    onResend: async () => {
      console.log('Attempting to resend OTP');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      throw new Error('Failed to resend. Please try again.');
    },
  },
};

export const ShortTimer: Story = {
  args: {
    email: 'user@example.com',
    eta: 30000, // 30 seconds to see expiration quickly
    sendOTP: async (otp: string) => {
      console.log('Verifying OTP:', otp);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    },
    onResend: async () => {
      console.log('Resending OTP');
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return 30000; // Reset to 30 seconds again
    },
  },
};

export const FastVerification: Story = {
  args: {
    email: 'user@example.com',
    eta: 300000, // 5 minutes
    sendOTP: async (otp: string) => {
      console.log('OTP verified:', otp);
      // No delay, instant verification
    },
    onResend: async () => {
      console.log('Resending OTP');
      // No delay, instant resend
      return 300000;
    },
  },
};
