import React from 'react';
import { ScrollView, ImageBackground, StyleSheet, Text, View } from 'react-native';
import Header from './components/Header'

const image = { uri: "https://i.pinimg.com/originals/7e/1b/b4/7e1bb4b06b451dfe98bb3f31bcceab29.jpg" };

const App = () => {

  return (
    <View style={styles.mainCointaner}>
      <ImageBackground source={image} style={styles.background}>
        <Header />
        <ScrollView>
          <View style={styles.cointaner}>
           <Text>Testing...</Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCointaner: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  cointaner: {
    marginHorizontal: '2.5%',
    marginVertical: '3%'
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center'
  } 
});

export default App;
