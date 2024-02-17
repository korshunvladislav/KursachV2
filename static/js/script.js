var pointsOutput = document.getElementById('output-container');
var graphDiv = document.getElementById('function-graph');

function getPoints() {
    var shapes = graphDiv.layout.shapes;
    fetch('/get_points', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({shapes: shapes})
    })
    .then(response => response.json())
    .then(data => {
        // var points = '';
        var pointsTable = '<table><tr><th>X</th><th>Y</th></tr>';
        // data.forEach(point => {
        //     points += '(' + point[0] + ', ' + point[1] + ')<br>';
        // });
        data.points.forEach(point => {
            pointsTable += '<tr><td>' + point.x + '</td><td>' + point.y + '</td></tr>';
        })
        // pointsOutput.innerHTML = 'Вы получили точки:<br>' + points;
        pointsTable += '</table>';
        pointsOutput.innerHTML = pointsTable;
        // savePoints(data);
        savePoints(data.points);
    })
    .catch(error => console.error('Ошибка:', error));
}

function savePoints(points) {
    fetch('/save_points', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({points: points})
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error('Ошибка:', error));
}


function clearGraph() {
    var update = {shapes: []};
    Plotly.relayout(graphDiv, update);
    pointsOutput.innerHTML = '';
}

Plotly.newPlot('function-graph', [{x: [], y: [], mode: 'lines', line: {color: 'blue'}}], {
    title: 'Нарисуйте свой график',
    xaxis: {title: 'X'},
    yaxis: {title: 'Y'},
    dragmode: 'drawopenpath'
});