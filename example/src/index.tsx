// app entry
import React from 'react';
import {
  AppRegistry,
  Platform,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { Entry } from './entry-example';
import { ScrollView } from 'react-native-gesture-handler';
import { Link, Navigator, Tabs, BOTTOM_SPACE } from 'react-navigation-library';

function App() {
  const routes = ['/', '/login'];

  return (
    <AppContainer>
      <Navigator routes={routes}>
        {({ index }: any) => (
          <>
            <Tabs pan={{ enabled: false }}>
              <Index routes={routes} />
              <Entry unmountOnExit />
            </Tabs>

            {index !== 0 && (
              <Link to="/" style={styles.homeButton}>
                <Text style={styles.title}>Return Home</Text>
              </Link>
            )}
          </>
        )}
      </Navigator>
    </AppContainer>
  );
}

function Index({ routes }: any) {
  const [, ...rest] = routes;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.title}>Index</Text>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ alignItems: 'center' }}
      >
        {rest.map((route: string) => (
          <Link
            to={route}
            style={{ borderWidth: 1, borderRadius: 4, padding: 10 }}
          >
            <Text>{route}</Text>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function AppContainer({ children }: any) {
  return <View style={styles.appContainer}>{children}</View>;
}

const styles = StyleSheet.create({
  appContainer: Platform.select({
    web: {
      width: 400,
      height: 500,
      marginVertical: 10,
      marginHorizontal: 'auto',
      overflow: 'hidden',
    },

    default: {
      flex: 1,
    },
  }),

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  homeButton: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: BOTTOM_SPACE + 10,
  },

  card: {
    height: 75,
    width: '100%',
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const APP_NAME = 'example';
// register the app
AppRegistry.registerComponent(APP_NAME, () => App);

// register the web
if (Platform.OS === 'web') {
  AppRegistry.runApplication(APP_NAME, {
    rootTag: document.getElementById('root'),
  });
}
