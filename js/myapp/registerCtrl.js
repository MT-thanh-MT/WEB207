app.controller("registerCtrl", function ($rootScope, $scope, $http) {
  $scope.studentR = {};
  var today = new Date();
  var minAge = 18;
  $scope.minAge = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
  var maxAge = 65;
  $scope.maxAge = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
  $scope.register = function () {
    let req = {
      method: "POST",
      url: "https://62ab45a3bd0e5d29af0c59fe.mockapi.io/api/studentAccounts/",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify($scope.studentR)
    };
    $http(req).then(
      function () {
        $scope.repassword = "";
        Swal.fire(
            {
            icon: "success",
            title: "Chúc mừng bạn đã tạo tài khoản thành công!",
            text: "Hãy đăng nhập để sử dụng dịch vụ!",
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600,
          }
          );
          $rootScope.students.push(angular.copy($scope.studentR));
          console.log($rootScope.students);
        window.location.href = "#!login";
      },
      function () {
        Swal.fire({
          icon: "error",
          title: "Tạo tài khoản thất bại!",
          text: "Quay lại trang chủ!",
          showConfirmButton: false,
          closeOnClickOutside: false,
          allowOutsideClick: false,
          timer: 1600,
        });
      }
    );
  };
});
