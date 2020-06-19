function checkQuiz(form) {
    const a1 = getAnswer(form.q1);
    const a2 = getAnswer(form.q2);
    const a3 = getAnswer(form.q3);

    const objQuestion = {
        "answers":[a1,a2,a3]
    }
    const strJSON = JSON.stringify(objQuestion)
    // Write code to create and stringify the JSON.
   
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("post","/process-challenge",true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            // Write code to output the results based
            const strJSON = decodeURIComponent(xmlhttp.responseText)
            // on the responseText, which is JSON
            const objJSON = JSON.parse(strJSON)
            for (let i in objJSON) {
                const output = document.getElementById(i + "Result");
                output.innerHTML=objJSON[i];
            }
        }
    }
    xmlhttp.setRequestHeader("Content-Type",
        "application/x-www-form-urlencoded");
    xmlhttp.send("strJSON=" + encodeURIComponent(strJSON));
}

function getAnswer(radio) {
    for (let i=0; i<radio.length; i++) {
        if (radio[i].checked) {
            return radio[i].value;
        }
    }
    return 'x';
}

window.addEventListener('load', function() {
    const quiz=document.getElementById("quiz-form");
    quiz.addEventListener('submit', function(e) {
        checkQuiz(quiz);
        e.preventDefault();
    }, false);
})