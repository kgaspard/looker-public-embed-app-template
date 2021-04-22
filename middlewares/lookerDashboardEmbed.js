import { LookerEmbedSDK } from '@looker/embed-sdk';

$('.spinnerDiv').show();

LookerEmbedSDK.init(session.host, '/lookerEmbedAuth');

document.addEventListener('DOMContentLoaded', function () {
  LookerEmbedSDK.createDashboardWithId(session.dashboardId)
    .appendTo('#iframe-container')
    .withClassName('looker-iframe')
    .withTheme(session.theme)
    .withNext()
    .on('page:properties:changed', changeHeight ) // dashboards
    .on('dashboard:loaded', dashboardLoaded)
    .on('dashboard:run:start', dashboardRunStarted)
    .build()
    .connect()
    .then(setupDashboard)
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

const setupDashboard = (dashboard) => {
  $('select[name="daterange"]').on('change', (event) => { 
    updateFilters(dashboard)
  })
}

const dashboardLoaded = () => {
  $('.spinnerDiv').hide();
}

const dashboardRunStarted = () => {

}

const updateFilters = (dashboard) => {
  const dashboard_date_filter = 'Date'
  dashboard.updateFilters({ [dashboard_date_filter]: event.target.value })
  dashboard.run()
}