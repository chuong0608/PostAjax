document.getElementById("header").innerHTML=`
<meta charset="UTF-8">
    <title>Title</title>
     <link rel="stylesheet" href="../css/login-css.css">`

document.getElementById("content").innerHTML = `<div class="login-page">
  <div class="form">
    <div class="register-form">
      <input type="text" placeholder="name" id="register-username"/>
      <input type="password" placeholder="password" id="register-password"/>
      <input type="text" placeholder="confirm password" id="register-confirm-password"/>
      <button onclick="register()">create</button>
      <p class="message">Already registered? <a href="#">Sign In</a></p>
    </div>
    <div class="login-form">
      <input type="text" placeholder="username" id="login-username"/>
      <input type="password" placeholder="password" id="login-password"/>
      <button onclick="login()">login</button>
      <p class="message">Not registered? <a href="#">Create an account</a></p>
    </div>
  </div>
</div>`

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

function login() {
    let username = document.getElementById("login-username").value;
    let password = document.getElementById("login-password").value;

    let user = {
        username: username,
        password: password
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/login",
        data: JSON.stringify(user),
        success: function (data) {
            console.log(data)
            localStorage.setItem('token',data.accessToken);
            alert("ok")
            abc()
        }, error: function (er){
            console.log(er)
        }
    })
}

function register() {
    let username = document.getElementById("register-username").value
    let password = document.getElementById("register-password").value
    let confirmPassword = document.getElementById("register-confirm-password").value

    let user = {
        username: username,
        password: password,
        confirmPassword: confirmPassword
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8080/register",
        data: JSON.stringify(user),
        success: function () {
            alert("ok")
            $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
        }
    })


}