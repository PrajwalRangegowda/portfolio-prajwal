import GitHubCalendar from "react-github-calendar";
import styles from "./GitHubCalendar.module.css";
import {useAuth} from '../context/AuthContext'

export default function GitHub(){
  
  const {user} = useAuth();

    return(
        <div className={styles.githubcalendar}>
          <h1 className={styles.h1}> {user?.name ?? ""} GitHub Contributions</h1>
        <GitHubCalendar username="PrajwalRangegowda" />
      </div>
    )
}