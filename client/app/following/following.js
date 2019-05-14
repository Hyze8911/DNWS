'use strict';

angular.module('followingList', ['ngRoute'])
    .component('followingList', {
        templateUrl: 'following/following.html',
        controller: ['$http', '$rootScope', function TweetListController($http, $rootScope) {
            var self = this;

            const requestOptions = {
                headers: { 'X-session': $rootScope.x_session }
            };

            $http.get('http://localhost:8080/twitterapi/following/', requestOptions).then(function (response) {
                self.followings = response.data;
            });
            self.follow = function follow(followingname) {
                const data = "followingname=" + encodeURIComponent(followingname);
                console.log(data);
                $http.post('http://localhost:8080/twitterapi/following/', data, requestOptions).then(function (response) {
                console.log(data);
                console.log(response);
                });
            }
            self.unfollow = function unfollow(followingname) {
                $http.defaults.headers.delete = { 'X-session': $rootScope.x_session, "Content-Type": "application/json;charset=utf-8" }; // ref https://docs.angularjs.org/api/ng/service/$http
                const data = "followingname=" + encodeURIComponent(followingname);
                console.log(data);
                $http.delete('http://localhost:8080/twitterapi/following/?' + data).then(function (response) {
                console.log(data);
                console.log(response);
                });
            }
    }]
});