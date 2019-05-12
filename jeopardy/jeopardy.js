var values = [400, 800, 1200,  1600, 2000];

var pictures = {
    'This code square is named after a Roman architect': 'vigenere.svg',
};

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
    'He wrote that E=mc²'
];

var space = [
    'This space station started in 1998',
    'She wrote the computer software for the lunar landing',
    'Canada\'s main contribution to the ISS was',
    'This Astronaut was first on the moon',
    'Daily double'
];

var columns = [
    {title: 'Code', questions: code, answered: 0},
    {title: 'Movies', questions: movies, answered: 0},
    {title: 'Canadian History', questions: canadaHistory, answered: 0},
    {title: 'Energy', questions: energy, answered: 0},
    {title: 'Space', questions: space, answered: 0},
];

var board = document.getElementById('board');
var header = document.createElement('tr');
board.appendChild(header);
columns.forEach(function(column) {
    var th = document.createElement('th');
    th.setAttribute('id', column.title);
    th.innerText = column.title;
    header.appendChild(th);
});

function columnDone (column) {
    for (var q=0; q<questions.length; ++q) {
        if (!questions[q].answered) {
            return false;
        }
    }
    return true;
}

function areWeDoneYet() {
    const done = columns.reduce(function(count, column) {
        if (columnDone(column)) {
            ++count;
        }
        return count;
    }, 0);

    return done === columns.length;
}

function askQuestion(q, picture, extraClass) {
    var question = document.getElementById('question');
    question.innerHTML = ''
    question.setAttribute('class', 'question ' + extraClass);

    board.setAttribute('class', 'board hidden');

    var p = document.createElement('p');
    p.innerText = q;
    question.appendChild(p);

    if (picture) {
        var img = document.createElement('img');
        img.setAttribute('src', picture);
        question.appendChild(img);
    } 

    return question;
}

values.forEach(function(value, idx) {
    var row = document.createElement('tr');
    board.appendChild(row);

    columns.forEach(function(column) {
        var td = document.createElement('td');
        td.innerHTML = '$' + value;
        row.appendChild(td);
        td.onclick = function() {
            td.setAttribute('class', 'done');

            var q = column.questions[idx];
            var picture = pictures[q];
            var question = askQuestion(q, picture)
            
            question.onclick = function() {
                question.setAttribute('class', 'question hidden');                
                board.setAttribute('class', 'board');

                q.answered = true;

                if (columnDone(column)) {
                    var colCell = document.getElementById(column.title);
                    colCell.setAttribute('class', 'done');
                }

                if (areWeDoneYet()) {
                    finalJeopardy();
                }
            }
        };
    });
});

function finalJeopardy() {

    var q = askQuestion('Final Jeopardy!', undefined, 'final');
    q.onclick = function() {
        q = askQuestion('Games', undefined, 'category');
        q.onclick = function() {
            askQuestion('In this game created by Ninja Kiwi with multiple sequels monkeys pop "bloons" as they go past');
        };
    };    
}

function start() {
    var q = askQuestion('Jeopardy!', undefined, 'final');
    q.onclick = function() {
        question.setAttribute('class', 'question hidden');       
        board.setAttribute('class', 'board');
    }
}

start();