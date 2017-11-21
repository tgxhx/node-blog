$(function () {
    var testEditor = editormd("editormd", {
        height: 640,
        syncScrolling: "single",
        path: "../js/lib/"
    })

    class Edit {
        constructor() {
            this.init()
            $('#modal1').modal()
        }

        init() {
            this.bindEvent()
        }

        bindEvent() {
            $('.edit-submit-btn a').on('click', (e) => {
                let data = this.getContent()
                $.ajax({
                    url: 'http://localhost:3000/api/posts/create',
                    type: 'post',
                    data,
                    success: res => {
                        if (res.code === 0) {
                            $('#modal1 .modal-content h4').text('Success')
                            $('#modal1 .modal-content p').text(res.message)
                            $('#modal1').modal('open');
                        } else {
                            $('#modal1 .modal-content p').text(res.Error)
                            $('#modal1').modal('open');
                        }
                    },
                    error: err => {
                        console.log(err)
                    }
                })
            })

            $('#post_cover').on('change', function (e) {
                var formData = new FormData()
                formData.append('avatar', $('#post_cover')[0].files[0])
                $.ajax({
                    url: 'http://localhost:3000/upload',
                    type: 'post',
                    data: formData,
                    cache: false,
                    processData: false,
                    contentType: false
                })
                .done(function (res) {
                    if (res.code === 0) {
                        $('#post_cover').attr('data-img', res.path)
                        $('#modal1 .modal-content h4').text('Success')
                        $('#modal1 .modal-content p').text(res.message)
                        $('#modal1').modal('open');
                    }
                })
                .fail(function (err) {
                    console.log(err)
                })
            })
        }

        getContent() {
            let title = $('.edit-title input').val().trim(),
                author = docCookies.getItem('username'),
                tags = $('.edit-tags input').val().trim(),
                create_time = Date.now(),
                cover = $('#post_cover').attr('data-img'),
                markdown = testEditor.getMarkdown(),
                html = testEditor.getPreviewedHTML()
            return { title, author, tags, create_time, cover, markdown, html }
        }
    }

    new Edit()
});
