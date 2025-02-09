// For App Router: /app/api/notion/route.js
const databaseID = process.env.NOTION_DATABASE_ID;
const notionSecret = process.env.NOTION_API_KEY;

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

    const data = await res.json();

    // Add caching headers
    return new Response(JSON.stringify(data.properties), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=60, stale-while-revalidate=30',  // Caches for 60s and revalidates in the background
      },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
