app.controller('HomeController', function ($scope, $rootScope, $http) {
    $http.get("https://62ab45a3bd0e5d29af0c59fe.mockapi.io/api/courses").then(function (response) {
        $rootScope.list_subject = response.data;
        $scope.pageCount = Math.ceil($rootScope.list_subject.length / 4);
    });
    $scope.cout = 0;
    $scope.prev = () => {
        if ($scope.cout > 0) {
            $scope.cout -= 4;
        }
    };
    $scope.next = () => {
        if ($scope.cout < ($scope.pageCount - 1) * 4) {
            $scope.cout += 4;
        }
    };
    $scope.checkLogin = (Id) => {
        if ($rootScope.student == null) {
            Swal.fire({
                icon: 'error',
                title: 'Bạn chưa đăng nhập!',
                text: 'Vui lòng đăng nhập để làm bài thi!'
            });
        } else {
            window.location.href = "#!test/" + Id;
        }
    };
});