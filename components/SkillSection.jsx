import { useEffect, useState } from "react";
import styles from "./SkillSection.module.css";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [prop, setProp] = useState([]);
  const [loading, setLoading] = useState(true);  // Track loading state

  useEffect(() => {
    const fetchFreshData = async () => {
      try {
        const res = await fetch("/api/notion/skillsList");
        if (!res.ok) throw new Error(`API error! Status: ${res.status}`);
        const freshData = await res.json();
        setData(freshData);
      } catch (error) {
        console.error("Error fetching fresh API data:", error);
      }
    };

    const fetchDatabaseProperties = async () => {
      try {
        const res = await fetch("/api/notion/skillsDatabase");
        if (!res.ok) throw new Error(`API error! Status: ${res.status}`);
        const freshProp = await res.json();
        const options = freshProp.Category?.select?.options;

        if (Array.isArray(options)) {
          setProp(options);
        } else {
          console.error("Expected an array but got:", options);
        }
      } catch (error) {
        console.error("Error fetching Database properties API Data:", error);
      }
    };

    // Fetch both APIs and update the loading state when done
    const fetchData = async () => {
      await Promise.all([fetchDatabaseProperties(), fetchFreshData()]);
      setLoading(false); // Data fetching complete
    };

    fetchData();
  }, []);

  let uncategorizedItems = [];

  const filteredData = data.filter((item) => {
    const itemCategory = item.properties?.Category?.select?.name;
    return prop.some((p) => p.name === itemCategory);
  });

  const groupedData = filteredData.reduce((acc, item) => {
    const category = item.properties?.Category?.select?.name || "Uncategorized";
    if (!category) {
      uncategorizedItems.push(item);
    } else {
      if (!acc[category]) {
        acc[category] = [];
      }
    }
    acc[category].push(item);
    return acc;
  }, {});

  return (
    <div className={styles.skillsContainer}>
      <h1 className="text-3xl font-bold mb-4">Skills</h1>

      {loading ? (
        <p>Loading...</p>  // Display a loading message while data is being fetched
      ) : Object.keys(groupedData).length > 0 ? (
        Object.keys(groupedData).map((category) => (
          <div key={category} className={styles.categoryDiv}>
            <h3 className="text-2xl font-semibold mt-4">{category}</h3>
            <ul>
              {groupedData[category].map((item) => (
                <li key={item.id || item?.properties?.Name?.id} className="mb-2">
                  <img
                    className={styles.icon}
                    src={
                      item.icon?.external?.url || item.icon?.file?.url || ""
                    }
                    alt="Icon"
                  />
                  <p>{item.properties?.Name?.title?.[0]?.plain_text || "No Title"}</p>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No matching data found.</p>  // Show if no data matches
      )}
    </div>
  );
}
