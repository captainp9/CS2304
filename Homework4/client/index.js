window.addEventListener('load', function()
{
  var xhttp =new XMLHttpRequest();
  var title = document.querySelector("#number-of-the-day");
  var number = document.createElement("p");
  xhttp.onreadystatechange = function() {
    number.textContent = xhttp.responseText;
  };
  title.appendChild(number);
  xhttp.open("GET","/number",false );
  xhttp.send(null);
});
