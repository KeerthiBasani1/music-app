export async function getBandsByCity(cityName) {
  try {
    const headers = {
      'User-Agent': 'MusicApp/1.0 (your-email@example.com)',
      'Accept': 'application/json'
    };

    const now = new Date();
    const minYear = now.getFullYear() - 10;

    // NEW QUERY: use begin-area instead of area ID
    const query = `beginarea:"${cityName}" AND type:group`;
    const encodedQuery = encodeURIComponent(query);

    const artistsRes = await fetch(
      `https://musicbrainz.org/ws/2/artist?query=${encodedQuery}&limit=100&fmt=json`,
      { headers }
    );
    const artistsData = await artistsRes.json();

    console.log("Artists response:", artistsData);

    const filtered = (artistsData.artists || []).filter((artist) => {
      const begin = artist["life-span"]?.begin;
      return begin && parseInt(begin.slice(0, 4)) >= minYear;
    });

    return filtered.slice(0, 50).map((band) => ({
      id: band.id,
      name: band.name,
      lifeSpan: band["life-span"],
    }));
  } catch (err) {
    console.error("Failed to fetch bands", err);
    return [];
  }
}