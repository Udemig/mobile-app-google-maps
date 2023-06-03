import React, {useRef} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import MapView, {PROVIDER_GOOGLE, Marker, LatLng} from 'react-native-maps';
import useFetch from './src/hooks/useFetch';
import Loading from './src/components/Loading/Loading';
import UserMarker from './src/components/Marker/UserMarker';

const shoppingCenter = [
  {
    id: 1,
    title: 'Venezia Mega Outlet',
    coordinate: {
      latitude: 41.0805079,
      longitude: 28.8749859,
    },
    description: 'Açıklama',
  },
  {
    id: 2,
    title: 'İstanbul Fuar Merkezi',
    coordinate: {
      latitude: 40.9890015,
      longitude: 28.82359,
    },
    description: 'Açıklama',
  },
];

function App(): JSX.Element {
  const mapRef = useRef();

  const isDarkMode = useColorScheme() === 'dark';

  const {loading, data, error} = useFetch(
    'https://random-data-api.com/api/v2/users?size=10',
  );

  console.log({loading, data, error});

  const activeCard = (coordinates: LatLng) => {
    console.log('Coordinates', coordinates);

    mapRef.current.animateToRegion({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
      latitudeDelta: 10,
      longitudeDelta: 10,
    });
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <View style={styles.container}>
        {loading && data ? (
          <Loading />
        ) : (
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            // initialRegion={{
            //   latitude: 41.0052041,
            //   longitude: 28.8473759,
            //   latitudeDelta: 0.5,
            //   longitudeDelta: 0.0421,
            // }}
            style={styles.map}
            // showsUserLocation
          >
            {data?.map((x: any) => {
              return (
                <UserMarker
                  coordinates={{
                    latitude: x.address.coordinates.lat,
                    longitude: x.address.coordinates.lng,
                  }}
                  title={`${x.first_name} ${x.last_name}`}
                  key={x.id}
                  description={x.phone_number}
                  userImageURL={x.avatar}
                  onPress={() =>
                    activeCard({
                      latitude: x.address.coordinates.lat,
                      longitude: x.address.coordinates.lng,
                    })
                  }
                />
              );
            })}
          </MapView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Dimensions.get('screen').height,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
