from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

points_data = []

@app.route('/')
def index():
    return render_template('index.html')

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
                points.append((x, y))
    return jsonify(points)

@app.route('/save_points', methods=['POST'])
def save_points():
    data = request.get_json()
    points = data['points']
    with open('points.json', 'w') as f:
        json.dump(points, f)
    return 'Точки успешно сохранены в файл points.json'



if __name__ == '__main__':
    app.run(port='5000', debug=True)