var pointsOutput = document.getElementById('output-container');
var graphDiv = document.getElementById('function-graph');

// Получение точек с нарисованного графика
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
        var pointsTable = '<table><tr><th>X</th><th>Y</th></tr>';
        data.points.forEach(point => {
            pointsTable += '<tr><td>' + point.x + '</td><td>' + point.y + '</td></tr>';
        })
        pointsTable += '</table>';
        pointsOutput.innerHTML = pointsTable;
        savePoints(data.points);
    })
    .catch(error => console.error('Ошибка:', error));
}

// Сохранение точек в файл
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

// Очистка графика
function clearGraph() {
    var update = {shapes: []};
    Plotly.relayout(graphDiv, update);
    pointsOutput.innerHTML = '';
}


// function submitPoints() {
//     var points = [];

//     var xInput = document.getElementById('x').value.trim()
//     var yInput = document.getElementById('y').value.trim()

//     if (xInput && yInput) {
//         var x = parseFloat(xInput);
//         var y = parseFloat(yInput);

//         var point = ( x: x, y: y );
//         points.push(point)
//     }
// }

// function clearPoints() {
//     document.getElementById('points-output').value = '';
//     document.getElementById('output-container').innerHTML = '';
// }

// Добавить поля ввода X и Y
function addPoint() {
    var pointsInputContainer = document.getElementById('points-input-container');
    
    var xInput = document.createElement('input');
    xInput.type = 'text';
    xInput.placeholder = 'Введите X';
    xInput.name = 'x';
    xInput.classList.add('input');

    var yInput = document.createElement('input');
    yInput.type = 'text';
    yInput.placeholder = 'Введите Y';
    yInput.name = 'y';
    yInput.classList.add('input');
    
    pointsInputContainer.appendChild(document.createElement('br'));
    pointsInputContainer.appendChild(xInput);
    pointsInputContainer.appendChild(yInput);
}

Plotly.newPlot('function-graph', [{x: [], y: [], mode: 'lines', line: {color: 'blue'}}], {
    title: 'Нарисуйте график функции',
    xaxis: {title: 'X'},
    yaxis: {title: 'Y'},
    dragmode: 'drawopenpath'
});