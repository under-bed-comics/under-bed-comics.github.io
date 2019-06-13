var values = [400, 800, 1200,  1600, 2000];

var pictures = {
    'This code square is named after a Roman architect': 'vigenere.svg',
};

var code = [
    {q:'This is usually abbreviated as  WWW in a URL bar', 
    as:['World Wide Web','Willie Wonkas Whoopers','Wide World Website','']}, 
    {q:'Daily double', 
    as:['','','','']}, 
    {q:'This code square is named after a Roman architect', 
    as:['Viguenere','Maximus','Ceaser','']},  // https://upload.wikimedia.org/wikipedia/commons/9/9a/Vigen%C3%A8re_square_shading.svg
   {q: 'A common shift cipher was named after this roman leader, who also has a salad named after him', 
   as:['Ceaser','Viguenere','Encycopaedius','']}, 
    {q:'He created the World Wide Web', 
    as:['Tim Berners-Lee','Steve Wozniak','Ted Nelson','Albert Einstein']},
];

var movies = [
    {q:'In the Lord Of The Rings he serves Frodo', 
    as:['Smeagle','Bilbo','Sam Gamgee','']},
   {q: 'Mark Watney finds himself stranded on Mars', 
   as:['The Martian','Mars Mission','Artemis','']},
    {q:'The songs in this rock movie have been recorded, like the album Smell the glove', 
    as:['Spinal Tap','School of Rock','Almost Famous','']},
    {q:'Wade Watts searches for Hallidays Egg', 
    as:['Ready Player 1','Easter','Inheritance Cycle','']},
    {q:'An orphan finds himself among pickpocket friends', 
    as:['Oliver','Annie','Over the Hedge','']},
];

var canadaHistory = [
   {q: 'He built Craigdarroch Castle ', 
   as:['Robert Dunsmeir','Walt Diseny','King Henry III','']},
    {q:'This railway was built in 1881', 
    as:['CPR','Canada Line','Great Railway','']},
    {q:'Daily double', 
    as:['','','','']},
    {q:'He invented the goalie mask', 
    as:['Jacques Plante','Patrick Roy','Wayne Gretzky','']},
    {q:'Indigenous children were sent to these schools', 
    as:['Residential Schools','Public Schools','Private Schools','']},
];

var energy = [
    {q:'We use these machines to make electricity in a power outage', 
    as:['Generators','Turbines','Water Wheels','']},
   {q: 'It takes 20 years for this machine to pay itself off', 
   as:['Wind Turbine','Boat','Car','']},
    {q:'When something is moving we call it this energy', 
    as:['Kinetic','Wind','Potential','']},
   {q: 'You use water to make this electricity ', 
   as:['Hydro','Kinetic','Potential','']},
    {q:'He wrote that E=mc²', 
    as:['Albert Einstein','Newton','Franklin','']},
];

var space = [
    {q:'This space station started in 1998', 
    as:['ISS','MIR','Spacelab','']},
    {q:'This person wrote the computer software for the lunar landing', 
    as:['Hamilton','Von Braun','Chris Hadfield','']},
    {q:'Canada\'s main contribution to the ISS was', 
    as:['Canadarm2','Module','Canadarm','']},
    {q:'This Astronaut was first on the moon', 
    as:['Neil Armstrong','Buzz Aldrin','Michael Collins','']},
   {q: 'Daily double', 
   as:['','','','']},
];

var columns = [
    {title: 'Code', questions: code},
    {title: 'Movies', questions: movies},
    {title: 'Canadian History', questions: canadaHistory},
    {title: 'Energy', questions: energy},
    {title: 'Space', questions: space},
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

function areWeDoneYet() {
    const done = document.querySelectorAll('#board th.done').length;
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

function showAnswers (q) {
    var answers = document.getElementById('answers');
    answers.setAttribute('class', 'answers');
    console.log(q.as);

    q.as.forEach(function(a, i) {
        if (a) {
            var button = document.createElement('button');
            button.innerHTML = a;
            answers.appendChild(button);
            button.onclick = function() {
                console.log(a, i === 0);
            };
        }
    });
}

values.forEach(function(value, idx) {
    var row = document.createElement('tr');
    board.appendChild(row);

    columns.forEach(function(column, c) {
        var td = document.createElement('td');
        td.innerHTML = '$' + value;
        row.appendChild(td);
        td.onclick = function() {
            td.setAttribute('class', 'done');

            var q = column.questions[idx];
            var picture = pictures[q.q];
            var question = askQuestion(q.q, picture)
            
            question.onclick = function() {
                question.setAttribute('class', 'question hidden'); 
                
                showAnswers(q)
                /// show answers
                
                // board.setAttribute('class', 'board');

                // var query = '#board td:nth-child(' + (c+1) + ').done';
                // var answeredCells = document.querySelectorAll(query);
                // var questionsDone = answeredCells.length;
                
                // if (column.questions.length === questionsDone) {
                //     var colCell = document.getElementById(column.title);
                //     colCell.setAttribute('class', 'done');
                // }

                // if (areWeDoneYet()) {
                //     finalJeopardy();
                // }
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