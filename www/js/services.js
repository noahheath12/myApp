angular.module('starter.services', [])

    .factory('ItemService', [ function(){
        var _playlists = [ "one", "two", "three", "four"];
        return  {
            getAllItems : function() {
                return _playlistss;
            }
        }
    }])

.factory('test', ['$resource', 'KINVEY', function ($resource, KINVEY) {

    /**
     */
    function genericErrorHandler(_error) {
        console.log(_error.data);
        $scope.response = _error.data;
    }

    var reqHeaders = {
        'Authorization': KINVEY.auth
    };

    var User = $resource(KINVEY.baseUrl + ":_id",{},
        {
            // headers are passed in as javascript name/value pairs
            'query': {
                headers: reqHeaders,
                isArray: true
            },
            'save': {
                method: 'POST',
                headers: reqHeaders
            },
            'get': {
                headers: reqHeaders
            },
            'update': {
                method: 'PUT',
                params: {_id: "@_id"},
                headers: reqHeaders
            },
            'remove': {
                method: 'DELETE',
                headers: reqHeaders
            }
        });

    return User;
}]);