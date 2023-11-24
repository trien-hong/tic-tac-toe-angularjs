var app = angular.module('TicTacToeApp', []);

app.controller('TicTacToeController', function($scope) {
  // [value, isDisabled]
  // i may switch it to array of objects [{"value": "*", "isDisabled": false, "color": "btn-light"}, ...]
  $scope.bord_value_array = [
    ["*", false, "btn-light"], ["*", false, "btn-light"], ["*", false, "btn-light"],
    ["*", false, "btn-light"], ["*", false, "btn-light"], ["*", false, "btn-light"],
    ["*", false, "btn-light"], ["*", false, "btn-light"], ["*", false, "btn-light"]
  ];
  $scope.player1_win_count = 0;
  $scope.player2_win_count = 0;
  $scope.tie_count = 0;
  $scope.status = "Current Player: 1 (X)";
  $scope.player_turn = 0;
  $scope.showResetButton = false;

  $scope.resetBord = function() {
    $scope.confirmModal(
      "Are you sure you want to reset the bord?", // message
      "resetBordConfirmed" // function
    );
  };

  $scope.resetBordConfirmed = function() {
    $scope.bord_value_array = [
      ["*", false, "btn-light"], ["*", false, "btn-light"], ["*", false, "btn-light"],
      ["*", false, "btn-light"], ["*", false, "btn-light"], ["*", false, "btn-light"],
      ["*", false, "btn-light"], ["*", false, "btn-light"], ["*", false, "btn-light"]
    ];
    $scope.status = "Current Player: 1 (X)";
    $scope.player_turn = 0;
    $scope.showResetButton = false;
  };
  
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
  };

  $scope.checkWinner = function() {
    var winner_found = false;
    var winner = undefined;
    var location = [];
    var a = undefined;
    var b = undefined;
    var c = undefined;

    if (winner_found === false) {
      // check rows
      a = 0;
      b = 1;
      c = 2;

      for (var i = 0; i < 3; i++) {
        if ($scope.bord_value_array[a][0] === "X" && $scope.bord_value_array[b][0] === "X" && $scope.bord_value_array[c][0] === "X") {
          winner_found = true;
          winner = "X";
          location.push(a, b, c);
          break;
        } else if ($scope.bord_value_array[a][0] === "O" && $scope.bord_value_array[b][0] === "O" && $scope.bord_value_array[c][0] === "O") {
          winner_found = true;
          winner = "O";
          location.push(a, b, c);
          break;
        }

        a = a + 3;
        b = b + 3;
        c = c + 3;
      }
    }
    
    if (winner_found === false) {
      // check columns
      a = 0;
      b = 3;
      c = 6;

      for (var i = 0; i < 3; i++) {
        if ($scope.bord_value_array[a][0] === "X" && $scope.bord_value_array[b][0] === "X" && $scope.bord_value_array[c][0] === "X") {
          winner_found = true;
          winner = "X";
          location.push(a, b, c);
          break;
        } else if ($scope.bord_value_array[a][0] === "O" && $scope.bord_value_array[b][0] === "O" && $scope.bord_value_array[c][0] === "O") {
          winner_found = true;
          winner = "O";
          location.push(a, b, c);
          break;
        }

        a = a + 1;
        b = b + 1;
        c = c + 1;
      }
    }
    
    if (winner_found === false) {
      // check diagonals
      if (($scope.bord_value_array[0][0] === "X" && $scope.bord_value_array[4][0] === "X" && $scope.bord_value_array[8][0] === "X") ||
          ($scope.bord_value_array[0][0] === "O" && $scope.bord_value_array[4][0] === "O" && $scope.bord_value_array[8][0] === "O")) {
          winner_found = true;
          winner = $scope.bord_value_array[0][0];
          location.push(0, 4, 8);
      }

      if (($scope.bord_value_array[2][0] === "X" && $scope.bord_value_array[4][0] === "X" && $scope.bord_value_array[6][0] === "X") ||
          ($scope.bord_value_array[2][0] === "O" && $scope.bord_value_array[4][0] === "O" && $scope.bord_value_array[6][0] === "O")) {
          winner_found = true;
          winner = $scope.bord_value_array[2][0];
          location.push(2, 4, 6);
      }
    }

    if (winner_found === true) {
      if ($scope.player_turn === 9) {
        $scope.checkDouble(winner, location);
      } else {
        $scope.foundWinner(winner, location);
      }
    } else if ($scope.player_turn === 9) {
      $scope.status = "It ended in a draw!";
      $scope.showResetButton = true;
      $scope.tie_count = $scope.tie_count + 1;
      
      $scope.alertModal(
        "It's a draw!" // message
      );
    }
  };

  $scope.checkDouble = function(winner, location) {
    var d = undefined;
    var e = undefined;

    if (location[0] === 0 && location[1] === 1 && location[2] === 2) {
      d = 3;
      e = 6;

      for (var i = 0; i < 3; i++) {
        if ($scope.bord_value_array[d][0] === winner && $scope.bord_value_array[e][0] === winner) {
          location.push(d, e);
          $scope.foundWinner(winner, location);
        }

        d = d + 1;
        e = e + 1;
      }
    } else if (location[0] === 3 && location[1] === 4 && location[2] === 5) {
      d = 0;
      e = 6;

      for (var i = 0; i < 3; i++) {
        if ($scope.bord_value_array[d][0] === winner && $scope.bord_value_array[e][0] === winner) {
          location.push(d, e);
          $scope.foundWinner(winner, location);
        }

        d = d + 1;
        e = e + 1;
      }
    } else if (location[0] === 6 && location[1] === 7 && location[2] === 8) {
      d = 0;
      e = 3;

      for (var i = 0; i < 3; i++) {
        if ($scope.bord_value_array[d][0] === winner && $scope.bord_value_array[e][0] === winner) {
          location.push(d, e);
          $scope.foundWinner(winner, location);
        }

        d = d + 1;
        e = e + 1;
      }
    } else {
      $scope.foundWinner(winner, location);
    }
  };

  $scope.foundWinner = function(winner, location) {
    for (var i = 0; i < $scope.bord_value_array.length; i++) {
      $scope.bord_value_array[i][1] = true;
    }

    for (var i = 0; i < location.length; i++) {
      $scope.bord_value_array[location[i]][2] = "btn-success";
    }

    if (winner === "X") {
      var message = "Congrats player 1 (X), you have won the game!";
      $scope.status = "Player 1 wins!";
      $scope.player1_win_count = $scope.player1_win_count + 1;
    } else {
      var message = "Congrats player 2 (O), you have won the game!";
      $scope.status = "Player 2 wins!";
      $scope.player2_win_count = $scope.player2_win_count + 1;
    }

    $scope.showResetButton = true;

    $scope.alertModal(
      message // message
    );
  };

  $scope.confirmModal = function(message, confirmFunctionVariable, confirmParameterVariable) {
    $scope.confirm_function = confirmFunctionVariable;
    $scope.confirm_parameter = confirmParameterVariable;
    $scope.show_modal_message_class = true;
    $scope.show_modal_confirm_button = true;
    $scope.show_modal_close_button = false;
    $scope.modal("modal-default", "PLEASE CONFIRM", message, "text-black");
  };

  $scope.alertModal = function(message) {
    $scope.show_modal_message_class = true;
    $scope.show_modal_confirm_button = false;
    $scope.show_modal_close_button = true;
    $scope.modal("modal-default", "ALERT", message, "text-info-emphasis");
  };

  $scope.modal = function(size, title, message, modalClass) {
    $scope.modalSize = size;
    $scope.modalTitle = title;
    $scope.modalMessage = message;
    $scope.modalClass = modalClass;
    $('#modal').modal('show');
  };
});