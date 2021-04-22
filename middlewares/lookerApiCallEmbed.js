import { Looker40SDK as LookerSDK, CorsSession } from '@looker/sdk';

// Initiate SDK
let sdk
class EmbedSession extends CorsSession {
  async getToken() {
    const token = await sdk.ok(sdk.authSession.transport.request('GET', `${document.location.origin}/api/sdkToken`  ))
    return token
  }
}
const session = new EmbedSession({
  base_url: 'http://localhost:'+appSession.corsProxyPort+'/https://'+appSession.host,
  api_version: '4.0'
})
sdk = new LookerSDK(session)


let lookQuery;
$(document).ready(() => {

  // Get the query behind the user's main look so we can modify its filters as the user changes them
    // then run the query
  $('.spinnerDiv').show();
  sdk.ok(sdk.look(appSession.lookId, 'query'))
  .then(response => {lookQuery = response.query; return 0;})
  .then(() => getResultsFromSelectedValue())
  .catch(err => console.error(err))

})

const runQueryWithFilters = (query, filters, withCache) => {
  return new Promise((resolve, reject) => {
    let newFilters = query.filters;
    for(var k in filters){
      newFilters[k] = filters[k];
    }
    const newQuery = {
      model: query.model,
      view: query.view,
      fields: query.fields,
      pivots: query.pivots,
      fill_fields: query.fill_fields,
      filters: newFilters,
      sorts: query.sorts,
      limit: query.limit,
      column_limit: query.column_limit,
      dynamic_fields: query.dynamic_fields,
      total: query.total,
      row_total: query.row_total,
      subtotals: query.subtotals,
      query_timezone: query.query_timezone
    }
    sdk.ok(sdk.run_inline_query({result_format: 'json', body: newQuery, cache: withCache}))
    .then(result => resolve(result))
    .catch(err => reject(err))
  })  
}

const getResultsFromSelectedValue = () => {
  $('.spinnerDiv').show();
  const selectedValue = $('select[name="daterange"]').children("option:selected").val();
  runQueryWithFilters(lookQuery, {'sessions.date_comparison_period': selectedValue}, true)
  .then(result => {
    updateDashboardTiles(result);
    $('.spinnerDiv').hide();
    return 0;
  })
  .catch(err => {
    console.error(err);
    $('.spinnerDiv').hide();
  })
}

$('select[name="daterange"]').on('change',(e) => {
  getResultsFromSelectedValue();
})

const updateDashboardTiles = (data) => {
  if(!data[0]) {return 0;}
  for(var k in data[0]){
    $('.dashboard-container').find('div[name="'+k.replace('sessions.','')+'"]').find('.measure').html(formatMetric(k,data[0][k]))
    $('.dashboard-container').find('div[name="'+k.replace('sessions.','')+'"]').find('.variation').html(formatToPercent((data[0][k]/data[1][k])-1))
  }
}

const formatToPercent = (number) => (number*100).toFixed(0).toString()+'%'

const formatMetric = (field, value) => {
  switch(field){
    case 'sessions.overall_conversion': return formatToPercent(value); break;
    case 'sessions.total_session_sales': return '$'+value.toFixed(2).toString(); break;
    case 'sessions.total_session_orders': return value.toFixed(0).toString(); break;
    default: return value;
  }
}