app.controller('changepasswordCtrl', function($rootScope, $scope, $http) {
    $scope.change = function() {
        if ($rootScope.student.password == $scope.oldpassword) {
            if ($rootScope.student.password == $scope.studentR.password) {
                Swal.fire({
                    icon: 'error',
                    title: 'Mật khẩu mới phải trùng với mật khẩu cũ!'
                });
            } else {
                $rootScope.student.password = $scope.studentR.password;
                Swal.fire({
                    title: 'Chương trình hỏi đáp?',
                    text: "Bạn có muốn thay đổi mật khẩu không?!",
                    icon: 'success',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Có!',
                    cancelButtonText: 'Không'
                }).then((result) => {
                    if (result.value) {
                        let req = {
                            method: "PUT",
                            url: "https://62ab45a3bd0e5d29af0c59fe.mockapi.io/api/studentAccounts/" + $rootScope.student.id,
                            headers: {
                              "Content-Type": "application/json",
                            },
                            data: JSON.stringify($rootScope.student)
                          };
                          $http(req).then(
                            function () {
                              $scope.repassword = "";
                              Swal.fire(
                                  {
                                  icon: "success",
                                  title: "Chúc mừng bạn đã thay đổi mật khẩu thành công!",
                                  text: "Quay lại trang chủ!",
                                  showConfirmButton: false,
                                  closeOnClickOutside: false,
                                  allowOutsideClick: false,
                                  timer: 1600,
                                }
                                );
                            },
                            function () {
                              Swal.fire({
                                icon: "error",
                                title: "Thay đổi mật khẩu thất bại!",
                                text: "Quay lại trang chủ!",
                                showConfirmButton: false,
                                closeOnClickOutside: false,
                                allowOutsideClick: false,
                                timer: 1600,
                              });
                            }
                          );
                        window.location.href = "#!index";
                    }
                })
            }

        } else {
            Swal.fire({
                icon: 'error',
                title: 'Mật khẩu cũ không đúng!'
            });
        }
        $scope.oldpassword = "";
        $scope.studentR.password = "";
        $scope.renewpassword = "";
    }
});