(function IIFE() {
  "use strict";

  /////////////////////////////

  var DEPENDENCIES = ["lumx", "ui.router"];

  function AppDefaultConfig($locationProvider, $stateProvider) {
    $locationProvider.html5Mode({
      enabled: true
    });

    $stateProvider
      .state({
        name: "app",
        url: "/",
        views: {
          "main-nav": {
            templateUrl: "demo/layout/main-nav/main-nav.html"
          },
          "sub-nav": {
            templateUrl: "demo/layout/sub-nav/sub-nav.html"
          }
        }
      })
      .state("app.button", {
        url: "button",
        views: {
          "main@": {
            templateUrl: "demo/components/lx-button/demo.html"
          }
        }
      })
      .state("app.checkbox", {
        url: "checkbox",
        views: {
          "main@": {
            controller: "DemoCheckboxController",
            controllerAs: "vm",
            templateUrl: "demo/components/lx-checkbox/demo.html"
          }
        }
      })
      .state("app.chip", {
        url: "chip",
        views: {
          "main@": {
            templateUrl: "demo/components/lx-chip/demo.html"
          }
        }
      })
      .state("app.data-table", {
        url: "data-table",
        views: {
          "main@": {
            controller: "DemoDataTableController",
            controllerAs: "vm",
            templateUrl: "demo/components/lx-data-table/demo.html"
          }
        }
      })
      .state("app.dialog", {
        url: "dialog",
        views: {
          "main@": {
            controller: "DemoDialogController",
            controllerAs: "vm",
            templateUrl: "demo/components/lx-dialog/demo.html"
          }
        }
      })
      .state("app.dropdown", {
        url: "dropdown",
        views: {
          "main@": {
            controller: "DemoDropdownController",
            controllerAs: "vm",
            templateUrl: "demo/components/lx-dropdown/demo.html"
          }
        }
      })
      .state("app.list", {
        url: "list",
        views: {
          "main@": {
            templateUrl: "demo/components/lx-list/demo.html"
          }
        }
      })
      .state("app.notification", {
        url: "notification",
        views: {
          "main@": {
            controller: "DemoNotificationController",
            controllerAs: "vm",
            templateUrl: "demo/components/lx-notification/demo.html"
          }
        }
      })
      .state("app.progress", {
        url: "progress",
        views: {
          "main@": {
            templateUrl: "demo/components/lx-progress/demo.html"
          }
        }
      })
      .state("app.radio-button", {
        url: "radio-button",
        views: {
          "main@": {
            controller: "DemoRadioButtonController",
            controllerAs: "vm",
            templateUrl: "demo/components/lx-radio-button/demo.html"
          }
        }
      })
      .state("app.select", {
        url: "select",
        views: {
          "main@": {
            controller: "DemoSelectController",
            controllerAs: "vm",
            templateUrl: "demo/components/lx-select/demo.html"
          }
        }
      })
      .state("app.switch", {
        url: "switch",
        views: {
          "main@": {
            controller: "DemoSwitchController",
            controllerAs: "vm",
            templateUrl: "demo/components/lx-switch/demo.html"
          }
        }
      })
      .state("app.tabs", {
        url: "tabs",
        views: {
          "main@": {
            controller: "DemoTabsController",
            controllerAs: "vm",
            templateUrl: "demo/components/lx-tabs/demo.html"
          }
        }
      })
      .state("app.text-field", {
        url: "text-field",
        views: {
          "main@": {
            controller: "DemoTextFieldController",
            controllerAs: "vm",
            templateUrl: "demo/components/lx-text-field/demo.html"
          }
        }
      })
      .state("app.tooltip", {
        url: "tooltip",
        views: {
          "main@": {
            templateUrl: "demo/components/lx-tooltip/demo.html"
          }
        }
      });
  }

  AppDefaultConfig.$inject = ["$locationProvider", "$stateProvider"];

  function AppDefaultRun($http, $templateCache) {
    var templatesToCache = [];

    angular.forEach(templatesToCache, function cacheTemplates(templatePath) {
      $http.get(templatePath).then(function cacheTemplatesSuccess(template) {
        if (angular.isDefinedAndFilled(template)) {
          $templateCache.put(templatePath, template.data);
        }
      });
    });
  }

  AppDefaultRun.$inject = ["$http", "$templateCache"];

  angular
    .module("design-system", DEPENDENCIES)
    .config(AppDefaultConfig)
    .run(AppDefaultRun);
})();