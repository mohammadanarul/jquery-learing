$(document).ready(function () {
  const csrftoken = Cookies.get("csrftoken");

  // reset button
  $(".reset-btn").hide();
  $("#updateForm").hide();
  $(".toggle").click(function () {
    // $("p:first").toggle();
    $("p:first").toggle("fast");
  });
  // form handle
  $("#formSubmit").submit(function (event) {
    event.preventDefault();
    let title = $("#title").val();
    if (title == "") {
      alert("Sorry empty input not allow. Kidnly full up full input.");
    }
    alert("Are You sure?");
    $.ajax({
      url: "http://127.0.0.1:8000/tasks/create/",
      method: "POST",
      data: {
        title: title,
      },
      headers: {
        "X-CSRFToken": csrftoken,
      },
      success: function (data) {
        let dataRow = "";
        dataRow += "<tr id='task-" + data["success"].pk + "'>";
        dataRow += "<td class='px-4 py-3 pk'>" + data["success"].pk + "</td>";
        dataRow +=
          "<td class='px-4 py-3 title'>" + data["success"].title + "</td>";
        dataRow +=
          "<td class='px-4 py-3 is-active'>" +
          data["success"].is_active +
          "</td>";
        dataRow +=
          "<td class='space-x-2'>" +
          '<button id="deleteButton" value="' +
          data["success"].pk +
          '"><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg></button>' +
          '<button id="updateBtn" value="' +
          data["success"].pk +
          '"><svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>' +
          "</td>";
        dataRow += "</tr>";
        $("#dataTable").prepend(dataRow);
        $("form")[0].reset();
      },
      error: function (err) {
        console.log("error", err);
      },
    });
  });
  // data query
  $.ajax({
    url: "http://127.0.0.1:8000/tasks/",
    dataType: "json",
    success: function (data) {
      let dataRow = "";
      $.each(data, function (valIndex, val) {
        dataRow += "<tr id='task-" + val.pk + "'>";
        dataRow += "<td class='px-4 py-3 pk'>" + val.pk + "</td>";
        dataRow += "<td class='px-4 py-3 title'>" + val.title + "</td>";
        dataRow += "<td class='px-4 py-3 is-active'>" + val.is_active + "</td>";
        dataRow +=
          "<td class='space-x-2'>" +
          '<button id="deleteButton" value="' +
          val.pk +
          '"><svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"></path></svg></button>' +
          '<button id="updateBtn" value="' +
          val.pk +
          '"><svg class="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>' +
          "</td>";
        dataRow += "</tr>";
      });
      $("#dataTable").append(dataRow);
    },
  });
  // update button
  $("#dataTable").on("click", "#updateBtn", function () {
    let task_id = $(this).val();
    const myThis = $(this);
    $("#updateTitle").val(myThis.parents("tr").find(".title").text());
    // const formSub = $("#formSubmit");
    // formSub.addClass("form-update");
    const updateIcon =
      '<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>';
    // $("#formSubmit").attr("id", "updateForm");
    $("#formSubmit").hide("fast");
    $("#updateForm").show("fast");
    $("#updateForm").append(
      '<input id="taskId" type="number" value="' +
        task_id +
        '" style="display:none">'
    );
    $(".update-btn").attr("value", task_id);
    // $(".update-btn").html(updateIcon);
    $(".reset-btn").show();
  });
  // update date to backend
  $("#updateForm").submit(function (event) {
    event.preventDefault();
    let task_id = $("#taskId").val();
    let title = $("#updateTitle").val();
    $.ajax({
      url: "http://127.0.0.1:8000/tasks/update/" + task_id + "/",
      method: "PUT",
      data: {
        pk: task_id,
        title: title,
      },
      headers: {
        "X-CSRFToken": csrftoken,
      },
      success: function (data) {
        $("#task-" + task_id)
          .find(".title")
          .text(title);
        $("form")[1].reset();
      },
      error: function (err) {
        console.log("error", err);
      },
    });
  });
  // delete data
  $("#dataTable").on("click", "#deleteButton", function () {
    let task_id = $(this).val();
    const myThis = $(this);
    $.ajax({
      type: "DELETE",
      url: "http://127.0.0.1:8000/tasks/delete/" + task_id + "/",
      success: function (response) {
        if (task_id) {
          $(myThis).closest("tr").fadeOut();
        }
        $(".reset-btn").hide("fast");
      },
    });
  });
  // reset button
  $(".reset-btn").click(function (e) {
    e.preventDefault();
    $("form")[0].reset();
    $(".reset-btn").hide("fast");
    $("#formSubmit").show("fast");
    $("#updateForm").hide("fast");
  });
});
