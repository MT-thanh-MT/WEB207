var app = angular.module("myApp", ['ngRoute', 'ngCookies']);

app.run(function ($rootScope, $http, $cookies, $timeout) {


    $http.get("https://62ab45a3bd0e5d29af0c59fe.mockapi.io/api/studentAccounts").then(function (response) {
        $rootScope.students = response.data;
        const cookieValue = $cookies.get("username");
        if (cookieValue != null) {
            $rootScope.students.forEach((st) => {
                if (st.username == cookieValue) {
                    $rootScope.student = st;
                }
            });
        }
    });



    $rootScope.student = null;

    $rootScope.logoff = function () {
        $rootScope.student = null;
        $cookies.remove("username");
        $rootScope.indexStudent = -1;
        Swal.fire({
            icon: 'warning',
            title: 'Đã đăng xuất!',
            text: 'Quay lại trang chủ!',
            showConfirmButton: false,
            closeOnClickOutside: false,
            allowOutsideClick: false,
            timer: 1600
        });
        window.location.href = "#!index";
    }
});
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "view/home.html",
            controller: "HomeController"
        })
        .when("/login", {
            templateUrl: "view/login.html",
            controller: "LoginController"
        })
        .when("/test/:id", {
            templateUrl: "view/quizzTest.html",
            controller: "testCtrl"
        })
        .when("/registration", {
            templateUrl: "view/Registration.html",
            controller: "registerCtrl"
        })
        .when("/updateAcc", {
            templateUrl: "view/updateaccount.html",
            controller: "updateaccountCtrl"
        })
        .when("/changePass", {
            templateUrl: "view/changepassword.html",
            controller: "changepasswordCtrl"
        })
        .otherwise({ redirectTo: "/home" });
});
