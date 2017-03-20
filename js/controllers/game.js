application.controller('gameController', ['$scope', function($scope){
    var vm = this;

    var caselleSegnateCounter = 0;

    vm.rows = 3;
    vm.cols = 3;
    vm.getCasella = true;
    var giocatori = ['X', 'O'];

    function init(){
        caselleSegnateCounter = 0;
        vm.pareggio = undefined;
        vm.vittoria = undefined;
        vm.casellaAttuale = undefined;
        vm.giocatoreInGioco = giocatori[0];

        vm.play = true;
    }

    $scope.$watch('vm.casellaAttuale', function(newVal, oldVal){
        if (angular.isDefined(newVal) && newVal !== oldVal){
            caselleSegnateCounter++;
            var casella = newVal.split('_');
            checkPartita(parseInt(casella[0]), parseInt(casella[1]));
        }
    });

    vm.resetMatch =function(){
      init();
    };

    function checkPartita(row, col){
        var partitaFinita = checkVittoria(row, col);
        if(!partitaFinita){
            cambiaTurno();
        }
        else{
            vm.play = false;
        }
    }

    function cambiaTurno(){
        if (vm.giocatoreInGioco === giocatori[0]){
            vm.giocatoreInGioco = giocatori[1];
        }
        else if (vm.giocatoreInGioco === giocatori[1]){
            vm.giocatoreInGioco = giocatori[0];
        }
    }


    function checkVittoria(row, col){

        // diagonale
        if(row == col){
            for(var i = 0; i < vm.rows; i++){
                if(vm.getCasella(i, i) !==  vm.giocatoreInGioco)
                    break;
                if(i == vm.rows - 1){
                    return vm.vittoria = true;
                }
            }
        }

        // diagonale inversa
        if(row + col == vm.rows - 1){
            for(i = 0; i < vm.rows; i++){
                if(vm.getCasella(i, (vm.rows-1)-i) !==  vm.giocatoreInGioco)
                    break;
                if(i == vm.rows - 1){
                    return vm.vittoria = true;
                }
            }
        }

        // colonna
        for(i = 0; i < vm.cols; i++){
            if(vm.getCasella(row, i) !==  vm.giocatoreInGioco)
                break;
            if(i == vm.cols - 1){
                return vm.vittoria = true;
            }
        }

        // riga
        for(i = 0; i < vm.rows; i++){
            if(vm.getCasella(i, col) !==  vm.giocatoreInGioco)
                break;
            if(i == vm.rows - 1){
                return vm.vittoria = true;
            }
        }

        //pareggio
        if(caselleSegnateCounter == Math.pow(vm.rows, 2)){
            return vm.pareggio = true;
        }
    }

    init();


}]);