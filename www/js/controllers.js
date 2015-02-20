angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', ['$scope', 'ItemService', '$ionicModal', '$state', 'test',
        function($scope, ItemService, $ionicModal, $state, test) {
            $scope.items = test.query()
            .$promise.then(function (result) {
                    $scope.items = result;
                }).catch(function(_error){
                    console.log(_error.data);
                });


            /**
             * this function is called to display the modal window
             * for adding new items to the collection of data
             * and eventually saving it in the datastore
             *
             * information on $ionicModal is available here
             * - http://ionicframework.com/docs/api/service/$ionicModal/
             */
            $scope.doAddNewItem = function() {

                console.debug("doAddNewItem")

                $ionicModal.fromTemplateUrl('templates/editItem.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function(modal) {

                    $scope.modal = modal;

                    // clear out the model that is being
                    // used in the display of the modal
                    $scope.newEntry = {};

                    // show the modal dialog
                    $scope.modal.show();
                })

            };

            /**
             * called from the UI to closed the modal dialog
             * this handles the click on the save button and the close
             * button, if _save is true than save the data; else just close
             * and cleanup
             */
            $scope.closeModal = function(_save, User) {
                if (_save) {
                    test.save(JSON.stringify(User))
                        .$promise.then(function (result){
                            $scope.update();
                        }).catch(function(_error){
                            console.log(_error.data);
                        });
                }

                // hide the modal dialog
                $scope.modal.hide();
            };

            /**
             * cleaning up the modal so there is no lingering
             * memory objects left around
             */
            $scope.$on('$destroy', function() {
                $scope.newEntry = null;
                $scope.modal.remove();
            });

            $scope.getData = {};
            $scope.putData = {};
            $scope.postData = {};
            $scope.deleteData = {};
            $scope.response = {};

            function genericErrorHandler(_error) {
                console.log(_error.data);
                $scope.response = _error.data;
            }

            /**
             *
             * @param $scope
             */
            $scope.doList = function () {
                // specific helper classes for the HTTP VERBS
                test.query()
                    .$promise.then(function (_response) {
                        $scope.response = _response;
                    }).catch(genericErrorHandler);
            };


            /**
             *
             * @param $scope
             */
            $scope.doGet = function () {

                if (!$scope.getData.id) {
                    $scope.doList();
                    return;
                }

                test.get({_id: $scope.getData.id})
                    .$promise.then(function (_response) {
                        $scope.response = _response;
                    }).catch(genericErrorHandler);

            };


            /**
             *
             * @param $scope
             */
            $scope.doPost = function () {

                test.save(JSON.parse($scope.postData.json))
                    .$promise.then(function (_response) {
                        $scope.response = _response;
                    }).catch(genericErrorHandler);
            };

            /**
             *
             * @param $scope
             */
            $scope.doPut = function () {

                var objectData = JSON.parse($scope.putData.json);
                objectData._id = $scope.putData.id;

                test.update(objectData)
                    .$promise.then(function (_response) {
                        $scope.response = _response;
                    }).catch(genericErrorHandler);

            };


            /**
             *
             * @param $scope
             */
            $scope.doDelete = function () {

                test.remove({_id: $scope.deleteData.id})
                    .$promise.then(function (_response) {
                        $scope.response = _response;
                    }).catch(genericErrorHandler);
            };
}])

//.controller('PlaylistCtrl', function($scope, $stateParams) {
//});
