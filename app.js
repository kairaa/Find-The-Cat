var random = Math.floor(Math.random() * 3);
console.log(random);

var imgs = document.querySelectorAll("img");

var hak = 2;
var restart = true; //oyunun yeniden başlayıp başlamayacağını kontrol eder

var h3 = document.querySelector("h3");

var body = document.querySelector("body");
body.addEventListener("keypress", function () {   //body'de herhangi bir tuşa basılırsa, oyun yeniden başlar
  if (restart) {
    random = Math.floor(Math.random() * 3);       //yeni bir rastgele sayı belirlenir
    console.log(random);
    hak = 2;                                      //hak sıfırlanır
    resimSifirla();                               //resimler sıfırlanır
    h3.textContent = "Kalan Hak: " + hak;
  }
})

imgs.forEach(img => {
  img.addEventListener("click", () => {
    console.log("random: " + random);
    img.src = "images\\kopek.jpg";              //tıklanan resimlerin köpek resmi ile değişir
    // console.log(img.getAttribute("id"));
    img.classList.add("flip");
    img.classList.add("pressed");                 //tıklanan butonlara flash efekti
    setTimeout(function () {
      img.classList.remove("pressed")
    }, 200);

    if (hak !== 0) {
      if (dogruMu(img.getAttribute("id"))) {      //tıklanan resmin id'si random sayıyla eşitse
        img.src = "images\\kedi.jpg";           //resim kedi olarak değiştirilir
        h3.textContent = "Kazandın! Yeniden Başlamak için bir tuşa bas";
        bodyFlash("true");
        playAudio("true");
        oyunBitti();                              //oyun bitirilir
      }
      else {
        hak--;
        if (hak === 0) {                          //hakkın bitmesi durumu
          h3.textContent = "Kaybettin! Yeniden Başlamak için bir tuşa bas";
          bodyFlash("false");
          playAudio("false");
          oyunBitti();
        }
        else {                                    //yanlış cevap durumu
          bodyFlash("false");
          playAudio("false");
          h3.textContent = "Bulamadın, Kalan Hak: " + hak;
          restart = false;
          // console.log("Bulamadın Kalan hak " + hak);
        }
      }
    }
  })
});

function bodyFlash(type) {
  body.classList.add(type);
  setTimeout(function () {
    body.classList.remove(type);
  }, 200);
  restart = false;
}

function oyunBitti() {
  imgs.forEach(img => {
    img.classList.add("flip");
    img.src = "images\\kopek.jpg";
  });
  imgs[random].src = "images\\kedi.jpg";
  restart = true;
}

function dogruMu(id) {
  return id == random;
}

function resimSifirla() {
  imgs.forEach(img => {
    img.classList.remove("flip");
    img.src = "images\\indir.jfif";
  });
}

function playAudio(sound) {
  var audio = new Audio(`sounds/${sound}.mp3`);
  audio.play();
}
