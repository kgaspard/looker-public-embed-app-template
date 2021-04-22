$('.spinnerDiv').show();

$.ajax({
    url: "/api/look",
    success: function(data){
      $('#data-container').text(JSON.stringify(data))
      $('.spinnerDiv').hide();
    },
    error: function(err){
      console.error(err.responseText);
      $('#data-container').html(`<span style="color:red;">Error - see console output</span>`);
      $('.spinnerDiv').hide();
    }
});