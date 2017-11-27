$.extend({
    request(url, data, type = 'post', obj) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url,
                data,
                type,
                ...obj
            })
            .done(res => {
                resolve(res)
            })
            .fail(err => {
                reject(err)
            })
        })
    }
})

var baseUrl = location.origin.indexOf('localhost') > -1 ? 'http://localhost:3000' : location.origin

window.Api = {
    login: baseUrl + '/api/login',
    register: baseUrl + '/api/register',
    createPost: baseUrl + '/api/posts/create',
    editPost: baseUrl + '/api/posts/edit',
    uploadFile: baseUrl + '/upload'
}

$(function () {
    var $window = $(window),
        $navBar = $('.nav-bar')

    // Initialize collapse button
    $(".button-collapse").sideNav();

    window.docCookies = {
        getItem: function (sKey) {
            return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
        },
        setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
            if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
                return false;
            }
            var sExpires = "";
            if (vEnd) {
                switch (vEnd.constructor) {
                    case Number:
                        sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                        break;
                    case String:
                        sExpires = "; expires=" + vEnd;
                        break;
                    case Date:
                        sExpires = "; expires=" + vEnd.toUTCString();
                        break;
                }
            }
            document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
            return true;
        },
        removeItem: function (sKey, sPath, sDomain) {
            if (!sKey || !this.hasItem(sKey)) {
                return false;
            }
            document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + ( sDomain ? "; domain=" + sDomain : "") + ( sPath ? "; path=" + sPath : "");
            return true;
        },
        hasItem: function (sKey) {
            return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        },
        keys: /* optional method: you can safely remove it! */ function () {
            var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
            for (var nIdx = 0; nIdx < aKeys.length; nIdx++) {
                aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
            }
            return aKeys;
        }
    };
 
    if (docCookies.getItem('username') && location.href.indexOf('login') > -1) {
        location.href = '/'
    }

    $('#side-nav-accordion').find('.link').on('click', function (e) {
        $('#side-nav-accordion li > .submenu').slideUp()
        $(this).next().stop(true, true).slideToggle()
    })

    $window.on('scroll', function () {
        if ($window.scrollTop()) {
            $navBar.addClass('fixed')
        } else{
            $navBar.removeClass('fixed')
        }
    })

    $('.search-btn').on('click', function () {
        $(this).siblings('.search-wrap').toggleClass('focus')
    })
})