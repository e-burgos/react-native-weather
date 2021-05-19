import React, {useState, useEffect} from 'react';
import { ImageBackground, StyleSheet, View, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Form from './components/Form';
import Header from './components/Header';
import Weather from './components/Weather';

const mainBg = { uri: "https://raw.githubusercontent.com/e-burgos/react-native-weather/master/assets/img/spring.jpg" };


const App = () => {

  const [background, setBackground] = useState(mainBg);
  const [search, setSearch] = useState({city: '', country: ''});
  const [readApi, setReadApi] = useState(false);
  const [apiInfo, setApiInfo] = useState({});

  useEffect(() => {
    const getWeatherInfo = async () => {
      if(readApi){
        const apiKey = '0f7169d35b7d09abeeb756e5dc19361b'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`
        try {
          const response = await fetch(url);
          const data = await response.json();
          
          // Verificar error
          if(data.cod === '404'){
            errorAlert();
            setSearch({...search, city:''});
            setReadApi(false);
            return;
          };

          // Actualizar states
          setApiInfo(data);
          setReadApi(false);
        } catch (error) {
          console.log(error);
        }
      }
    }
    getWeatherInfo()
  }, [readApi])

  const {city, country} = search;

  const getWeather = () => {
    
    

    // Validar campos 
    if(city.trim() === '' || country.trim() === ''){
      showAlert();
      return;
    }
    // Consultar API
    setReadApi(true)

    // Ocultar teclado
    Keyboard.dismiss();

  }

  const showAlert = () => {
    Alert.alert(
      'Error',
      'Agrega una ciudad y un país a la búsqueda',
      [{ text: 'Entendido' }]
    )
  }

  const errorAlert = () => {
    Alert.alert(
      'Error',
      'No encontramos la el clima para esta ciudad, intenta con otra búsqueda',
      [{ text: 'OK' }]
    )
  }

  const hideKeyboard = () => {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
      <ImageBackground source={background} style={styles.background}>
        <Header />
        <View style={styles.mainCointaner}>
          {Object.keys(apiInfo).length === 0 ?
            <View style={styles.cointaner}>
              <Form 
                getWeather={getWeather}
                search={search}
                setSearch={setSearch}
              />
            </View>
          :
            <View style={styles.cointaner}>
              <Weather 
                apiInfo={apiInfo}
                setApiInfo={setApiInfo}
                setBackground={setBackground}
                setSearch={setSearch}
              />
            </View>
          }
        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  mainCointaner: {
    flex: 1,
    justifyContent: 'center'
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  cointaner: {
    marginHorizontal: '2.5%'
  }
});

export default App;
