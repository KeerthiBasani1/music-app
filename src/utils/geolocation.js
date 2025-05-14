export async function getUserCity() {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const response = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
        const data = await response.json();
        resolve(data.city || "New York");
      },
      async () => {
        const response = await fetch(`https://get.geojs.io/v1/ip/geo.json`);
        const data = await response.json();
        resolve(data.city || "New York");
      }
    );
  });
}
