var input = document.createElement("input")
var num1 = Math.floor(Math.random()*10)
var num2 = Math.floor(Math.random()*10)
var answer
var mode = 0
var modes = [addition, subtraction, multiplication, division, exponets]
input.setAttribute("id", "answer")
input.setAttribute("number", "text")
input.setAttribute("aria-label", "answer")
//TODO: create a spot for the demoninator and numerator with fractions for division
document.body.insertBefore(input, null)
newquestion()

function submit(){
    document.getElementById("response").innerHTML = parseInt(document.getElementById("answer").value) == answer
    newquestion()
}
function newquestion(){
    mode = document.getElementById("mode").value;
    modes[mode]();
}
function addition(){
    num1 = Math.floor(Math.random()*10)
    num2 = Math.floor(Math.random()*10)
    answer = num1 + num2
    document.getElementById("question").innerHTML = num1 + "+" + num2
}
function subtraction(){
    num1 = Math.floor(Math.random()*10)
    num2 = Math.floor(Math.random()*10)
    answer = num1 - num2
    document.getElementById("question").innerHTML = num1 + "-" + num2
}
function multiplication(){
    num1 = Math.floor(Math.random()*10)
    num2 = Math.floor(Math.random()*10)
    answer = [num1 * num2, "", ""]
    document.getElementById("question").innerHTML = num1 + "*" + num2
}
function division(){
    //TODO: get whole num + fraction answer
    num1 = Math.floor(Math.random()*10)
    num2 = Math.floor(Math.random()*10)
    answer = [Math.floor(num1 / num2), num1/num2 - Math.floor(num1 / num2)*num2, num2]
    document.getElementById("question").innerHTML = num1 + "/" + num2
}
function exponets(){
    num1 = Math.floor(Math.random()*10)
    num2 = Math.floor(Math.random()*10)
    answer = num1 ** num2
    document.getElementById("question").innerHTML = num1 + "^" + num2
}