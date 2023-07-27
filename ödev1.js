var ad;
var surname;
var password;
const pass = 1234;

function control() {


    ad = document.getElementById('name').value;
    surname = document.getElementById('surname').value;
    password = document.getElementById('password').value;

    if (pass == password) {

        var time = new Date();
        var hour = time.toLocaleTimeString(); // Saati al
        var date = time.toLocaleDateString(); // Tarihi al
        var targetPageURL = "http://127.0.0.1:5501/TodoList/todo.html";

        // Yönlendirme işlemini gerçekleştir
        window.location.href = targetPageURL;
        alert('Merhaba Hoş Geldin ' + ad + ' ' + surname + '\n' + 'Saat: ' + hour + '\n' + 'Tarih: ' + date);
    } else {
        alert('Şifre Yanlış' + '\n' + 'Tekrar Deneyiniz');
    }
}

var forgetpass = document.getElementById('forget');
forgetpass.addEventListener("click", click);

function click() {
    document.getElementById('password').value = pass;
}