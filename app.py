from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

points_data = []

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/draw-graph')
def draw_graph():
    return render_template('draw_graph.html')

@app.route('/input-points')
def input_points():
    return render_template('input_points.html')

@app.route('/get_points', methods=['POST'])
def get_points():
    data = request.get_json()
    shapes = data['shapes']
    points = []
    for shape in shapes:
        if 'path' in shape:
            path = shape['path'].split('Z')[0]
            coords = path.split('L')[1:]
            for c in coords:
                x, y = map(float, c.split(','))
                points.append(({'x': x, 'y': y}))
    return jsonify({'points': points})

@app.route('/save_points', methods=['POST'])
def save_points():
    data = request.get_json()
    points = data['points']
    with open('points.json', 'w') as f:
        json.dump(points, f)
    return 'Точки успешно сохранены в файл points.json'

@app.route('/submit_points', methods=['POST'])
def submit_points():
    data = request.form
    points = []
    
    for key, value  in data.items():
        if key.startswith('x'):
            index = key[1:]
            x = value
            y = data['y' + index]
            points.append({'x': x, 'y': y})
    
    with open('points.json', 'w') as f:
        json.dump(points, f)

if __name__ == '__main__':
    app.run(port='4999', debug=True)