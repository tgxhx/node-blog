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

        var data = { username, password }

        $.ajax({
            url: 'http://localhost:3000/api/register',
            type: 'post',
            data: data,
            success: function (res) {
                console.log(res)
            },
            success: function (err) {
                console.log(err)
            }
        })
    }

    login() {
        var username = $('#username-l').val(),
            password = $('#password-l').val()

        var data = { username, password }

        $.ajax({
            url: 'http://localhost:3000/api/login',
            type: 'post',
            data: data,
            success: function (res) {
                if (res.code === 0) {
                    location.href = '/'
                } else {
                    let message = res.message
                    $('#modal1 .modal-content p').text(message)
                    $('#modal1').modal('open');
                }
            },
            error: function (err) {
                console.log(err)
            }
        })
    }
}

new LoginRegister()