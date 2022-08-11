app.controller(
  "updateaccountCtrl",
  function ($rootScope, $scope, $http, $cookies) {
    $http
      .get("https://62ab45a3bd0e5d29af0c59fe.mockapi.io/api/studentAccounts")
      .then(function (response) {
        $rootScope.students = response.data;
        // console.log($rootScope.students);
        const cookieValue = $cookies.get("username");
        if (cookieValue != null) {
          $rootScope.students.forEach((st) => {
            if (st.username == cookieValue) {
              $rootScope.student = st;
            }
          });
        }
        $scope.studentUD = {};
        $scope.studentUD = angular.copy($rootScope.student);
        $scope.studentUD.birthday = new Date($scope.studentUD.birthday);
      });

    var today = new Date();
    var minAge = 18;
    $scope.minAge = new Date(
      today.getFullYear() - minAge,
      today.getMonth(),
      today.getDate()
    );
    var maxAge = 65;
    $scope.maxAge = new Date(
      today.getFullYear() - maxAge,
      today.getMonth(),
      today.getDate()
    );
    $scope.update = function () {
      Swal.fire({
        title: "Chương trình hỏi đáp?",
        text: "Bạn có muốn thay đổi thông tin tài khoản không?!",
        icon: "success",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Có!",
        cancelButtonText: "Không",
      }).then((result) => {
        if (result.value) {
          let req = {
            method: "PUT",
            url:
              "https://62ab45a3bd0e5d29af0c59fe.mockapi.io/api/studentAccounts/" +
              $rootScope.student.id,
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify($scope.studentUD),
          };
          $http(req).then(
            function () {
              $scope.repassword = "";
              $rootScope.student = angular.copy($scope.studentUD);
              Swal.fire({
                icon: "success",
                title: "Thay đổi thông tài khoản thành công!",
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 1600,
              });
            },
            function () {
              Swal.fire({
                icon: "error",
                title: "Thay đổi thông tin tài Khoản thất bại!",
                showConfirmButton: false,
                closeOnClickOutside: false,
                allowOutsideClick: false,
                timer: 1600,
              });
            }
          );
        }
      });
    };
  }
);
