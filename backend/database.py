import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'employees.db')

def get_db():
    db = sqlite3.connect(DB_PATH)
    db.row_factory = sqlite3.Row
    return db

def init_db():
    db = get_db()
    db.execute('''
        CREATE TABLE IF NOT EXISTS employees (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            department TEXT NOT NULL,
            title TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            location TEXT
        )
    ''')
    count = db.execute("SELECT COUNT(*) FROM employees").fetchone()[0]
    if count == 0:
        sample = [
            ('Maria Garcia',   'Engineering', 'Senior Developer',   'mgarcia@company.com',  '312-555-0101', 'Chicago, IL'),
            ('James Okafor',   'Engineering', 'Junior Developer',   'jokafor@company.com',  '312-555-0102', 'Chicago, IL'),
            ('Priya Nair',     'Design',      'UX Lead',            'pnair@company.com',    '312-555-0103', 'Remote'),
            ('Derek Wu',       'IT',          'Systems Admin',      'dwu@company.com',      '312-555-0104', 'Chicago, IL'),
            ('Sofia Mendez',   'HR',          'HR Generalist',      'smendez@company.com',  '312-555-0105', 'Chicago, IL'),
            ('Liam Chen',      'Finance',     'Financial Analyst',  'lchen@company.com',    '312-555-0106', 'Remote'),
            ('Aisha Patel',    'Engineering', 'DevOps Engineer',    'apatel@company.com',   '312-555-0107', 'Chicago, IL'),
            ('Marcus Johnson', 'Design',      'UI Designer',        'mjohnson@company.com', '312-555-0108', 'Remote'),
        ]
        db.executemany(
            "INSERT INTO employees (name, department, title, email, phone, location) VALUES (?, ?, ?, ?, ?, ?)",
            sample
        )
    db.commit()