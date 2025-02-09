import GitHubCalendar from "react-github-calendar";
import styles from "./GitHubCalendar.module.css";
import { useAuth } from '../context/AuthContext';

export default function GitHub() {
  const { session } = useAuth();

  // If no session, return null (nothing will render)
  if (!session) {
    return null; // Or show a message like <p>Please log in to view contributions.</p>
  }

  // Extract the first name safely
  

  return (
    <div className={styles.githubcalendar}>
      <h1 className={styles.h1}>
        GitHub Contributions Calendar
      </h1>
      <GitHubCalendar username="PrajwalRangegowda" />
    </div>
  );
}
