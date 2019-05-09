

var values = [400, 800, 1200,  1600, 2000];

var code = [
    'This is usually abbreviated as  WWW in a URL bar', 
    'Daily double', 
    'This code square is named after a Roman architect',  // https://upload.wikimedia.org/wikipedia/commons/9/9a/Vigen%C3%A8re_square_shading.svg
    'A common shift cipher was named after this roman leader, who also has a salad named after him', 
    'He created the World Wide Web'
];

var movies = [
    'In the Lord Of The Rings he serves Frodo',
    'Mark Watney finds himself stranded on Mars',
    'The songs in this rock movie have been recorded, like the album Smell the glove',
    'Wade Watts searches for Hallidays Egg',
    'An orphan finds himself among pickpocket friends'
];

var canadaHistory = [
    'He built Craigdarroch Castle ',
    'This railway was built in 1881',
    'Daily double',
    'He invented the goalie mask',
    'Indigenous children were sent to these schools'
];

var energy = [
    'We use these machines to make electricity in a power outage',
    'It takes 20 years for this machine to pay itself off',
    'When something is moving we call it this energy',
    'You use water to make this electricity ',
    'He wrote that E=MC2'
];

var space = [
    'This space station started in 1998',
    'She wrote the computer software for the lunar landing',
    'Canada\'s main contribution to the ISS was',
    'This Astronaut was first on the moon',
    'Daily double'
];

var columns = [
    {title: 'Code', questions: code},
    {title: 'Movies', questions: movies},
    {title: 'Canadian History', questions: canadaHistory},
    {title: 'Energy', questions: energy},
    {title: 'Space', questions: space},
];


var board = document.createElement('table');
document.body.appendChild(board);
var header = document.createElement('tr');
board.appendChild(header);
columns.forEach(function(column) {
    var th = document.createElement('th');
    th.innerText = column.title;
    header.appendChild(th);
});


values.forEach(function(value, idx) {
    var row = document.createElement('tr');
    board.appendChild(row);

    columns.forEach(function(column) {
        var td = document.createElement('td');
        td.innerHTML = '$' + value;
        row.appendChild(td);
        td.onclick = function() {
            console.log(value, column.questions[idx]);
            td.innerText = ''
        };
    });
});