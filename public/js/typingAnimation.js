let text = document.querySelector(".typing").innerHTML.split('');
document.querySelector('.typing').innerHTML = '';

function frameLooper() {
  if (text.length) {
    document.querySelector(".typing").innerHTML += text.shift();
  } else {
    clearTimeout(0);
  }
  loopTimer = setTimeout('frameLooper()', 50);

}