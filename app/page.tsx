"use client"

import { useEffect, useState } from "react"
import GoalList from "../components/goal-list"
import GoalForm from "../components/goal-form"
import styles from "./page.module.css"

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

export default function Home() {
  const [activeTab, setActiveTab] = useState<"short" | "long">("short")
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    if (isLoading) {
      // Load goals from localStorage on component mount
      const storedGoals = localStorage.getItem("goals")
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals))
      }
      setIsLoading(false);
    }
  }, [isLoading])

  useEffect(() => {
    if (!isLoading) {
    // Save goals to localStorage whenever they change
    localStorage.setItem("goals", JSON.stringify(goals))
    }

  }, [goals, isLoading])

  const addGoal = (goal: Goal) => {
    setGoals([...goals, goal])
    setIsFormVisible(false)
  }

  const updateGoal = (updatedGoal: Goal) => {
    setGoals(goals.map((goal) => (goal.id === updatedGoal.id ? updatedGoal : goal)))
  }

  const deleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id))
  }

  const addComment = (goalId: string, comment: Comment) => {
    setGoals(
      goals.map((goal) => {
        if (goal.id === goalId) {
          return {
            ...goal,
            comments: [...(goal.comments || []), comment],
          }
        }
        return goal
      }),
    )
  }

  const filteredGoals = goals.filter((goal) => goal.type === activeTab)

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Goal Tracker</h1>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === "short" ? styles.active : ""}`}
          onClick={() => setActiveTab("short")}
        >
          Short-term Goals
        </button>
        <button
          className={`${styles.tab} ${activeTab === "long" ? styles.active : ""}`}
          onClick={() => setActiveTab("long")}
        >
          Long-term Goals
        </button>
      </div>

      {isFormVisible ? (
        <GoalForm onSubmit={addGoal} onCancel={() => setIsFormVisible(false)} goalType={activeTab} />
      ) : (
        <button className={styles.addButton} onClick={() => setIsFormVisible(true)}>
          Add New Goal
        </button>
      )}

      <GoalList goals={filteredGoals} onUpdateGoal={updateGoal} onDeleteGoal={deleteGoal} onAddComment={addComment} />
    </main>
  )
}

