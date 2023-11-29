var app = angular.module('TicTacToeApp', []);

app.controller('TicTacToeController', function($scope) {
  $scope.theme_color = "dark";
  // $scope.board_value_array[index][value, isDisabled, color]
  // i may switch it to array of objects [{"value": "*", "isDisabled": false, "color": "btn-light"}, ...]
  $scope.board_value_array = [
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
  $('body').css({'background-color': '#8A8A8A'}); 

  $scope.darkMode = function() {
    $('body').css('background-color', '#8A8A8A');
  };

  $scope.lightMode = function() {
    $('body').css('background-color', '#F6F6F6');
  };

  $scope.resetBoard = function() {
    $scope.confirmModal(
      "Are you sure you want to reset the board? This won't affect the win or tie counter.", // message
      "resetBoardConfirmed" // function
    );
  };

  $scope.resetBoardConfirmed = function() {
    $scope.board_value_array = [
      ["*", false, "btn-light"], ["*", false, "btn-light"], ["*", false, "btn-light"],
      ["*", false, "btn-light"], ["*", false, "btn-light"], ["*", false, "btn-light"],
      ["*", false, "btn-light"], ["*", false, "btn-light"], ["*", false, "btn-light"]
    ];
    $scope.status = "Current Player: 1 (X)";
    $scope.player_turn = 0;
    $scope.showResetButton = false;

    $scope.alertToast(
      "The board has been reset! Player 1 (X), it's now your turn again." // message
    );
  };
  
  $scope.switchSymbol = function(i) {
    if ($scope.player_turn % 2 === 0) {
      // player 2 turn
      $scope.board_value_array[i][0] = "X";
      $scope.board_value_array[i][1] = true
      $scope.player_turn = $scope.player_turn + 1;
      $scope.status = "Current Player: 2 (O)";
      $scope.checkWinner("2 (O)");
    } else {
      // player 1 turn
      $scope.board_value_array[i][0] = "O";
      $scope.board_value_array[i][1] = true
      $scope.player_turn = $scope.player_turn + 1;
      $scope.status = "Current Player: 1 (X)";
      $scope.checkWinner("1 (X)");
    }
  };

  $scope.checkWinner = function(player) {
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
        if ($scope.board_value_array[a][0] === "X" && $scope.board_value_array[b][0] === "X" && $scope.board_value_array[c][0] === "X") {
          winner_found = true;
          winner = "X";
          location.push(a, b, c);
          break;
        } else if ($scope.board_value_array[a][0] === "O" && $scope.board_value_array[b][0] === "O" && $scope.board_value_array[c][0] === "O") {
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
        if ($scope.board_value_array[a][0] === "X" && $scope.board_value_array[b][0] === "X" && $scope.board_value_array[c][0] === "X") {
          winner_found = true;
          winner = "X";
          location.push(a, b, c);
          break;
        } else if ($scope.board_value_array[a][0] === "O" && $scope.board_value_array[b][0] === "O" && $scope.board_value_array[c][0] === "O") {
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
      if (($scope.board_value_array[0][0] === "X" && $scope.board_value_array[4][0] === "X" && $scope.board_value_array[8][0] === "X") ||
          ($scope.board_value_array[0][0] === "O" && $scope.board_value_array[4][0] === "O" && $scope.board_value_array[8][0] === "O")) {
          winner_found = true;
          winner = $scope.board_value_array[0][0];
          location.push(0, 4, 8);
      }

      if (($scope.board_value_array[2][0] === "X" && $scope.board_value_array[4][0] === "X" && $scope.board_value_array[6][0] === "X") ||
          ($scope.board_value_array[2][0] === "O" && $scope.board_value_array[4][0] === "O" && $scope.board_value_array[6][0] === "O")) {
          winner_found = true;
          winner = $scope.board_value_array[2][0];
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
      $scope.status = "The game ended in a draw!";
      $scope.showResetButton = true;
      $scope.tie_count = $scope.tie_count + 1;

      for (var i = 0; i < $scope.board_value_array.length; i++) {
        $scope.board_value_array[i][2] = "btn-warning";
      }
      
      $scope.alertModal(
        "The game ended in a draw! It's a tie." // message
      );
    } else {
      $scope.alertToast(
        "Player " + player + ", it's now your turn. Go ahead and click on an available square." // message
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
        if ($scope.board_value_array[d][0] === winner && $scope.board_value_array[e][0] === winner) {
          location.push(d, e);
          break;
        }

        d = d + 1;
        e = e + 1;
      }
    } else if (location[0] === 3 && location[1] === 4 && location[2] === 5) {
      d = 0;
      e = 6;

      for (var i = 0; i < 3; i++) {
        if ($scope.board_value_array[d][0] === winner && $scope.board_value_array[e][0] === winner) {
          location.push(d, e);
          break;
        }

        d = d + 1;
        e = e + 1;
      }
    } else if (location[0] === 6 && location[1] === 7 && location[2] === 8) {
      d = 0;
      e = 3;

      for (var i = 0; i < 3; i++) {
        if ($scope.board_value_array[d][0] === winner && $scope.board_value_array[e][0] === winner) {
          location.push(d, e);
          break;
        }

        d = d + 1;
        e = e + 1;
      }
    }

    $scope.foundWinner(winner, location);
  };

  $scope.foundWinner = function(winner, location) {
    for (var i = 0; i < $scope.board_value_array.length; i++) {
      // disable all buttons/squares
      $scope.board_value_array[i][1] = true;
    }

    for (var i = 0; i < location.length; i++) {
      // highlight the winner's row/column/diagonal(s) in green
      $scope.board_value_array[location[i]][2] = "btn-success";
    }

    for (var i = 0; i < $scope.board_value_array.length; i++) {
      // highlight the loser in red
      if ($scope.board_value_array[i][0] !== winner && $scope.board_value_array[i][0] !== "*") {
        $scope.board_value_array[i][2] = "btn-danger";
      }
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

  $scope.alertToast = function(message) {
    $scope.toast("Tic-tac-toe", "Just now", message);
  };

  $scope.toast = function(title, subtitle, message) {
    $scope.toastTitle = title;
    $scope.toastSubtitle = subtitle;
    $scope.toastMessage = message;
    $('#toast').toast('show');
    $('#modal').modal('hide');
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
    $('#toast').toast('hide');
  };
});