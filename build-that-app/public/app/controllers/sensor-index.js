define([
  'data/sensors',
  'views/sensors-list',
  'views/sensor-detail',
  'backbone'
], function( SensorCollection, SensorsList, SensorDetail, B ) {
  var sensorList, sensorDetail;
  var sensors = new SensorCollection();

  var SensorIndex = function() {
    sensorList = new SensorsList({
      collection: sensors
    });

    sensorList.render();
    sensorList.placeAt('#sensors-list');

    sensors.fetch();
  };

  SensorIndex.prototype.showDetail = function( sensorId ) {
    if ( sensorDetail ) {
      sensorDetail.destroy();
    }

    sensors.fetch({
      success: function() {
        sensorDetail = new SensorDetail({
          model: sensors.get( sensorId )
        }).render();

        sensorDetail.placeAt('#sensor-detail');
      }
    });

  };

  return SensorIndex;
});