function checkAnswer(e) {
    const target=e.target;
    const q = target.name;
    const a = target.value;
    const objQuestion = {
        question:q,
        answer:a
    };
    const output = document.getElementById(q + "Result");
    output.innnerHTML='checking...';
    const strJSON = encodeURIComponent(JSON.stringify(objQuestion));
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("get", "/process-quiz?strJSON=" + strJSON, true);
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            const response = decodeURIComponent(xmlhttp.responseText)
            output.innerHTML = response
        }
    }
          xmlhttp.send(null);
}

window.addEventListener('load', function() {
    const answers = document.querySelectorAll("input[type='radio']");
    for (answer of answers) {
        answer.addEventListener('click', checkAnswer, false);
    }
})