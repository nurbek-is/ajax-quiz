const express = require('express');
const app = express()
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (request, response) => {
    response.redirect('/quiz.html');
});

app.get('/process-quiz', (request, response) => {
  const strJSON = request.query['strJSON'];
  const objJSON = JSON.parse(strJSON);
  const question = objJSON.question;
  const answer = parseInt(objJSON.answer);
  let responseMsg = '';
  switch (question) {
    case "q1":
      if (answer === 2)
        responseMsg = "<span class='right'>Right</span>";
      else
        responseMsg = "<span class='wrong'>Wrong</span>";
      break;
    case "q2":
      if (answer === 3)
        responseMsg = "<span class='right'>Right</span>";
      else
        responseMsg = "<span class='wrong'>Wrong</span>";
      break;
    case "q3":
      if (answer === 1)
        responseMsg = "<span class='right'>Right</span>";
      else
        responseMsg = "<span class='wrong'>Wrong</span>";
      break;
  }
  response.status(200);
  response.send(responseMsg);
});


app.post('/process-challenge', (request, response) => {
  const strJSON = request.body['strJSON'];
  const objJSON = JSON.parse(strJSON);
  const answers = objJSON.answers;
  const correctAnswers = [2, 3, 1];
  const results = {};

  for (let i = 0; i < answers.length; i++) {
    const q = i + 1;
    if (answers[i] === "x") {
      results["q" + q] = "<span class='unanswered'>Unanswered</span>";
    } else if (answers[i] == correctAnswers[i]) {
      results["q" + q] = "<span class='right'>Right</span>";
    } else {
      results["q" + q] = "<span class='wrong'>Wrong</span>";
    }
  }

  response.status(200);
  response.send(results);
});

app.listen(8080);