vde.App.controller('GroupsCtrl', function($scope, $rootScope, $location) {
  $scope.gMdl = { // General catch-all model for scoping
    groups: vde.Vis.groups,
    pipelines: vde.Vis.pipelines
  }; 

  $scope.toggleVisual = function(v) {
    $rootScope.activeVisual = v;
    $rootScope.activeGroup  = v.group || v;

    $rootScope.activePipeline = v.pipeline;
    $scope.gMdl.activeVisualPipeline = (v.pipeline || {}).name;
  };  

  $scope.setPipeline = function() {
    var p = $scope.gMdl.activeVisualPipeline;
    if(p == '') $scope.activeVisual.pipeline = null;
    else if(p == 'vdeNewPipeline') {
      $scope.activeVisual.pipeline = new vde.Vis.Pipeline();
      $rootScope.activePipeline = $scope.activeVisual.pipeline;
      $scope.gMdl.activeVisualPipeline = $scope.activeVisual.pipeline.name;
    }
    else {
      $scope.activeVisual.pipeline = vde.Vis.pipelines[p];
      $rootScope.activePipeline = vde.Vis.pipelines[p];
    }
  };

  $scope.addAxis = function() {
    var axis = new vde.Vis.Axis('', $rootScope.activeGroup);
    $rootScope.activeVisual = axis;
  };

  $scope.removeVisual = function(type, name) {
    var cnf = confirm("Are you sure you wish to delete this mark?")
    if(!cnf) return;

    delete $rootScope.activeGroup[type][name];
    vde.Vis.parse();
  };

  $scope.toggleFont = function(prop, value) {
    var p = $rootScope.activeVisual.properties[prop];
    if(p.value == value) delete p.value;
    else p.value = value;

    $rootScope.activeVisual.checkExtents(prop);

    vde.Vis.parse();
  };
});