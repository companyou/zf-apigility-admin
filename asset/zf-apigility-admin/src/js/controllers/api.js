(function() {
  'use strict';

angular.module('ag-admin').controller(
  'ApiController',
  function($scope, $state, $timeout, flash, apis, ApiRepository) {
    var apiList = [];
    angular.forEach(apis, function (api) {
      apiList.push({
        apiName: api.name,
        version: api.versions.pop()
      });
    });
    $scope.apiList = apiList;

    $scope.showNewApiForm = false;

    $scope.createNewApi = function ($event) {
      var form = angular.element($event.target);
      form.find('input').attr('disabled', true);
      form.find('button').attr('disabled', true);

      ApiRepository.createNewApi($scope.apiName).then(function (newApi) {
        // reset form, repopulate, redirect to new
        $scope.dismissModal();
        $scope.resetForm();

        flash.success = 'New API Created';
        $timeout(function () {
          $state.go('ag.api.version', {apiName: newApi.name, version: 1});
        }, 500);
      });
    };

    $scope.resetForm = function () {
      $scope.showNewApiForm = false;
      $scope.apiName = '';
    };
  }
);
})();

