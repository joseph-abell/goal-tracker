"use client"

import { useState } from "react"
import GoalItem from "./goal-item"
import styles from "./goal-list.module.css"

interface Goal {
  id: string
  title: string
  description: string
  type: "short" | "long"
  status: "in-progress" | "completed"
  createdAt: string
  updatedAt: string
  comments: Comment[]
}

interface Comment {
  id: string
  goalId: string
  text: string
  createdAt: string
}

interface GoalListProps {
  goals: Goal[]
  onUpdateGoal: (goal: Goal) => void
  onDeleteGoal: (id: string) => void
  onAddComment: (goalId: string, comment: Comment) => void
}

export default function GoalList({ goals, onUpdateGoal, onDeleteGoal, onAddComment }: GoalListProps) {
  const [expandedGoalId, setExpandedGoalId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpandedGoalId(expandedGoalId === id ? null : id)
  }

  if (goals.length === 0) {
    return <p className={styles.emptyMessage}>No goals added yet.</p>
  }

  return (
    <div className={styles.list}>
      {goals.map((goal) => (
        <GoalItem
          key={goal.id}
          goal={goal}
          isExpanded={expandedGoalId === goal.id}
          onToggleExpand={() => toggleExpand(goal.id)}
          onUpdateGoal={onUpdateGoal}
          onDeleteGoal={onDeleteGoal}
          onAddComment={onAddComment}
        />
      ))}
    </div>
  )
}

