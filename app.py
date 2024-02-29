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
    points_for_txt = []
    for shape in shapes:
        if 'path' in shape:
            path = shape['path'].split('Z')[0]
            coords = path.split('L')[1:]
            for c in coords:
                x, y = map(float, c.split(','))
                points.append(({'x': "{:.4f}".format(round(x, 4)), 'y': "{:.4f}".format(round(y, 4))}))
                print(points)
                points_for_txt.append(("{:.4f}".format(round(x, 4)), "{:.4f}".format(round(y, 4))))
    file = open("dots.txt", "w")
    for x, y in points_for_txt:
        file.write(f"{x} {y}\n")
    file.close()
    return jsonify({'points': points})

@app.route('/save_points', methods=['POST'])
def save_points():
    data = request.get_json()
    points = data['points']
    with open('points.json', 'w') as f:
        json.dump(points, f)
    return 'Точки успешно сохранены в файл points.json'

@app.route('/plot_points')
def plot_points():
    with open("output_dots.txt", "r") as file:
        points = [tuple(map(float, line.strip().split())) for line in file.readlines()]
    return render_template('plot.html', points=json.dumps(points))


if __name__ == '__main__':
    app.run(port='4999', debug=True)