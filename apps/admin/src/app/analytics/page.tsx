'use client';

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const trend = [
  { day: 'Sep 16', revenue: 31, users: 18 }, { day: 'Sep 19', revenue: 34, users: 24 },
  { day: 'Sep 22', revenue: 42, users: 20 }, { day: 'Sep 25', revenue: 39, users: 31 },
  { day: 'Sep 28', revenue: 51, users: 29 }, { day: 'Oct 01', revenue: 47, users: 35 },
  { day: 'Oct 04', revenue: 58, users: 32 }, { day: 'Oct 07', revenue: 63, users: 41 },
  { day: 'Oct 10', revenue: 69, users: 38 }, { day: 'Oct 14', revenue: 81, users: 49 },
];
const statuses = [
  { name: 'Completed', value: 58, color: '#34d399' },
  { name: 'Confirmed', value: 20, color: '#60a5fa' },
  { name: 'Active', value: 12, color: '#ff6b00' },
  { name: 'Cancelled', value: 10, color: '#fb7185' },
];
const categories = [
  { name: 'Scooter', revenue: 42 }, { name: 'Sports', revenue: 29 },
  { name: 'Cruiser', revenue: 36 }, { name: 'EV', revenue: 22 },
];
const cities = [
  ['Bangalore', '₹4.82L', '1,248', '68%'],
  ['Mumbai', '₹3.74L', '982', '61%'],
  ['Goa', '₹2.91L', '764', '72%'],
  ['Pune', '₹1.96L', '531', '54%'],
];
const tooltipStyle = { border: '1px solid #303948', borderRadius: 8, background: '#131a24', color: '#f8fafc', fontSize: 10 };

export default function AnalyticsPage() {
  return (
    <>
      <div className="page-heading">
        <div><p className="page-kicker">Insights / Performance</p><h1>Analytics</h1><p>Understand growth, demand and fleet performance at a glance.</p></div>
        <button className="admin-button" type="button">↓ Export</button>
      </div>
      <div className="demo-note">Preview analytics · Charts use illustrative figures until live reporting endpoints are connected.</div>
      <div className="filter-toolbar">
        <label>Date range<select defaultValue="30"> <option value="7">Last 7 days</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option></select></label>
        <label>City<select defaultValue="all"><option value="all">All cities</option><option>Bangalore</option><option>Mumbai</option><option>Goa</option></select></label>
        <label>Category<select defaultValue="all"><option value="all">All categories</option><option>Scooter</option><option>Sports</option><option>Cruiser</option><option>EV</option></select></label>
      </div>
      <section className="page-panel-grid">
        <article className="admin-panel">
          <div className="panel-heading"><div><h2>Revenue trend</h2><p>Daily revenue · ₹ thousands</p></div></div>
          <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trend}><defs><linearGradient id="analyticsFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#ff6b00" stopOpacity={0.25} /><stop offset="100%" stopColor="#ff6b00" stopOpacity={0} /></linearGradient></defs><CartesianGrid stroke="#242b36" strokeDasharray="3 4" vertical={false} /><XAxis dataKey="day" tick={{ fill: '#7e8999', fontSize: 9 }} tickLine={false} axisLine={false} /><YAxis tick={{ fill: '#7e8999', fontSize: 9 }} tickLine={false} axisLine={false} /><Tooltip contentStyle={tooltipStyle} /><Area dataKey="revenue" stroke="#ff7a1a" fill="url(#analyticsFill)" strokeWidth={2} /></AreaChart></ResponsiveContainer></div>
        </article>
        <article className="admin-panel">
          <div className="panel-heading"><div><h2>User growth</h2><p>New riders · sample trend</p></div></div>
          <div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><LineChart data={trend}><CartesianGrid stroke="#242b36" strokeDasharray="3 4" vertical={false} /><XAxis dataKey="day" tick={{ fill: '#7e8999', fontSize: 9 }} tickLine={false} axisLine={false} /><YAxis tick={{ fill: '#7e8999', fontSize: 9 }} tickLine={false} axisLine={false} /><Tooltip contentStyle={tooltipStyle} /><Line dataKey="users" stroke="#60a5fa" strokeWidth={2.5} dot={false} /></LineChart></ResponsiveContainer></div>
        </article>
        <article className="admin-panel">
          <div className="panel-heading"><div><h2>Booking status</h2><p>Share of bookings</p></div></div>
          <div className="chart-wrap" style={{ height: 190 }}><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={statuses} dataKey="value" nameKey="name" innerRadius={48} outerRadius={72} paddingAngle={4} stroke="none">{statuses.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><Tooltip contentStyle={tooltipStyle} /></PieChart></ResponsiveContainer></div>
          <div className="status-legend">{statuses.map((item) => <span key={item.name}><i style={{ background: item.color }} />{item.name}<strong>{item.value}%</strong></span>)}</div>
        </article>
        <article className="admin-panel">
          <div className="panel-heading"><div><h2>Category performance</h2><p>Revenue · ₹ thousands</p></div></div>
          <div className="chart-wrap" style={{ height: 250 }}><ResponsiveContainer width="100%" height="100%"><BarChart data={categories} margin={{ left: -20 }}><CartesianGrid stroke="#242b36" strokeDasharray="3 4" vertical={false} /><XAxis dataKey="name" tick={{ fill: '#7e8999', fontSize: 9 }} tickLine={false} axisLine={false} /><YAxis tick={{ fill: '#7e8999', fontSize: 9 }} tickLine={false} axisLine={false} /><Tooltip contentStyle={tooltipStyle} /><Bar dataKey="revenue" fill="#ff6b00" radius={[5, 5, 0, 0]} /></BarChart></ResponsiveContainer></div>
        </article>
      </section>
      <section className="admin-panel" style={{ marginTop: 14 }}>
        <div className="panel-heading"><div><h2>City performance</h2><p>Illustrative month-to-date snapshot</p></div></div>
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>City</th><th>Revenue</th><th>Bookings</th><th>Utilization</th><th>Trend</th></tr></thead><tbody>{cities.map(([city, revenueValue, count, rate]) => <tr key={city}><td className="table-primary">{city}</td><td>{revenueValue}</td><td>{count}</td><td>{rate}</td><td className="positive">↗ Growing</td></tr>)}</tbody></table></div>
      </section>
    </>
  );
}
