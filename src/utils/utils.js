export const getGeoJSON = (action) => {
  return ({
  type: 'FeatureCollection',
  features: [
    {type: 'Feature', geometry: {area: action}}
  ]
})};