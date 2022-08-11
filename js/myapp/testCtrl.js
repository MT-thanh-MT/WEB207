app.controller('testCtrl', function ($scope, $interval, $http, $routeParams, $rootScope) {
    $http.get("https://62ab45a3bd0e5d29af0c59fe.mockapi.io/api/courses").then(function (response) {
        $rootScope.list_subject = response.data;
        $rootScope.list_subject.forEach(sj => {
            if (sj.Id == $routeParams.id) {
                $scope.subject = angular.copy(sj);
                return;
            };
        });
    });
        $http.get('db/Quizs/' + $routeParams.id + '.js').then(function (response) {
        $scope.questions = response.data;
        if (($scope.questions.length - 10) < 10) {
            $scope.questionsRandom = $scope.questions;
        } else {
            let j = 0;
            let i = Math.floor(Math.random() * ($scope.questions.length - 10));
            let stopindex = i + 10;
            for (i; i < stopindex; i++) {
                $scope.questionsRandom[j] = $scope.questions[i];
                j++;
            };
        }

    });
    $scope.questionsRandom = [];
    $scope.testMark = 0;
    $scope.indexQ = 0;
    $scope.timer = 900;
    $scope.elem = [];
    $scope.isStart = true;
    $scope.isFinish = false;


    $scope.mark = () => {
        $scope.testMark = 0;
        for (let i = 0; i < $scope.questionsRandom.length; i++) {
            if ($scope.questionsRandom[i].AnswerId == $scope.elem[i].answer) {
                $scope.testMark += $scope.questionsRandom[$scope.indexQ].Marks;
            }
        }
    };

    $scope.next = () => {
        $scope.indexQ += 1;
    };

    $scope.prev = () => {
        $scope.indexQ -= 1;
    };

    $scope.starQuizz = () => {
        $scope.isStart = false;
        var stop = $interval(function () {
            if ($scope.timer > 0) {
                $scope.timer -= 1;
            } else if ($scope.timer == 0) {
                $scope.isFinish = true;
                $scope.mark();
                $interval.cancel(stop);
            }
        }, 1000);

    };

    $scope.finish = function () {
        Swal.fire({
            title: 'Bạn có chắc không?',
            text: "Bạn thật sự muốn kết thúc bài thi!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Có',
            cancelButtonText: 'Không'
        }).then((result) => {
            if (result.value) {
                $scope.isFinish = true;
                $scope.mark();
            }
        })
    };
    $scope.playAgain = () => {
        window.location.href = "#!test/" + $routeParams.id;
    };

   
});