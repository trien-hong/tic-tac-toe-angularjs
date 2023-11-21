var app = angular.module('TicTacToeApp', []);

app.controller('TicTacToeController', function($scope) {
  // [value, isDisabled]
  // i may switch it to array of objects [{"value": "*", "isDisabled": false}, ...]
  $scope.bord_value_array = [
    ["*", false], ["*", false], ["*", false],
    ["*", false], ["*", false], ["*", false],
    ["*", false], ["*", false], ["*", false]
  ];
  $scope.player1_win_count = 0;
  $scope.player2_win_count = 0;
  $scope.status = "Current Player: 1 (X)";
  $scope.player_turn = 0;
  $scope.showResetButton = false;

  $scope.resetBord = function() {
    $scope.bord_value_array = [
      ["*", false], ["*", false], ["*", false],
      ["*", false], ["*", false], ["*", false],
      ["*", false], ["*", false], ["*", false]
    ];
    $scope.status = "Current Player: 1 (X)";
    $scope.player_turn = 0;
    $scope.showResetButton = false;
  }
  
  $scope.switchSymbol = function(i) {
    if ($scope.player_turn % 2 === 0) {
      // player 1 turn
      $scope.bord_value_array[i][0] = "X";
      $scope.bord_value_array[i][1] = true
      $scope.player_turn = $scope.player_turn + 1;
      $scope.status = "Current Player: 2 (O)";
    } else {
      // player 2 turn
      $scope.bord_value_array[i][0] = "O";
      $scope.bord_value_array[i][1] = true
      $scope.player_turn = $scope.player_turn + 1;
      $scope.status = "Current Player: 1 (X)";
    }

    $scope.checkWinner();
  }

  $scope.checkWinner = function() {
    if ($scope.player_turn === 9) {
      alert("It's a draw!");
      $scope.status = "It ended in a draw!";
      $scope.showResetButton = true;
    } else {
      var winner_found = false;
      var winner = undefined;

      if (winner_found === false) {
        // check rows
        var a = 0;
        var b = 1;
        var c = 2;

        for (var i = 0; i < 3; i++) {
          if ($scope.bord_value_array[a][0] === "X" && $scope.bord_value_array[b][0] === "X" && $scope.bord_value_array[c][0] === "X") {
            winner_found = true;
            winner = "X";
            break;
          } else if ($scope.bord_value_array[a][0] === "O" && $scope.bord_value_array[b][0] === "O" && $scope.bord_value_array[c][0] === "O") {
            winner_found = true;
            winner = "O";
            break;
          }

          a = a + 3;
          b = b + 3;
          c = c + 3;
        }
      }
      
      if (winner_found === false) {
        // check columns
        var a = 0;
        var b = 3;
        var c = 6;

        for (var i = 0; i < 3; i++) {
          if ($scope.bord_value_array[a][0] === "X" && $scope.bord_value_array[b][0] === "X" && $scope.bord_value_array[c][0] === "X") {
            winner_found = true;
            winner = "X";
            break;
          } else if ($scope.bord_value_array[a][0] === "O" && $scope.bord_value_array[b][0] === "O" && $scope.bord_value_array[c][0] === "O") {
            winner_found = true;
            winner = "O";
            break;
          }

          a = a + 1;
          b = b + 1;
          c = c + 1;
        }
      }
      
      if (winner_found === false) {
        // check diagonals
        if ($scope.bord_value_array[0][0] === "X" && $scope.bord_value_array[4][0] === "X" && $scope.bord_value_array[8][0] === "X") {
          winner_found = true;
          winner = "X";
        } else if ($scope.bord_value_array[2][0] === "X" && $scope.bord_value_array[4][0] === "X" && $scope.bord_value_array[6][0] === "X") {
          winner_found = true;
          winner = "X";
        } else if ($scope.bord_value_array[0][0] === "0" && $scope.bord_value_array[4][0] === "0" && $scope.bord_value_array[8][0] === "0") {
          winner_found = true;
          winner = "O";
        } else if ($scope.bord_value_array[2][0] === "0" && $scope.bord_value_array[4][0] === "0" && $scope.bord_value_array[6][0] === "0") {
          winner_found = true;
          winner = "O";
        }
      }

      if (winner_found === true) {
        $scope.foundWinner(winner);
      }
    }
  }

  $scope.foundWinner = function(winner) {
    for (var i = 0; i < $scope.bord_value_array.length; i++) {
      $scope.bord_value_array[i][1] = true;
    }

    if (winner === "X") {
      alert("Congrats player 1 (X), you have won the game!");
      $scope.status = "Player 1 won!";
      $scope.player1_win_count = $scope.player1_win_count + 1;
    } else {
      alert("Congrats player 2 (O)! you have won the game!");
      $scope.status = "Player 2 won!";
      $scope.player2_win_count = $scope.player2_win_count + 1;
    }

    $scope.showResetButton = true;
  }
});