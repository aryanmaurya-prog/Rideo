'use client';

import { useState, type FormEvent } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export default function SettingsPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [saving, setSaving] = useState(false);

  async function handlePasswordChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Your session has expired. Please sign in again.');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`${API_URL}/users/me/password`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = (await response.json()) as { message?: string | string[] };
      if (!response.ok) {
        throw new Error(Array.isArray(data.message) ? data.message.join(', ') : data.message || 'Unable to update password.');
      }

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess('Your password has been updated.');
    } catch (requestError: unknown) {
      setError(requestError instanceof Error ? requestError.message : 'Unable to update password.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <div className="page-heading"><div><p className="page-kicker">Workspace / Preferences</p><h1>Settings</h1><p>Configure the details that keep your operations moving.</p></div></div>
      <div className="demo-note">Settings preview · Workspace preferences are not yet connected.</div>
      <section className="page-panel-grid">
        <article className="admin-panel">
          <h2>General</h2>
          <p>Workspace identity and operating region.</p>
          <div className="form-stack-admin">
            <label>Workspace name<input defaultValue="Rideo Mobility" disabled /></label>
            <label>Default city<select defaultValue="Bangalore" disabled><option>Bangalore</option><option>Mumbai</option><option>Goa</option></select></label>
            <label>Currency<select defaultValue="INR" disabled><option value="INR">Indian Rupee (INR)</option></select></label>
          </div>
        </article>
        <article className="admin-panel">
          <h2>Pricing preferences</h2>
          <p>Default policies shown to riders at checkout.</p>
          <div className="settings-row"><span>Show hourly rates<small>Display pricing by the hour</small></span><input type="checkbox" defaultChecked disabled /></div>
          <div className="settings-row"><span>Require booking confirmation<small>Review requests before final confirmation</small></span><input type="checkbox" defaultChecked disabled /></div>
          <div className="settings-row"><span>Cancellation policy<small>Configured in booking service</small></span><span className="status-pill pending">Not set</span></div>
        </article>
        <article className="admin-panel">
          <h2>Notifications</h2>
          <p>Choose which operational updates the team receives.</p>
          <div className="settings-row"><span>New booking requests<small>Notify the operations team</small></span><input type="checkbox" defaultChecked disabled /></div>
          <div className="settings-row"><span>Low fleet availability<small>Alert city managers</small></span><input type="checkbox" disabled /></div>
          <div className="settings-row"><span>Weekly digest<small>Summary of fleet and revenue</small></span><input type="checkbox" disabled /></div>
        </article>
        <article className="admin-panel">
          <h2>Team and integrations</h2>
          <p>Manage workspace access and connected services.</p>
          <div className="settings-row"><span>Team members<small>Team invitations need admin auth</small></span><span className="status-pill pending">Not connected</span></div>
          <div className="settings-row"><span>API keys<small>Secrets should be managed outside the dashboard</small></span><span className="status-pill pending">Not connected</span></div>
          <button className="admin-button" disabled type="button">Save changes · coming soon</button>
        </article>
        <article className="admin-panel">
          <h2>Change password</h2>
          <p>Choose a new password for your admin account.</p>
          {error && <p className="password-feedback error" role="alert">{error}</p>}
          {success && <p className="password-feedback success" role="status">{success}</p>}
          <form className="form-stack-admin" onSubmit={handlePasswordChange}>
            <label htmlFor="currentPassword">Current password
              <input id="currentPassword" type="password" autoComplete="current-password" minLength={6} required value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} />
            </label>
            <label htmlFor="newPassword">New password
              <input id="newPassword" type="password" autoComplete="new-password" minLength={6} required value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
            </label>
            <label htmlFor="confirmPassword">Confirm new password
              <input id="confirmPassword" type="password" autoComplete="new-password" minLength={6} required value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} />
            </label>
            <button className="admin-button admin-button-primary" type="submit" disabled={saving}>
              {saving ? 'Updating password...' : 'Update password'}
            </button>
          </form>
        </article>
      </section>
    </>
  );
}
