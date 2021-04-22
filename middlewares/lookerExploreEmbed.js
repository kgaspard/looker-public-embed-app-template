import { LookerEmbedSDK } from '@looker/embed-sdk';

$('.spinnerDiv').show();

LookerEmbedSDK.init(session.host, '/lookerEmbedAuth');

document.addEventListener('DOMContentLoaded', function () {
  LookerEmbedSDK.createExploreWithId(session.modelName+'::'+session.exploreName)
    .appendTo('#iframe-container')
    .withClassName('looker-iframe')
    .on('explore:ready', exploreReady)
    // .on('page:properties:changed', changeHeight )
    .build()
    .connect()
    .then(setupExplore)
    .catch((error) => {
      $('.spinnerDiv').hide();
      console.error('Connection error', error)
    })
})

const changeHeight = (event) => {
  const div = document.getElementById('iframe-container')
  if (event && event.height && div) {
    div.style.height = `${event.height+100}px`
  }
}

const exploreReady = () => {
  $('.spinnerDiv').hide();
}

const setupExplore = (explore) => {
}