# charging-stations
A simple expo app for finding nearest public ev charging stations from OpenChargeMap and starting the charging operation on ev.energy server. The app shows only the ten nearest stations (sorted nearest -> furthest) and their providers and addresses: the focus was on getting accurate results based on user location and providing enough information so that the user can start charging as soon as possible. Future work could include showing technical specs and filtering results by them, as well as providing directions to the selected charging station.

To run this app, you need to have [Expo Cli](https://docs.expo.dev/get-started/installation/) installed.
You can run the app on iOS or Android simulator or on a real device using Expo Go. I have tested this app only on iOS Simulator.

The app uses the device location. See [instructions](https://docs.expo.dev/versions/latest/sdk/location/#enabling-emulator-location) for how to enable location on iOS or Android simulators.

You need your own API key for [OpenChargeMap](https://openchargemap.org/) for the API calls. Add it to the .env file as API_KEY. 

To run the app, type:

npm install

expo start


