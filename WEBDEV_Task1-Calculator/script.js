let string = "";
let buttons = document.querySelectorAll(".button");
Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    if (e.target.innerHTML == "=") {
      string = eval(string);
      document.querySelector("input").value = string;
    } 
    else if (e.target.innerHTML == "C") {
      string = "";
      document.querySelector("input").value = string;
    } 
    else if (e.target.innerHTML == "x²") {
      num = parseInt(string, 10);
      document.querySelector("input").value = num**2;
    } 
    else if (e.target.innerHTML == "√x") {
      num = parseInt(string, 10);
      document.querySelector("input").value = Math.pow(num, 0.5);
    } 
    else {
      console.log(e.target);
      string = string + e.target.innerHTML;
      document.querySelector("input").value = string;
    }
  });
});
