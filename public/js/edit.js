$(function () {
  var testEditor = editormd("editormd", {
    height: 640,
    syncScrolling: "single",
    path: "../js/lib/"
  })
  
  class Edit {
    constructor() {
      this.isLogin()
      this.init()
      $('#modal1').modal()
    }
    
    init() {
      this.bindEvent()
    }
    
    bindEvent() {
      $('.edit-submit-btn a').on('click', (e) => {
        let data, url
        if (Is_Edit_Post) {
          data = this.getContent()
          delete data.create_time
          data.id = Post_Id
          url = Api.editPost
        } else {
          data = this.getContent()
          url = Api.createPost
        }
        $.request(url, data)
          .then(res => {
            if (res.code === 0) {
              $('#modal1 .modal-content h4').text('Success')
              $('#modal1 .modal-content p').text(res.message)
              $('#modal1').modal('open')
            } else {
              $('#modal1 .modal-content p').text(res.Error)
              $('#modal1').modal('open')
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
      
      $('#post_cover').on('change', function (e) {
        var formData = new FormData()
        formData.append('image', $('#post_cover')[0].files[0])
        $.request(Api.uploadFile, formData, undefined, {
          cache: false,
          processData: false,
          contentType: false
        })
          .then(res => {
            if (res.code === 0) {
              $('#post_cover').attr('data-img', res.path)
              $('#modal1 .modal-content h4').text('Success')
              $('#modal1 .modal-content p').text(res.message)
              $('#modal1').modal('open')
            }
          })
          .catch(err => {
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
      return {title, author, tags, create_time, cover, markdown, html}
    }
    
    isLogin() {
      $.request(Api.isLogin)
        .then(res => {
          if (res.code !== 0) {
            location.href = '/'
          }
        })
    }
  }
  
  new Edit()
})
