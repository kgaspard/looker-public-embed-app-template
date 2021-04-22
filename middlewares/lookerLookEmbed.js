import { LookerEmbedSDK } from '@looker/embed-sdk';

$('.spinnerDiv').show();

LookerEmbedSDK.init(session.host, '/lookerEmbedAuth');

document.addEventListener('DOMContentLoaded', function () {
  LookerEmbedSDK.createLookWithId(session.lookId)
    .appendTo('#iframe-container')
    .withClassName('looker-iframe')
    .withTheme(session.theme)
    .on('page:properties:changed', changeHeight)
    .on('look:ready', lookReady)
    .on('look:run:start', lookRunStarted)
    .build()
    .connect()
    .then(setupLook)
    .catch((error) => {
      console.error('Connection error', error)
    })
})

const changeHeight = (event) => {
  const div = document.getElementById('iframe-container')
  if (event && event.height && div) {
    div.style.height = `${event.height+30}px`
  }
}

const setupLook = (look) => {

}

const lookReady = () => {
  $('.spinnerDiv').hide();
}

const lookRunStarted = () => {

}