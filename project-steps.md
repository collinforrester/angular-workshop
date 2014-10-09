# Sample Project Steps and States

The project is a very basic implementation of a phone book application where users can look up contacts and add them to their favorites.

In its initial state the project has several flaws.  The idea behind this is to show the process you can take to legacy AngularJS code to refactor it to a much smaller code base (while adding unit tests).

The project has 3 routes: `/`, `/details:id/` and `/favorites`.  The default `/` route is for searching for new contacts and viewing the results.  After a search, the results are displayed in a list.  The `/details` route is for viewing the details of a contact from either the favorite or contacts page.  The `/details` route gives the user an opportunity to edit the selected contact or favorite.

There is one directive in place that looks up each contact to see if the user has already added it to their favorites.  It has room for optimization.

## Step 1 - Break into Components

There is only 1 controller, `MainCtrl`.  It is declared manually on the `<body>` tag using `ng-controller` and in the `$routeProvider` config section there is no controller assigned to each view, only the url and the template file is wired up.

There are no unit tests on any of the controllers and all of the HTTP requests are executed using `$http` using no DRY principals.

Error handling is done on each individual HTTP call and is showed to the user individually on each view.

All of the code is inside of `app/scripts/app.js`.  This includes the directive, controller, and 1 constant.

### Group Work

The first step we'll do is split out the large main.js controller file into proper AngularJS components.  We should end up with a controller for each view (`FavoritesCtrl` and `DetailsCtrl`) as well as a directive for the existing `favorite-state` code.  Along with breaking out this code to the proper components, we'll be stubbing out some unit test files as well even though we won't have any unit tests written yet.

### Lab

The first lab is minimal and is mostly structural.  The lab task is to finish refactoring the `$routeProvider` to assign the controller and `$scope` to the active route.  Additionally, we'll refactor the existing code inside of `DetailsCtrl` to use a route `resolve` property instead of making an `$http` call immediately upon controller creation.

## Step 2 - Refactor `$http` Usage

You may have noticed in the controllers that there is alot of duplicated code around making $http request whether it is creating, reading, or updating.  Upon every success or failure of the HTTP call the individual view displays the appropriate message.

### Group Work

We'll work together on refactoring the controller `$http` code to use `$resource` instead of making individual `$http` calls.  We'll start with the HTTP calls related to `Contacts`.  At the end of our refactor together we'll end up with a `Contact` factory that will have the ability to `query()` (built in), `get()` (built in), and `note()`.

### Lab

The lab work for this step will be to create the `Favorite` factory in a similar fashion as the `Contact` factory.  This new factory will include the ability to create (built in), `query()` (built in), and `email()`.

## Step 3 - Refactor Existing Directive Into New One

The existing `favorite-state` directive is used in the `/` view to notify the user if a contact is already added to their favorites.  In its current state, the directive makes a call to `/api/favorites` for every element in the `ng-repeat`.  It also doesn't use our new factory that we created in the previous step.

### Group Work

We're going to update the existing directive to use the `$compile` phase to cache the information about the user's existing favorites to illustrate the difference between the `compile` and `link` phases.  We're also going to use the new factory from the last step to make the HTTP call.

// TODO - add group work for adding new notifications directive

### Lab

// TODO - add lab for having students refactor all of the success code to use to the new Notification service and directive

## Step 4 - Error interceptor and cache interceptor

// TODO - add explanation

### Group Work

### Lab

// TODO - add description for ... do we need or want this lab????

## Recap

// TODO - go over what we covered, any questions?

## Bonus

Explain how to take a best guess at number of bindings on a page

Change code to use bind one

Refind the number of bindings

