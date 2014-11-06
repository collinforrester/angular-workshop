# Lab 0 - Modules

`git checkout lab-0`

## Goal
Refactor the large `app.js` file into its appropriate pieces.  This will include creating (`yo angular:controller CONTROLLER_NAME`) 3 controllers: `MainCtrl`, `DetailsCtrl`, and `FavoritesCtrl` and 1 directive (`yo angular:directive favoriteState`) `favoritestate.js`.  I use the term "create" lightly as it is mostly copying and pasting the appropriate pieces of code.

## Details

Currently there is only 1 controller, `MainCtrl`.  It is declared manually on the `<body>` tag using `ng-controller` and in the `$routeProvider` config section there is no controller assigned to each view, only the url and the template file is wired up.

There are no unit tests on any of the controllers and all of the HTTP requests are executed using `$http` with alot of repeated code.  Error handling is done on each individual HTTP call and is showed to the user individually on each view.  All of the code is inside of `app/scripts/app.js`.  This includes the directive, controller, and 1 constant.

Luckily for us, it is at least already using `$routeProvider` in the `.config()` section in `app.js` so refactoring the appropriate functions to their own files and `.controller()` components will be minimal work.

At the end of this lab we will still not have any working tests.

