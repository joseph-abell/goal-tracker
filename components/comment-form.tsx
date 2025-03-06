"use client"

import type React from "react"

import { useState } from "react"
import styles from "./comment-form.module.css"

interface CommentFormProps {
  onSubmit: (text: string) => void
  onCancel: () => void
}

export default function CommentForm({ onSubmit, onCancel }: CommentFormProps) {
  const [text, setText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (text.trim()) {
      onSubmit(text)
      setText("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a progress comment..."
        className={styles.textarea}
        required
      />
      <div className={styles.actions}>
        <button type="submit" className={styles.submitButton}>
          Add
        </button>
        <button type="button" onClick={onCancel} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </form>
  )
}

