interface Goal {
  id: string
  title: string
  description: string
  type: "short" | "long"
  status: "in-progress" | "completed"
  createdAt: string
  updatedAt: string
  comments?: Comment[]
}

interface Comment {
  id: string
  goalId: string
  text: string
  createdAt: string
}

