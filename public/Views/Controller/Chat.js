var app=angular.module('Chat',['ngStorage']);
app.controller('ChatController',['$scope','$localStorage','$filter','$location','$http',function(scope,local,filter,location,http){
    scope.message=[];
    var serverurl=location.absUrl();
    console.log(serverurl);

    scope.sendMessage=function(){
    if(scope.Text!=null |scope.Text!=undefined){
    var message={};
    message.Type="Sent";
    message.Author="Sandip"
    message.Text=scope.Text;
    message.Timestamp=new Date();
    scope.message.push(message);
    http.post(serverurl+'watson',message).then(function(request,response){
        scope.message=response.data;
        console.log("success",JSON.stringify(response));
    }),function error(response){
        
        console.log(response);

    }
    }
}

}]);