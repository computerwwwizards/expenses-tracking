import type { Meta, StoryObj } from 'storybook-react-rsbuild';
import {
  MoneyIcon,
  EducationIcon,
  PartyIcon,
  LoveIcon,
  HealthIcon,
  TechIcon,
  BookIcon,
  QuestionIcon,
  DangerIcon,
  ExclamationIcon,
  FoodIcon,
  HomeIcon,
  BulbIcon,
  CarIcon,
  HappyIcon,
  SadIcon,
  ChurchIcon,
  PlaneIcon,
} from './Icon';

const meta: Meta = {
  title: 'Components/Misc/Icon',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const AllIcons: Story = {
  render: () => (
    <div className="grid grid-cols-4 gap-6">
      <div className="flex flex-col items-center gap-2">
        <MoneyIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">money</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <EducationIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">education</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PartyIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">party</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <LoveIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">love</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HealthIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">health</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <TechIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">tech</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BookIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">book</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <QuestionIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">question</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <DangerIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">danger</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ExclamationIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">exclamation</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <FoodIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">food</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HomeIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">home</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <BulbIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">bulb</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <CarIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">car</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <HappyIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">happy</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <SadIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">sad</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ChurchIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">church</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <PlaneIcon size={32} />
        <span className="text-sm text-gray-600 dark:text-gray-400">plane</span>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <LoveIcon size={16} />
      <LoveIcon size={24} />
      <LoveIcon size={32} />
      <LoveIcon size={48} />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <HealthIcon className="text-green-600" />
      <DangerIcon className="text-red-600" />
      <BulbIcon className="text-yellow-500" />
      <TechIcon className="text-blue-600" />
      <LoveIcon className="text-pink-500" />
    </div>
  ),
};

export const InText: Story = {
  render: () => (
    <div className="text-lg">
      <p className="flex items-center gap-2">
        <HomeIcon size={20} /> Welcome home
      </p>
      <p className="flex items-center gap-2 text-red-600">
        <ExclamationIcon size={20} /> Important warning
      </p>
      <p className="flex items-center gap-2 text-green-600">
        <MoneyIcon size={20} /> Payment received
      </p>
    </div>
  ),
};
