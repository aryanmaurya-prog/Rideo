const zones = [
  ['Indiranagar', 'Bangalore', 'High', '92', '86%'],
  ['Koramangala', 'Bangalore', 'High', '87', '79%'],
  ['Bandra West', 'Mumbai', 'High', '81', '73%'],
  ['Calangute', 'Goa', 'Medium', '68', '70%'],
  ['Powai', 'Mumbai', 'Medium', '64', '58%'],
];

export default function HeatmapPage() {
  return (
    <>
      <div className="page-heading"><div><p className="page-kicker">Insights / Demand</p><h1>City heatmap</h1><p>Spot demand hot zones and plan your fleet around the city.</p></div><button className="admin-button" type="button">⌖ Select city</button></div>
      <div className="demo-note">Map preview · A Mapbox token and live location analytics are required for interactive demand layers.</div>
      <div className="filter-toolbar">
        <label>City<select defaultValue="Bangalore"><option>Bangalore</option><option>Mumbai</option><option>Goa</option></select></label>
        <label>Time of day<select defaultValue="all"><option value="all">All day</option><option>Morning</option><option>Evening</option><option>Night</option></select></label>
        <label>Layer<select defaultValue="demand"><option value="demand">Booking demand</option><option>Fleet supply</option><option>Revenue</option></select></label>
      </div>
      <section className="admin-panel">
        <div className="panel-heading"><div><h2>Bengaluru demand zones</h2><p>Illustrative city view · demand intensity</p></div><div className="heat-legend"><span><i className="low" />Low</span><span><i className="medium" />Medium</span><span><i className="high" />High</span></div></div>
        <div className="heatmap-preview" role="img" aria-label="Illustrative city map showing areas of low, medium and high booking demand">
          <div className="map-grid" aria-hidden="true" />
          <div className="map-road road-one" /><div className="map-road road-two" /><div className="map-road road-three" />
          <div className="heat-zone zone-one"><span>Indiranagar</span></div>
          <div className="heat-zone zone-two"><span>Koramangala</span></div>
          <div className="heat-zone zone-three"><span>MG Road</span></div>
          <div className="heat-zone zone-four"><span>Whitefield</span></div>
          <div className="map-label">BENGALURU · PREVIEW MAP</div>
        </div>
      </section>
      <section className="admin-panel" style={{ marginTop: 14 }}>
        <div className="panel-heading"><div><h2>Top demand zones</h2><p>Sample ride activity by neighborhood</p></div></div>
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Zone</th><th>City</th><th>Demand</th><th>Index</th><th>Fleet utilization</th></tr></thead><tbody>{zones.map(([zone, city, demand, index, use]) => <tr key={zone}><td className="table-primary">{zone}</td><td>{city}</td><td><span className={`status-pill ${demand === 'High' ? 'cancelled' : 'pending'}`}>{demand}</span></td><td>{index}</td><td>{use}</td></tr>)}</tbody></table></div>
      </section>
    </>
  );
}
