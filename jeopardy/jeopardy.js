var values = [400, 800, 1200,  1600, 2000];
var score = 0;
var pictures = {
    'This code square is named after a Roman architect': 'vigenere.svg',
};

var code = [
    {q:'This is usually abbreviated as  WWW in a URL bar', 
    as:['World Wide Web','Willie Wonkas Whoopers','Wide World Website','']}, 
    {q:'Daily double', 
    as:['','','','']}, 
    {q:'This code square is named after a Roman architect', 
    as:['Vigenere','Maximus','Ceaser','']},  // https://upload.wikimedia.org/wikipedia/commons/9/9a/Vigen%C3%A8re_square_shading.svg
   {q: 'A common shift cipher was named after this roman leader, who also has a salad named after him', 
   as:['Ceaser','Vigenere','Encyclopaedius','']}, 
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
   as:['Robert Dunsmeir','Walt Disney','King Henry III','']},
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
    var question = document.getElementById('question'); //get the question from the html document
    question.innerHTML = '' // 
    question.setAttribute('class', 'question ' + extraClass);

    board.setAttribute('class', 'board hidden'); // make board hide

    var p = document.createElement('p'); // create a paragraph
    p.innerText = q;
    question.appendChild(p);

    if (picture) {
        var img = document.createElement('img');
        img.setAttribute('src', picture);
        question.appendChild(img);
    } 

    return question;
}

function showAnswers (q, callback) {
    var answers = document.getElementById('answers');
    answers.setAttribute('class', 'answers');
    answers.innerHTML = ''

    var buttons = [];
    q.as.forEach(function(a, i) {
        if (a) {
            var button = document.createElement('button');
            button.order = Math.random();
            button.innerHTML = a;
            buttons.push(button)
            button.onclick = function() {
              answers.setAttribute( 'class', 'answers hidden');
                var rightAnswer = i === 0;
                callback(rightAnswer);
            };
        }
    });

    //are there buttons?
    // if yes add them all
    // if no go back
    if (buttons.length === 0){
        answers.setAttribute( 'class', 'answers hidden');
        callback();
    } else {

        buttons.sort(function(a,b){
            return a.order - b.order;
        })

        buttons.forEach(function(button){
            answers.appendChild(button);
        });
    }
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
                
                showAnswers(q, function(rightAnswer) {
                    if (rightAnswer === undefined){
                        // daily double
                        if (score < 0 ) {
                            score = 0;
                        } else {
                            score = score *2;
                        }
                    } else if (rightAnswer){
                        //add score
                        score = score + value;
                    }else{
                        score = score - value;
                    }
                    // 
                    var s = document.getElementById('score');
                    s.setAttribute('class', 'score');
                    s.innerHTML = '$' + score;
                    
                    td.onclick = function(){};
                    board.setAttribute('class', 'board');

                    var query = '#board td:nth-child(' + (c+1) + ').done';
                    var answeredCells = document.querySelectorAll(query);
                    var questionsDone = answeredCells.length;
                    
                    if (column.questions.length === questionsDone) {
                        var colCell = document.getElementById(column.title);
                        colCell.setAttribute('class', 'done');
                    }

                    if (areWeDoneYet()) {
                        finalJeopardy();
                    }
                });
            }
        };
    });
});

function finalJeopardy() {

    var q = askQuestion('Final Jeopardy!', undefined, 'final');
    q.onclick = function() {
        q = askQuestion('Games', undefined, 'category');
        q.onclick = function() {
            q = askQuestion('In this game created by Ninja Kiwi with multiple sequels monkeys pop "bloons" as they go past');
            q.onclick = function() {
                q.setAttribute('class', 'question hidden'); 
                const as = ['BTD 5','Vex 3','Zombs.IO','Slither.IO'];
                showAnswers({as}, function(rightAnswer) {

                   if (rightAnswer) {
                       score = score + 5000;
                    } else  {
                        score = score - 5000;
                    }
                    var s = document.getElementById('score');
                    s.setAttribute('class', 'hidden');
                    askQuestion ('Final Score\n$'+ score);                
                });
            };
        };
    };    
}
var restart = document.getElementById('restart');
restart.onclick = function(){
    location.reload();
};

function start() {
    var q = askQuestion('Jeopardy!', undefined, 'final');
    q.onclick = function() {
        question.setAttribute('class', 'question hidden');       
        board.setAttribute('class', 'board');
    }
}

start();
