import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, Image, TouchableWithoutFeedback, Animated } from 'react-native';

const mainBg = { uri: "https://raw.githubusercontent.com/e-burgos/react-native-weather/master/assets/img/spring.jpg" };
const hotBg = { uri: "https://raw.githubusercontent.com/e-burgos/react-native-weather/master/assets/img/summer.webp" };
const coldBg = { uri: "https://raw.githubusercontent.com/e-burgos/react-native-weather/master/assets/img/winter.jpeg" };

const Weather = ({apiInfo, setApiInfo, setBackground, setSearch}) => {

    // state de animación (no se pasa un una funcion de seteado yaque react lo hace automaticamente)
    const [ animateBtn ] = useState(new Animated.Value(1))

    // Extraer info
    const {name, main, weather} = apiInfo;

    // Grados Kelvin
    const kelvin = 273.15;

    // Temperatura
    const temp = parseInt(main.temp - kelvin)

    useEffect(() => {
        if(Object.keys(apiInfo).length !== 0){
            if(temp < 20){
                setBackground(coldBg);
            } else {
                setBackground(hotBg);
            }
        }
    }, [apiInfo])


    // Animación de entrada
    const animateIn = () => {
        Animated.spring(animateBtn, {
            toValue: .7,
            useNativeDriver: true
        }).start();
    };
    // Animación de salida
    const animateOut = () => {
        Animated.spring(animateBtn, {
            toValue: 1,
            friction: 3,
            tension: 30,
            useNativeDriver: true
        }).start();
    };
    // Estilo de la animación
    const animationStyle = {
        transform: [{ scale: animateBtn }]
    };

    const showForm = () => {
        setTimeout(() => {
            setApiInfo({})
            setBackground(mainBg)
            setSearch({city: '', country: ''})
        }, 500)
    }

    return ( 
        <View style={styles.container}>
            <View style={styles.row}>
                <Text style={styles.temp}>{temp}&#x2103;</Text>
                <Image 
                    style={{width: 80, height: 70}} 
                    source={{ uri: `https://openweathermap.org/img/w/${weather[0].icon}.png` }}
                />
            </View>
            <View style={styles.name}>
                <Text style={styles.title}>{name}</Text>
            </View>
            <View style={styles.content}>
                <View style={styles.item}>
                    <Text style={styles.label}>Sensación Térmica: </Text>
                    <Text style={styles.text}>{parseInt(main.feels_like - kelvin)}&#x2103;</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Máxima: </Text>
                    <Text style={styles.text}>{parseInt(main.temp_max - kelvin)}&#x2103;</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Mínima: </Text>
                    <Text style={styles.text}>{parseInt(main.temp_min - kelvin)}&#x2103;</Text>
                </View>
                <View style={styles.item}>
                    <Text style={styles.label}>Humedad: </Text>
                    <Text style={styles.text}>{parseInt(main.humidity)}%</Text>
                </View>
            </View>
            <View>
                <TouchableWithoutFeedback 
                    onPress={() => showForm()}
                    onPressIn={() => animateIn()}
                    onPressOut={() => animateOut()}
                >
                    <Animated.View style={[styles.btn, animationStyle]}>
                        <Text style={styles.btnText}>Nueva Búsqueda</Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        marginBottom: 10,
        paddingBottom: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    temp: {
        fontSize: 65,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 5
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.4)',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginBottom: 6,
    },
    label: {
        fontSize: 18,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    btn: {
        marginTop: 20,
        backgroundColor: 'black',
        height: 40,
        borderRadius: 5,
        fontSize: 18,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'rgba(135,135,131,0.8)'
    },
    btnText: {
        textAlign: 'center',
        fontSize: 18,
        textTransform: 'uppercase',
        color: 'white',
    }
})
 
export default Weather;