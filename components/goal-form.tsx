"use client"

import type React from "react"

import { useState } from "react"
import styles from "./goal-form.module.css"

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

interface GoalFormProps {
  onSubmit: (goal: Goal) => void
  onCancel: () => void
  goalType: "short" | "long"
}

export default function GoalForm({ onSubmit, onCancel, goalType }: GoalFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (title.trim() && description.trim()) {
      const now = new Date().toISOString()
      const newGoal: Goal = {
        id: Date.now().toString(),
        title,
        description,
        type: goalType,
        status: "in-progress",
        createdAt: now,
        updatedAt: now,
        comments: [],
      }

      onSubmit(newGoal)
      setTitle("")
      setDescription("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.formTitle}>Add New {goalType === "short" ? "Short-term" : "Long-term"} Goal</h2>

      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.input}
          placeholder="Enter goal title"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
          placeholder="Enter goal description"
          required
        />
      </div>

      <div className={styles.formActions}>
        <button type="submit" className={styles.submitButton}>
          Save Goal
        </button>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  )
}

