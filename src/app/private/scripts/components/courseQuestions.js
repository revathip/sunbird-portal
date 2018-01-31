'use strict'

angular.module('playerApp').component('courseQuestions', {
  templateUrl: 'views/course/courseQuestions.html',
  controller: ['$scope', '$rootScope', '$timeout', 'courseQuestionsAdapter', function ($scope, $rootScope,
    $timeout, courseQuestionsAdapter) {
    console.log('username',$rootScope.userName)
    $scope.userName = $rootScope.userName
    $scope.successMessage = true
    $scope.date = new Date()
    $scope.loadQuestions = function () {
      $scope.loading = true
      $scope.widget = ''
      courseQuestionsAdapter.getQuestions().then(function (data) {
        $scope.loading = false
        $scope.widget = 'list-thread'
        $scope.thread = null
        $scope.threads = data.result.threads
      }, function (err) {
        $scope.loading = false
        console.log('err', err)
      })
    }
    $scope.loadQuestions()
    $scope.changeWidget = function (widgetName) {
      $scope.widget = widgetName
    }

    $scope.gotoThread = function (id) {
      $scope.changeWidget('reply-thread')
      $scope.loadThread(id)
    }

    $scope.upVote = function (replyId) {
      console.log('inside upVote', replyId)
      courseQuestionsAdapter.upVote(replyId).then(function (result) {
        console.log('data', result)
      }, function(err) {
        console.log('error while voting', err)
      })
    }

    $scope.loadThread = function (threadId) {
      $scope.loading = true
      $scope.widget = ''
      courseQuestionsAdapter.getQuestionById(threadId).then(function (data) {
        $scope.loading = false
        $scope.widget = 'reply-thread'
        console.log('data', data)
        $scope.thread = data.result.thread
      }, function (err) {
        $scope.loading = false
        console.log('err', err)
      })
    }

    $scope.formSubmit = function (isValid) {
      var obj = {
        'title': $scope.threadTitle,
        'description': $scope.threadDesc
      }
      $scope.loading = true
      courseQuestionsAdapter.composeThread(obj).then(function (result) {
        $scope.loading = false
        $scope.loadQuestions()
      }, function (err) {
        console.log('eeee', err)
      })
    }

    $scope.submitAnswer = function () {
      $scope.reply = {
        'description': $scope.replyAnswer
      }
      $scope.loading = true
      courseQuestionsAdapter.replyThread($scope.thread.id, $scope.reply).then(function (result) {
        $scope.loading = false
        $scope.successMessage = false
    			$timeout(function () {
    				$scope.successMessage = true
    			}, 3000)
        $scope.loadQuestions()
      }, function (err) {
        $scope.loading = false
        console.log('eeee', err)
      })
    }

    $scope.flagAnswer = function (replyId){
      console.log('replyId',replyId)
      courseQuestionsAdapter.updateFlag(replId).then(function (data) {
         console.log('result of updateFlag: ',data)
      }, function (err) {
        console.log('Error in flagAnswer', err)
      })      
    }

  }]
})
