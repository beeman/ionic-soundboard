var app = angular.module('app', ['ionic', 'ngCordova']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            templateUrl: 'templates/main.html'
        });
    $urlRouterProvider.otherwise('/');
});

app.controller('appCtrl', function ($scope, $cordovaMedia, $ionicLoading) {

    $scope.pageTitle = "Ionic Soundboard";

    $scope.playFile = function (soundFile) {

        console.log("Platform: " + ionic.Platform.platform());

        if(ionic.Platform.platform().toLowerCase() === 'android') {
            soundFile = '/android_asset/www/' + soundFile;
        }

        console.log("Playing : " + soundFile);

        var media = new Media(soundFile, null, mediaError, mediaStatusCallback);
        $cordovaMedia.play(media);
    };

    var mediaStatusCallback = function(status) {
        console.log("Status: " + status);
        if(status == 1) {
            $ionicLoading.show({template: 'Loading...'});
        } else {
            $ionicLoading.hide();
        }
    };

    $scope.soundsrows = [
        [
            {
                label: "Altair",
                file: "sounds/Altair.wav"
            }, {
                label: "Antares",
                file: "sounds/Altair.wav"
            }
        ], [
            {
                label: "Deneb",
                file: "sounds/Deneb.wav"
            }, {
                label: "Hojus",
                file: "sounds/Hojus.wav"
            }
        ], [
            {
                label: "Lalande",
                file: "sounds/Lalande.wav"
            }, {
                label: "Mira",
                file: "sounds/Mira.wav"
            }
        ], [
            {
                label: "Proxima",
                file: "sounds/Proxima.wav"
            }, {
                label: "Upsilon",
                file: "sounds/Upsilon.wav"
            }
        ]
    ];

    function mediaError(e) {
        console.log(JSON.stringify(e));
    }

});