class LoginRegister {
  constructor() {
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
  
  register() {
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
  
  login() {
    var username = $('#username-l').val(),
      password = $('#password-l').val()
    
    var data = {username, password}
    
    $.request(Api.login, data)
      .then(res => {
        if (res.code === 0) {
          location.href = '/'
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
}

$(function () {
  new LoginRegister()
})