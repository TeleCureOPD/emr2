from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client['hospital_management']

@app.route('/add_patient', methods=['POST'])
def add_patient():
    data = request.json
    db.patients.insert_one(data)
    return jsonify({'message': 'Patient added successfully'}), 201

@app.route('/add_worker', methods=['POST'])
def add_worker():
    data = request.json
    db.workers.insert_one(data)
    return jsonify({'message': 'Worker added successfully'}), 201

@app.route('/patients', methods=['GET'])
def get_patients():
    patients = list(db.patients.find())
    for patient in patients:
        patient['_id'] = str(patient['_id'])
    return jsonify(patients), 200

@app.route('/workers', methods=['GET'])
def get_workers():
    workers = list(db.workers.find())
    for worker in workers:
        worker['_id'] = str(worker['_id'])
    return jsonify(workers), 200

@app.route('/patients/<id>', methods=['DELETE'])
def delete_patient(id):
    db.patients.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Patient deleted successfully'}), 200

@app.route('/workers/<id>', methods=['DELETE'])
def delete_worker(id):
    db.workers.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Worker deleted successfully'}), 200

@app.route('/patients/<id>', methods=['PUT'])
def update_patient(id):
    data = request.json
    db.patients.update_one({'_id': ObjectId(id)}, {'$set': data})
    return jsonify({'message': 'Patient updated successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)