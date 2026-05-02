import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tax_booking',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Generic database interface functions
export async function query(sql: string, params?: any[]) {
  const [results] = await pool.execute(sql, params);
  return results;
}

// Users
export const usersDb = {
  async create(data: { id: string; name: string; email: string; password: string; role?: string }) {
    return query(
      'INSERT INTO users (id, name, email, password, role) VALUES (?, ?, ?, ?, ?)',
      [data.id, data.name, data.email, data.password, data.role || 'user']
    );
  },
  async getByEmail(email: string) {
    const results = await query('SELECT * FROM users WHERE email = ?', [email]);
    return Array.isArray(results) ? results[0] : null;
  },
  async getById(id: string) {
    const results = await query('SELECT * FROM users WHERE id = ?', [id]);
    return Array.isArray(results) ? results[0] : null;
  },
  async getAll() {
    return query('SELECT id, name, email, role, created_at FROM users');
  }
};

// Tax Records
export const taxRecordsDb = {
  async create(data: {
    id: string;
    user_id: string;
    tax_year: number;
    income: number;
    deductions?: number;
    tax_paid?: number;
  }) {
    return query(
      'INSERT INTO tax_records (id, user_id, tax_year, income, deductions, tax_paid) VALUES (?, ?, ?, ?, ?, ?)',
      [data.id, data.user_id, data.tax_year, data.income, data.deductions || 0, data.tax_paid || 0]
    );
  },
  async getByUserId(userId: string) {
    return query('SELECT * FROM tax_records WHERE user_id = ? ORDER BY tax_year DESC', [userId]);
  },
  async getById(id: string) {
    const results = await query('SELECT * FROM tax_records WHERE id = ?', [id]);
    return Array.isArray(results) ? results[0] : null;
  },
  async updateStatus(id: string, status: string) {
    return query('UPDATE tax_records SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [status, id]);
  }
};

// Documents
export const documentsDb = {
  async create(data: { id: string; tax_record_id: string; document_type: string; file_path: string }) {
    return query(
      'INSERT INTO documents (id, tax_record_id, document_type, file_path) VALUES (?, ?, ?, ?)',
      [data.id, data.tax_record_id, data.document_type, data.file_path]
    );
  },
  async getByTaxRecordId(taxRecordId: string) {
    return query('SELECT * FROM documents WHERE tax_record_id = ?', [taxRecordId]);
  }
};

// Notifications
export const notificationsDb = {
  async create(data: { id: string; user_id: string; title: string; message: string }) {
    return query(
      'INSERT INTO notifications (id, user_id, title, message) VALUES (?, ?, ?, ?)',
      [data.id, data.user_id, data.title, data.message]
    );
  },
  async getByUserId(userId: string, includeRead = false) {
    const condition = includeRead ? '' : ' AND is_read = FALSE';
    return query(`SELECT * FROM notifications WHERE user_id = ?${condition} ORDER BY created_at DESC`, [userId]);
  },
  async markAsRead(id: string) {
    return query('UPDATE notifications SET is_read = TRUE WHERE id = ?', [id]);
  }
};

// Admin Specific Queries
export const adminDb = {
  async getDashboardStats() {
    try {
      const stats = await Promise.all([
        query('SELECT COUNT(*) as total FROM tax_records WHERE DATE(created_at) = CURDATE()'),
        query('SELECT COUNT(*) as total FROM tax_records WHERE status = ?', ['submitted']),
        query('SELECT COUNT(*) as total FROM users WHERE role = ?', ['user']),
        query('SELECT COUNT(*) as total FROM notifications WHERE is_read = FALSE')
      ]);

      return {
        dailyRecords: (stats[0] as any)?.[0]?.total || 0,
        pendingSubmissions: (stats[1] as any)?.[0]?.total || 0,
        totalUsers: (stats[2] as any)?.[0]?.total || 0,
        unreadNotifications: (stats[3] as any)?.[0]?.total || 0
      };
    } catch (error) {
      console.error('Dashboard stats error:', error);
      return {
        dailyRecords: 0,
        pendingSubmissions: 0,
        totalUsers: 0,
        unreadNotifications: 0
      };
    }
  },
  async getAllTaxRecords() {
    return query(
      'SELECT tr.*, u.name as user_name, u.email FROM tax_records tr ' +
      'JOIN users u ON tr.user_id = u.id ' +
      'ORDER BY tr.created_at DESC'
    );
  }
};

export default pool;

// Export organized database functions
export const db = {
  query,
  users: usersDb,
  taxRecords: taxRecordsDb,
  documents: documentsDb,
  notifications: notificationsDb,
  admin: adminDb
};