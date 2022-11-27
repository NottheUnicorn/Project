from database import Database
from os import getenv
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)
load_dotenv()


@app.route('/')
def hello_world():
    return '''/setup - initialize table projects in database
/create - add project to database
/read/id - show the record of the particular project with the given ID
/update/id - update particular project
/delete/id - delete particular project
'''


@app.route('/setup')
def setup_database():
    db_name = getenv('DB_NAME')
    db = Database(db_name)
    db.initialize('CREATE TABLE projects (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, price TEXT, slug TEXT,category TEXT,image TEXT,shortdescription TEXT,content TEXT)')
    return 'Initialized table projects in database'


@app.route('/create', methods=['POST'])
def create():
    req = request.get_json()
    db_name = getenv('DB_NAME')
    db = Database(db_name)
    #print(req)
    name = req['name']
    price = req['price']
    slug = req['slug']
    category = req['category']
    image = req['image']
    shortdescription = req['shortdescription']
    content = req['content']

    query = 'INSERT INTO projects (name, price, slug,category,image,shortdescription,content) VALUES (?,?,?,?,?,?,?)'
    db.create(query, name, price, slug,category,image,shortdescription,content)
    return 'Insertion complete'

@app.route('/list')
def list():
    db_name = getenv('DB_NAME')
    db = Database(db_name)
    query = 'SELECT * FROM projects order by id desc'
    project = db.list(query)
    return jsonify(project)
@app.route('/category/<slug>')
def categoryread(slug):
    db_name = getenv('DB_NAME')
    db = Database(db_name)
    #print("coming")
    query = 'SELECT * FROM projects WHERE category="'+slug+'"'
    project = db.list(query)
    return jsonify(project)    
@app.route('/read/<project_id>')
def read(project_id):
    db_name = getenv('DB_NAME')
    db = Database(db_name)
    query = 'SELECT * FROM projects WHERE id='+project_id
    project = db.list(query)
    data = []
    print(project)
    if len(project) > 0:
        data = project[0]
    return jsonify(data)


@app.route('/update/<project_id>', methods=['PUT'])
def update(project_id):
    req = request.get_json()
    db_name = getenv('DB_NAME')
    db = Database(db_name)
    name = req['name']
    price = req['price']
    slug = req['slug']
    category = req['category']
    image = req['image']
    shortdescription = req['shortdescription']
    content = req['content']
    query = 'UPDATE projects SET name=?,price=?,slug=?,category=?,image=?,shortdescription=?,content=? WHERE id=?'
    db.update(query, (name, price, slug,category,image,shortdescription,content, project_id))
    return 'Updated successfully'


@app.route('/delete/<project_id>', methods=['DELETE'])
def delete(project_id):
    db_name = getenv('DB_NAME')
    db = Database(db_name)
    query = 'DELETE FROM projects WHERE id=?'
    db.delete(query, (project_id))
    return 'Deleted successfully'
