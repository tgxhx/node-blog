class LoginRegister {
  constructor() {
    this.isLogin()
    this.init()
  }
  
  init() {
    this.bingEvent()
    $('#modal1').modal()
  }
  
  bingEvent() {
    $('#register-btn').on('click', this.register)
    $('#login-btn').on('click', this.login)
  }
  
  register(e) {
    e.preventDefault()
    var username = $('#username-r').val(),
      password = $('#password-r').val(),
      passwordConfirm = $('#password-confirmation-r').val()
    
    if (password !== passwordConfirm) {
      alert('two passwords is different')
      return
    }
    
    var data = {username, password}
    $.request(Api.register, data)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  login(e) {
    e.preventDefault()
    var username = $('#username-l').val(),
      password = $('#password-l').val()
    
    var data = {username, password}
    
    $.request(Api.login, data)
      .then(res => {
        if (res.code === 0) {
          location.href = '/'
          console.log(res)
          if (res.token) {
            localStorage.setItem('access_token', res.token)
          }
        } else {
          let message = res.message
          $('#modal1 .modal-content p').text(message)
          $('#modal1').modal('open');
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  isLogin() {
    $.request(Api.isLogin)
      .then(res => {
        if (res.code === 0) {
          location.href = '/'
        }
      })
  }
}

$(function () {
  new LoginRegister()
})