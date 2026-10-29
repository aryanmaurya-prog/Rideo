const reports = [
  ['Fleet performance', '01 Oct – 14 Oct 2026', 'CSV', 'Ready'],
  ['Revenue summary', '01 Sep – 30 Sep 2026', 'Excel', 'Ready'],
  ['Booking activity', '01 Sep – 30 Sep 2026', 'PDF', 'Generating'],
];

export default function ReportsPage() {
  return (
    <>
      <div className="page-heading"><div><p className="page-kicker">Workspace / Exports</p><h1>Reports</h1><p>Build a snapshot of fleet, revenue and booking activity.</p></div></div>
      <div className="demo-note">Report generation and file downloads need the reporting service and storage integration.</div>
      <div className="page-panel-grid">
        <section className="admin-panel">
          <h2>Generate a report</h2>
          <p>Choose a time period and the information you need.</p>
          <form className="form-grid">
            <label>Report type<select defaultValue="weekly"><option value="daily">Daily summary</option><option value="weekly">Weekly performance</option><option value="monthly">Monthly overview</option><option value="custom">Custom range</option></select></label>
            <label>Start date<input type="date" defaultValue="2026-10-01" /></label>
            <label>End date<input type="date" defaultValue="2026-10-14" /></label>
            <label>Format<select defaultValue="csv"><option value="pdf">PDF</option><option value="excel">Excel</option><option value="csv">CSV</option></select></label>
            <label className="form-full">Include data<select defaultValue="all"><option value="all">Revenue, bookings and fleet</option><option>Revenue only</option><option>Bookings only</option><option>Fleet only</option></select></label>
            <button className="admin-button admin-button-primary form-full" disabled type="button">Generate report · coming soon</button>
          </form>
        </section>
        <section className="admin-panel">
          <h2>Report schedule</h2>
          <p>Keep your team up to date with recurring summaries.</p>
          <div className="settings-row"><span>Weekly operations digest<small>Monday · 9:00 AM · Admin team</small></span><span className="status-pill pending">Paused</span></div>
          <div className="settings-row"><span>Monthly revenue report<small>1st of each month · Finance</small></span><span className="status-pill pending">Paused</span></div>
          <p className="muted">Scheduling will be available after report delivery is configured.</p>
        </section>
      </div>
      <section className="admin-panel" style={{ marginTop: 14 }}>
        <div className="panel-heading"><div><h2>Recent reports</h2><p>Preview report history</p></div></div>
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Report</th><th>Period</th><th>Format</th><th>Status</th><th>Download</th></tr></thead><tbody>{reports.map(([name, period, format, status]) => <tr key={name}><td className="table-primary">{name}</td><td>{period}</td><td>{format}</td><td><span className={`status-pill ${status === 'Generating' ? 'pending' : ''}`}>{status}</span></td><td><button className="table-action" disabled type="button" aria-label={`Download ${name}`}>↓</button></td></tr>)}</tbody></table></div>
      </section>
    </>
  );
}
