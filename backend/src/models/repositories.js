import { nanoid } from 'nanoid';
import { db } from '../database/connection.js';

const insert = (table, payload) => {
  const id = nanoid();
  const keys = Object.keys(payload);
  const placeholders = keys.map((key) => `@${key}`).join(', ');
  const cols = keys.join(', ');
  const stmt = db.prepare(`INSERT INTO ${table} (id, ${cols}) VALUES (@id, ${placeholders})`);
  stmt.run({ id, ...payload });
  return id;
};

export const userRepo = {
  upsertDemoUser() {
    const existing = db.prepare('SELECT * FROM users WHERE email = ?').get('demo@autoapply.local');
    if (existing) return existing;
    const id = insert('users', { email: 'demo@autoapply.local', name: 'Demo User' });
    return db.prepare('SELECT * FROM users WHERE id = ?').get(id);
  },
};

export const resumeRepo = {
  create(payload) {
    const id = insert('resumes', payload);
    return this.findById(id);
  },
  findById(id) {
    return db.prepare('SELECT * FROM resumes WHERE id = ?').get(id);
  },
  findLatestByUser(userId) {
    return db.prepare('SELECT * FROM resumes WHERE user_id = ? ORDER BY created_at DESC LIMIT 1').get(userId);
  },
};

export const jobRepo = {
  bulkInsert(userId, jobs) {
    const stmt = db.prepare(
      `INSERT OR IGNORE INTO jobs (id, user_id, source, external_id, company, title, location, job_url, description, status)
       VALUES (@id, @user_id, @source, @external_id, @company, @title, @location, @job_url, @description, @status)`
    );

    const tx = db.transaction((records) => {
      records.forEach((job) => {
        stmt.run({
          id: nanoid(),
          user_id: userId,
          source: job.source,
          external_id: job.externalId || null,
          company: job.company || null,
          title: job.title,
          location: job.location || null,
          job_url: job.jobUrl,
          description: job.description || null,
          status: 'discovered',
        });
      });
    });

    tx(jobs);
  },
  listByUser(userId) {
    return db.prepare('SELECT * FROM jobs WHERE user_id = ? ORDER BY created_at DESC').all(userId);
  },
  findById(id) {
    return db.prepare('SELECT * FROM jobs WHERE id = ?').get(id);
  },
  updateStatus(id, status) {
    db.prepare('UPDATE jobs SET status = ? WHERE id = ?').run(status, id);
  },
};

export const matchRepo = {
  create(payload) {
    const id = insert('match_scores', payload);
    return db.prepare('SELECT * FROM match_scores WHERE id = ?').get(id);
  },
  listByUser(userId) {
    return db.prepare('SELECT * FROM match_scores WHERE user_id = ? ORDER BY created_at DESC').all(userId);
  },
};

export const applicationRepo = {
  create(payload) {
    const id = insert('applications', payload);
    return db.prepare('SELECT * FROM applications WHERE id = ?').get(id);
  },
  listByUser(userId) {
    return db.prepare('SELECT * FROM applications WHERE user_id = ? ORDER BY created_at DESC').all(userId);
  },
};
