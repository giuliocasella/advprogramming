var app = angular.module('app1', ['lbServices']);

app.controller('app1Controller',['$scope','Todo',function($scope,Todo) {
	$scope.todos=[];
	$scope.todosdone=[];
	$scope.newTodo={
		name:"",
		desc:"",
		important:false
	}
	$scope.aggiungiTodo=function() {
		console.log($scope.newTodo);
		Todo.upsert($scope.newTodo).$promise.then(function(){
					$scope.todos=[];
					$scope.todosdone=[];
					getTodos();
					
				});
	};
	$scope.cancellaTodo=function(idtodo) {
		console.log("Cancella "+idtodo)
	};
	$scope.eseguiTodo=function(idtodo) {
		for(i=0;i<$scope.todos.length;i++) {

			if($scope.todos[i].id==idtodo){
				//console.log("Eseguo "+idtodo+" ("+i+")");
		
				$scope.todos[i].done=true;
				Todo.upsert($scope.todos[i]).$promise.then(function(){
					$scope.todos=[];
					$scope.todosdone=[];
					getTodos();
					
				});
				break;
			}
		}
		
	};

	function getTodos() {
		Todo.find().$promise.then(function(results) {
			for(i=0;i<results.length;i++){
				if(results[i].done===false)
					$scope.todos.push(results[i]);
				else
					$scope.todosdone.push(results[i]);
			}
			//$scope.todos = results;
			console.log($scope.todos);
			console.log($scope.todosdone);
		});
	}

	getTodos();
}]);