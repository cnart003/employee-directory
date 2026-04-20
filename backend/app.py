from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, get_db

app = Flask(__name__)
CORS(app)

init_db()

@app.route('/api/employees', methods=['GET'])
def get_employees():
    db = get_db()
    search = request.args.get('search', '').lower()
    department = request.args.get('department', '')

    query = "SELECT * FROM employees WHERE 1=1"
    params = []

    if search:
        query += " AND (LOWER(name) LIKE ? OR LOWER(department) LIKE ?)"
        params += [f'%{search}%', f'%{search}%']

    if department:
        query += " AND department = ?"
        params.append(department)

    employees = db.execute(query, params).fetchall()
    return jsonify([dict(e) for e in employees])

@app.route('/api/employees', methods=['POST'])
def add_employee():
    data = request.get_json()
    required = ['name', 'department', 'title', 'email']
    if not all(k in data for k in required):
        return jsonify({'error': 'Missing required fields'}), 400

    db = get_db()
    db.execute(
        "INSERT INTO employees (name, department, title, email, phone, location) VALUES (?, ?, ?, ?, ?, ?)",
        [data['name'], data['department'], data['title'], data['email'],
         data.get('phone', ''), data.get('location', '')]
    )
    db.commit()
    return jsonify({'message': 'Employee added'}), 201

@app.route('/api/departments', methods=['GET'])
def get_departments():
    db = get_db()
    rows = db.execute("SELECT DISTINCT department FROM employees ORDER BY department").fetchall()
    return jsonify([r['department'] for r in rows])

if __name__ == '__main__':
    app.run(debug=True, port=5000)