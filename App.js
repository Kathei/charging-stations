import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import axios from 'axios'
import * as Location from 'expo-location'

export default function App() {

  const [data, setData] = useState()
  const [status, setStatus] = useState()
  const [location, setLocation] = useState()
  const [errorMsg, setErrorMsg] = useState()

  const getChargingStations = async (lat, long) => {
    const response = await axios.get(
      `https://api.openchargemap.io/v3/poi?key=${process.env.API_KEY}&latitude=${lat}&longitude=${long}&maxresults=10`
    )
    return response.data
  }

  const onPress = async id => {
    try {
    const response = await axios.post(`https://example.ev.energy/chargingsession`,
    {
      user: 1,
      car_id: 1,
      charger_id: id
    })
    setStatus(response.status)
    }
    catch (e) {
      setStatus(e.message)
    }
  }

  useEffect(async () => {

    const { latitude, longitude } = location.coords
    const stations = await getChargingStations(latitude, longitude)
    setData(stations)
    console.log(stations)
  }, [location])  

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);


  return (
    <SafeAreaView style={styles.container} >
      <ScrollView>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Allow us to fetch your location and you'll see 10 nearest charging stations!</Text>
        {errorMsg && <Text>{errorMsg}</Text>}
        {status && <Text>Charging status: {status}</Text>}
        {data && 
          data.map(station => (
            <View style={styles.stationContainer} key={station.ID}>
            <Text>{station.OperatorInfo ? `${station.OperatorInfo.Title} | ` : ''}{station.AddressInfo.AddressLine1}</Text>
            <Text>{station.AddressInfo.Distance.toFixed(2)} miles away</Text>
            <TouchableOpacity style={styles.button} onPress={() => onPress(station.ID)}><Text>Start charging</Text></TouchableOpacity>
            </View>
          )) }
        {!data && !errorMsg && <Text>Fetching data...</Text>}
        
        </View>
       </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 16
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    paddingBottom: 24
  },

  stationContainer: {
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16
  },
  button: {
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  }
});
