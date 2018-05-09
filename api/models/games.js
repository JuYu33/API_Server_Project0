//define how products should look


const mongoose = require('mongoose');

const gamesSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true},
});

module.exports = mongoose.model('Games', gamesSchema);


//From schedule: http://api.sportradar.us/nba/trial/v4/en/games/2018/05/08/schedule.json?api_key=
/*
Content: 
{
  "date": "2018-05-08",
  "league": {
      "id": "4353138d-4c22-4396-95d8-5f587d2df25c",
      "name": "NBA",
      "alias": "NBA"
  },
  "games": [{
      "id": "7bb47540-95cc-47a4-9ee4-3899794e9524",
      "status": "closed",
      "title": "Game 5",
      "coverage": "full",
      "scheduled": "2018-05-09T00:00:00+00:00",
      "home_points": 112,
      "away_points": 102,
      "track_on_court": true,
      "reference": "0041700225",
      "venue": {
          "id": "5b239206-57ce-50aa-baaa-627f3349dfdc",
          "name": "Toyota Center",
          "capacity": 18055,
          "address": "1510 Polk St.",
          "city": "Houston",
          "state": "TX",
          "zip": "77002",
          "country": "USA"
      },
      "broadcast": {
          "network": "TNT",
          "satellite": "245"
      },
      "home": {
          "name": "Houston Rockets",
          "alias": "HOU",
          "id": "583ecb3a-fb46-11e1-82cb-f4ce4684ea4c",
          "reference": "1610612745"
      },
      "away": {
          "name": "Utah Jazz",
          "alias": "UTA",
          "id": "583ece50-fb46-11e1-82cb-f4ce4684ea4c",
          "reference": "1610612762"
      }
  }, {
      "id": "e55bba63-07a3-4aeb-8e0a-adce124dabdf",
      "status": "closed",
      "title": "Game 5",
      "coverage": "full",
      "scheduled": "2018-05-09T02:30:00+00:00",
      "home_points": 113,
      "away_points": 104,
      "track_on_court": true,
      "reference": "0041700235",
      "venue": {
          "id": "e25e21f2-1d67-5f13-910b-81fc8629eea7",
          "name": "Oracle Arena",
          "capacity": 19596,
          "address": "7000 Coliseum Way",
          "city": "Oakland",
          "state": "CA",
          "zip": "94621",
          "country": "USA"
      },
      "broadcast": {
          "network": "TNT",
          "satellite": "245"
      },
      "home": {
          "name": "Golden State Warriors",
          "alias": "GSW",
          "id": "583ec825-fb46-11e1-82cb-f4ce4684ea4c",
          "reference": "1610612744"
      },
      "away": {
          "name": "New Orleans Pelicans",
          "alias": "NOP",
          "id": "583ecc9a-fb46-11e1-82cb-f4ce4684ea4c",
          "reference": "1610612740"
      }
  }]
}
*/