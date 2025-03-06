"use client"

import { useState } from "react"
import styles from "./goal-item.module.css"
import CommentList from "./comment-list"
import CommentForm from "./comment-form"

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

interface GoalItemProps {
  goal: Goal
  isExpanded: boolean
  onToggleExpand: () => void
  onUpdateGoal: (goal: Goal) => void
  onDeleteGoal: (id: string) => void
  onAddComment: (goalId: string, comment: Comment) => void
}

export default function GoalItem({
  goal,
  isExpanded,
  onToggleExpand,
  onUpdateGoal,
  onDeleteGoal,
  onAddComment,
}: GoalItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(goal.title)
  const [editedDescription, setEditedDescription] = useState(goal.description)
  const [showCommentForm, setShowCommentForm] = useState(false)

  const handleStatusChange = () => {
    onUpdateGoal({
      ...goal,
      status: goal.status === "completed" ? "in-progress" : "completed",
      updatedAt: new Date().toISOString(),
    })
  }

  const handleSaveEdit = () => {
    onUpdateGoal({
      ...goal,
      title: editedTitle,
      description: editedDescription,
      updatedAt: new Date().toISOString(),
    })
    setIsEditing(false)
  }

  const handleAddComment = (text: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      goalId: goal.id,
      text,
      createdAt: new Date().toISOString(),
    }
    onAddComment(goal.id, newComment)
    setShowCommentForm(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className={`${styles.item} ${goal.status === "completed" ? styles.completed : ""}`}>
      {isEditing ? (
        <div className={styles.editForm}>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className={styles.editInput}
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className={styles.editTextarea}
          />
          <div className={styles.editActions}>
            <button onClick={handleSaveEdit} className={styles.saveButton}>
              Save
            </button>
            <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.header} onClick={onToggleExpand}>
            <div className={styles.titleRow}>
              <input
                type="checkbox"
                checked={goal.status === "completed"}
                onChange={handleStatusChange}
                className={styles.checkbox}
                onClick={(e) => e.stopPropagation()}
              />
              <h3 className={styles.title}>{goal.title}</h3>
            </div>
            <div className={styles.meta}>
              <span className={styles.date}>Updated: {formatDate(goal.updatedAt)}</span>
              <span className={`${styles.arrow} ${isExpanded ? styles.expanded : ""}`}>▼</span>
            </div>
          </div>

          {isExpanded && (
            <div className={styles.details}>
              <p className={styles.description}>{goal.description}</p>

              <div className={styles.actions}>
                <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                  Edit
                </button>
                <button onClick={() => onDeleteGoal(goal.id)} className={styles.deleteButton}>
                  Delete
                </button>
              </div>

              <div className={styles.commentsSection}>
                <h4 className={styles.commentsTitle}>Progress Comments</h4>

                <CommentList comments={goal.comments || []} />

                {showCommentForm ? (
                  <CommentForm onSubmit={handleAddComment} onCancel={() => setShowCommentForm(false)} />
                ) : (
                  <button onClick={() => setShowCommentForm(true)} className={styles.addCommentButton}>
                    Add Comment
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

