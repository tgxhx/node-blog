$(function () {
    var testEditor = editormd("editormd", {
        height: 640,
        syncScrolling: "single",
        path: "../js/lib/"
    })

    class Edit {
        constructor() {
            this.init()
        }

        init() {
            this.bindEvent()
        }

        bindEvent() {
            $('.edit-submit-btn a').on('click', (e) => {
                let data = this.getContent()
                console.log(data)
                $.ajax({
                    url: 'test',
                    type: 'post',
                    data,
                    success: res => {

                    },
                    error: err => {

                    }
                })
            })
        }

        getContent() {
            let title = $('.edit-title input').val().trim(),
                author = docCookies.getItem('username'),
                tags = $('.edit-tags input').val().trim(),
                create_time = Date.now(),
                markdown = testEditor.getMarkdown(),
                html = testEditor.getPreviewedHTML()
            return { title, author, tags, create_time, markdown, html }
        }
    }

    new Edit()
});
