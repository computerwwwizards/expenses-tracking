import type { Meta, StoryObj } from "@storybook/react"
import InfiniteScroll from "./InfiniteScroll"

const meta = {
  component: InfiniteScroll,
  title: "Components/InfiniteScroll",
  tags: ["autodocs"],
} satisfies Meta<typeof InfiniteScroll>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
