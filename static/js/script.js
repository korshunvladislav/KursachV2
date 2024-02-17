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
        var points = '';
        data.forEach(point => {
            points += '(' + point[0] + ', ' + point[1] + ')<br>';
        });
        pointsOutput.innerHTML = 'Вы получили точки:<br>' + points;
        savePoints(data);
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