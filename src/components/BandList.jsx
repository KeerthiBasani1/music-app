function BandList({ bands }) {
  if (!bands || bands.length === 0) {
    return <p>No bands found.</p>;
  }

  return (
    <ul className="space-y-2">
      {bands.map((band) => (
        <li key={band.id} className="p-3 border border-gray-200 rounded">
          <strong>{band.name}</strong>
          {band.lifeSpan?.begin && (
            <span className="ml-2 text-sm text-gray-500">
              (Founded: {band.lifeSpan.begin})
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export default BandList;
