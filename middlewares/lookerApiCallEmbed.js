import { sdk } from "./lookerApiCallEmbedHelper"

$('.spinnerDiv').show();

const apiCall = async () => {
  try{
    const data = await sdk.ok(sdk.run_look({look_id: appSession.lookId, result_format: 'json'}))
    $('#data-container').text(JSON.stringify(data))
    $('.spinnerDiv').hide();
  } catch(err) {
    console.error(err.responseText);
    $('#data-container').html(`<span style="color:red;">Error - see console output</span>`);
    $('.spinnerDiv').hide();
  }
}
apiCall()