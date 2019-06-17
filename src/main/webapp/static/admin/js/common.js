$(function () {
    $('body>nav.navbar').load(contextPath + '/admin/comNav #mainNav>*', function () {
        let arr = location.pathname.split('/');
        let activeName = arr[arr.length - 1];
        console.log('activeName', activeName)
        $("." + activeName).addClass('active');
    })
});

function logout() {
    var confirm = window.confirm("是否确认退出系统？");
    if (confirm === true) {
        $("form").attr("action", "${contextPath}/login/logout").submit();
    }
}

function logoutForAdmin() {
    var confirm = window.confirm("是否确认退出系统？");
    if (confirm === true) {
        window.location.href = "/hlht/login/logoutForAdmin";
    }
}

