const databaseID = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_API_KEY;

// In-memory cache to store data and last update time
let cache = {
  data: null,
  lastUpdatedTime: null,
  timestamp: null,
};

export async function GET() {
  try {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${notionSecret}`,
        'Notion-Version': '2022-06-28',
      },
    });

    if (!res.ok) {
      return new Response(JSON.stringify({ error: `HTTP error! Status: ${res.status}` }), { status: res.status });
    }

    const metadata = await res.json();
    const lastEditedTime = metadata.last_edited_time;

    // Check if the last edited time has changed
    if (cache.lastUpdatedTime && lastEditedTime === cache.lastUpdatedTime) {
      // If cached data is still valid (not older than 1 day), return it
      const isCacheValid = cache.timestamp && (Date.now() - cache.timestamp < 24 * 60 * 60 * 1000);

      if (isCacheValid) {
        return new Response(JSON.stringify(cache.data), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=86400, stale-while-revalidate=30', // Cache for 1 day if unchanged
          },
        });
      }
    }

    // If data is outdated or first fetch, query database for published items
    const queryRes = await fetch(`https://api.notion.com/v1/databases/${databaseID}/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${notionSecret}`,
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        filter: {
          or: [{
            property: 'Publish',
            checkbox: {
              equals: true,
            }
          }],
        },
        sorts: [
          { property: 'Category', direction: 'ascending' },
          { property: 'Name', direction: 'ascending' }
        ]
      }),
    });

    if (!queryRes.ok) {
      return new Response(JSON.stringify({ error: `HTTP error! Status: ${queryRes.status}` }), { status: queryRes.status });
    }

    const queryData = await queryRes.json();

    // Update the cache with new data
    cache = {
      data: queryData.results,
      lastUpdatedTime: lastEditedTime,
      timestamp: Date.now(),
    };

    // Return the fresh data with short cache expiry
    return new Response(JSON.stringify(queryData.results), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=30, stale-while-revalidate=30', // Update cache within 30s if changed
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
