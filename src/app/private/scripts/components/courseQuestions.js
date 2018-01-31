'use strict'

angular.module('playerApp').component('courseQuestions', {
  templateUrl: 'views/course/courseQuestions.html',
<<<<<<< HEAD
  controller: ['$scope', '$rootScope', '$timeout', 'courseQuestionsAdapter', '$stateParams' , function ($scope, $rootScope,
    $timeout, courseQuestionsAdapter, $stateParams) {
    console.log('username',$rootScope.$stateParamsuserName)
=======
  controller: ['$scope', '$rootScope', '$timeout', 'courseQuestionsAdapter','$stateParams', function ($scope, $rootScope,
    $timeout, courseQuestionsAdapter,$stateParams) {
    console.log('username', $rootScope.userName)
>>>>>>> dab09be283443210f3421d5e1966e338ece0a44c
    $scope.userName = $rootScope.userName
    $scope.successMessage = true
    $scope.date = new Date()
    $scope.contextId = $stateParams.courseId    
    console.log("contextId", $scope.contextId)
    $scope.loadQuestions = function (contextId) {
      $scope.loading = true
      $scope.widget = ''
<<<<<<< HEAD
      courseQuestionsAdapter.getQuestions($scope.contextId).then(function (data) {
=======
      courseQuestionsAdapter.getQuestions($stateParams.courseId).then(function (data) {
>>>>>>> dab09be283443210f3421d5e1966e338ece0a44c
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

$scope.loadReplyActions = function(replies){
  $scope.replyActions = {};
  _.forEach(replies,function(reply){
var actions = _.filter(reply.actions_summary,function(action){
  return action.can_act == true
})
$scope.replyActions[reply.id] = _.map(actions,'id')
  })

}

$scope.showAction = function(replyId,actionTypeId){
  return $scope.replyActions[replyId].indexOf(actionTypeId) >= 0
}

    $scope.actions = function (replyId,actionTypeId) {
      courseQuestionsAdapter.actions(replyId,actionTypeId).then(function (result) {
        if(result.response){
          $scope.voteToggle = true;
        }
        console.log('data', result)
      }, function (err) {
        console.log('error while voting', err)
      })
    }

    $scope.undoActions = function (actionId) {
      courseQuestionsAdapter.undoActions(actionId).then(function (result) {
        if(result.actionTypeId){
          $scope.voteToggle = true;
        }
        console.log('data', result)
      }, function (err) {
        console.log('error while voting', err)
      })
    }

    $scope.loadThread = function (threadId) {
      $scope.loading = true
      $scope.widget = ''
      $scope.postedBy = '2222'
      courseQuestionsAdapter.getQuestionById(threadId, $scope.postedBy).then(function (data) {
        $scope.loading = false
        $scope.widget = 'reply-thread'
        console.log('data', data)
        $scope.loadReplyActions(data.result.thread.replies)
        $scope.thread = data.result.thread
      }, function (err) {
        $scope.loading = false
        console.log('err', err)
      })
    }

    $scope.markCorrect = function (userId){
      $scope.selectedAnswer = false
      if (userId == '5001'){
          $scope.selectedAnswer = true
      }
    }

    $scope.unMarkCorrect = function (){
      $scope.selectedAnswer = false
    }

    $scope.formSubmit = function (isValid) {
      var obj = {
        'contextId': $stateParams.courseId,
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
        'contextId': $stateParams.courseId,
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
      /*var obj = {
        'actionType': replyId
      }*/
      courseQuestionsAdapter.updateFlag(replyId).then(function (data) {
         console.log('result of updateFlag: ',data)
      }, function (err) {
        console.log('Error in flagAnswer', err)
      })      
    }

  }]
})