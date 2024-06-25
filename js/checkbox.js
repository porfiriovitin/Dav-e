document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("botaodesubmit").disabled = true;
});

function toggleButton() {
  var checkbox = document.getElementById("flexCheckDefault");
  var botao = document.getElementById("botaodesubmit");

  botao.disabled = !checkbox.checked;

  if (checkbox.checked){
    document.getElementById("autorize").style.display = "none"
  } else{
    document.getElementById("autorize").style.display = "block"
  }
}


