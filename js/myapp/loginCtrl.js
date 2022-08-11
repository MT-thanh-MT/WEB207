app.controller('LoginController', function ($scope, $rootScope, $cookies) {
    $scope.login = () => {
        var compareAccont = false;
        var successMsg = () => {
            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công!',
                text: 'Đang chuyển đến trang chủ!',
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 1600
            });
        };
        var errorMsg = () => {
            Swal.fire({
                icon: 'error',
                title: 'Đăng nhập thất bại!',
                text: 'Vui lòng điền đúng tài khoản và mật khẩu của bạn!'
            });
        };
        $rootScope.students.forEach(st => {
            if (st.username == $scope.username && st.password == $scope.password) {
                successMsg();
                $rootScope.student = st;
                let today = new Date();
                let expiresValue = new Date(today);
                expiresValue.setHours(today.getHours() + 1);
                $cookies.put("username", $rootScope.student.username, { 'expires': expiresValue });
                $rootScope.indexStudent = st.index;
                window.location.href = "#!index";
                compareAccont = true;
                return;
            } else if (compareAccont == false) {
                errorMsg();
                return;
            };
        });
    };
});