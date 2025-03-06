import styles from "./comment-list.module.css"

interface Comment {
  id: string
  text: string
  createdAt: string
}

interface CommentListProps {
  comments: Comment[]
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return <p className={styles.emptyComments}>No comments yet.</p>
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className={styles.commentList}>
      {comments.map((comment) => (
        <div key={comment.id} className={styles.comment}>
          <p className={styles.commentText}>{comment.text}</p>
          <span className={styles.commentDate}>{formatDate(comment.createdAt)}</span>
        </div>
      ))}
    </div>
  )
}

