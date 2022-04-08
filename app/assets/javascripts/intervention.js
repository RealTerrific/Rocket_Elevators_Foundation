$("#buildings").hide();
$("#columns").hide();
$("#elevators").hide();
$("#batteries").hide();

$(function() {

    if ($("select#customer").val() == "") {
     $("select#building option").remove();
     var row = "<option value=\"" + "" + "\">" + "Building" + "</option>";
     $(row).appendTo("select#building");
    }
    $("select#customer").change(function() {
     $("#buildings").show();
     var customer_id = $(this).val();
     if (customer_id == "") {
      $("select#building option").remove();
      var row = "<option value=\"" + "" + "\">" + "building" + "</option>";
      $(row).appendTo("select#building");
     } else {
      // Send the request and update building dropdown
      $.ajax({
       dataType: "json",
       cache: false,
       url: '/get_buildings_by_customer/' + customer_id,
       timeout: 5000,
       error: function(XMLHttpRequest, errorTextStatus, error) {
        alert("Failed to submit : " + errorTextStatus + " ;" + error);
       },
       success: function(data) {
        // Clear all options from building select
        $("select#building option").remove();
        //put in a empty default line
        var row = "<option value=\"" + "" + "\">" + "building" + "</option>";
        $(row).appendTo("select#building");
        // Fill building select
        $.each(data, function(i, j) {
         row = "<option value=\"" + j.id + "\">" + j.id + "</option>";
         $(row).appendTo("select#building");
        });
       }
      });
     }
    });
});

$(function() {

    if ($("select#building").val() == "") {
     $("select#battery option").remove();
     var row = "<option value=\"" + "" + "\">" + "Battery" + "</option>";
     $(row).appendTo("select#battery");
    }
    $("select#building").change(function() {
     $("#batteries").show();
     var building_id = $(this).val();
     if (building_id == "") {
      $("select#battery option").remove();
      var row = "<option value=\"" + "" + "\">" + "battery" + "</option>";
      $(row).appendTo("select#battery");
     } else {
      // Send the request and update battery dropdown
      $.ajax({
       dataType: "json",
       cache: false,
       url: '/get_batteries_by_building/' + building_id,
       timeout: 5000,
       error: function(XMLHttpRequest, errorTextStatus, error) {
        alert("Failed to submit : " + errorTextStatus + " ;" + error);
       },
       success: function(data) {
        // Clear all options from battery select
        $("select#battery option").remove();
        //put in a empty default line
        var row = "<option value=\"" + "" + "\">" + "battery" + "</option>";
        $(row).appendTo("select#battery");
        // Fill battery select
        $.each(data, function(i, j) {
         row = "<option value=\"" + j.id + "\">" + j.id + "</option>";
         $(row).appendTo("select#battery");
        });
       }
      });
     }
    });
});

$(function() {

    if ($("select#battery").val() == "") {
     $("select#column option").remove();
     var row = "<option value=\"" + "" + "\">" + "Column" + "</option>";
     $(row).appendTo("select#column");
    }
    $("select#battery").change(function() {
     $("#columns").show();
     var battery_id = $(this).val();
     if (battery_id == "") {
      $("select#column option").remove();
      var row = "<option value=\"" + "" + "\">" + "column" + "</option>";
      $(row).appendTo("select#column");
     } else {
      // Send the request and update building dropdown
      $.ajax({
       dataType: "json",
       cache: false,
       url: '/get_columns_by_batteries/' + battery_id,
       timeout: 5000,
       error: function(XMLHttpRequest, errorTextStatus, error) {
        alert("Failed to submit : " + errorTextStatus + " ;" + error);
       },
       success: function(data) {
        // Clear all options from building select
        $("select#column option").remove();
        //put in a empty default line
        var row = "<option value=\"" + "" + "\">" + "column" + "</option>";
        $(row).appendTo("select#column");
        // Fill building select
        $.each(data, function(i, j) {
         row = "<option value=\"" + j.id + "\">" + j.id + "</option>";
         $(row).appendTo("select#column");
        });
       }
      });
     }
    });
});

$(function() {

    if ($("select#column").val() == "") {
     $("select#elevator option").remove();
     var row = "<option value=\"" + "" + "\">" + "Elevator" + "</option>";
     $(row).appendTo("select#elevator");
    }
    $("select#column").change(function() {
     $("#elevators").show();
     var column_id = $(this).val();
     if (column_id == "") {
      $("select#elevator option").remove();
      var row = "<option value=\"" + "" + "\">" + "elevator" + "</option>";
      $(row).appendTo("select#elevator");
     } else {
      // Send the request and update building dropdown
      $.ajax({
       dataType: "json",
       cache: false,
       url: '/get_elevators_by_column/' + column_id,
       timeout: 5000,
       error: function(XMLHttpRequest, errorTextStatus, error) {
        alert("Failed to submit : " + errorTextStatus + " ;" + error);
       },
       success: function(data) {
        // Clear all options from building select
        $("select#elevator option").remove();
        //put in a empty default line
        var row = "<option value=\"" + "" + "\">" + "elevator" + "</option>";
        $(row).appendTo("select#elevator");
        // Fill building select
        $.each(data, function(i, j) {
         row = "<option value=\"" + j.id + "\">" + j.id + "</option>";
         $(row).appendTo("select#elevator");
        });
       }
      });
     }
    });
});