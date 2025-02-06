import GitHubCalendar from "react-github-calendar";
import styles from "./GitHubCalendar.module.css";
import { useAuth } from '../context/AuthContext';

export default function GitHub() {
  const { user, status, session } = useAuth();

  // If no session, return null (nothing will render)
  if (!session) {
    return null; // Or show a message like <p>Please log in to view contributions.</p>
  }

  // Extract the first name safely
  const firstName = user?.name?.split(" ")[0] ?? "";

  return (
    <div className={styles.githubcalendar}>
      <h1 className={styles.h1}>
        Hi! {firstName} Check out Prajwal's GitHub Contributions
      </h1>
      <GitHubCalendar username="PrajwalRangegowda" />
    </div>
  );
}
