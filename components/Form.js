import React, {useState} from 'react';
import { Text, View, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Platform } from 'react-native';
import { Picker } from '@react-native-community/picker';


const Form = ({getWeather, search, setSearch}) => {

    // Extraer valores de la busqueda 
    const { city, country } = search;

    // state de animación (no se pasa un una funcion de seteado yaque react lo hace automaticamente)
    const [ animateBtn ] = useState(new Animated.Value(1))

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

    return ( 
        <View>
            <View>
                <TextInput
                    style={styles.input} 
                    placeholder="Ingresa una ciudad"
                    placeholderTextColor="black"
                    autoCorrect={false}
                    value={city}
                    onChangeText={(city) => setSearch({...search, city})}
                />
            </View>
            <View style={styles.androidPicker}>
                <Picker
                    itemStyle={{height: 120, color: 'black', fontWeight: 'bold'}}
                    selectedValue={country}
                    onValueChange={(country) => setSearch({...search, country})}
                >
                    <Picker.Item label="- Selecciona un país -" value="" />
                    <Picker.Item label="Argentina" value="AR" />
                    <Picker.Item label="Colombia" value="CO" />
                    <Picker.Item label="Brasil" value="BR" />
                    <Picker.Item label="Mexico" value="MX" />
                    <Picker.Item label="Estados Unidos" value="US" />
                    <Picker.Item label="España" value="ES" />
                    <Picker.Item label="Perú" value="PE" />
                </Picker>
            </View>
            <TouchableWithoutFeedback 
                onPress={() => getWeather()}
                onPressIn={() => animateIn()}
                onPressOut={() => animateOut()}
            >
                <Animated.View style={[styles.btn, animationStyle]}>
                    <Text style={styles.btnText}>Obtener Clima</Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
     );
}

const styles = StyleSheet.create({
    input: {
        backgroundColor: 'rgba(135,135,131,0.2)',
        height: Platform.OS === 'ios' ? 40 : 50,
        borderRadius: 5,
        paddingLeft: Platform.OS === 'ios' ? 10 : 20,
        fontSize: Platform.OS === 'ios' ? 20 : 16,
        color: 'black',
        fontWeight: Platform.OS === 'ios' ? 'bold' : null,
        marginHorizontal: '2.5%',
        textAlign: Platform.OS === 'ios' ? 'center' : null,
        borderWidth: 1,
        borderColor: 'rgba(135,135,131,0.8)'
    },
    androidPicker: {
        backgroundColor: Platform.OS === 'android' ? 'rgba(135,135,131,0.2)' : null,
        height: Platform.OS === 'android' ? 50 : null,
        borderRadius: Platform.OS === 'android' ? 5 : null,
        paddingLeft: Platform.OS === 'android' ? 10 : null,
        fontSize: Platform.OS === 'android' ? 20 : null,
        color: Platform.OS === 'android' ? 'black' : null,
        fontWeight: Platform.OS === 'android' ? 'bold' : null,
        marginHorizontal: Platform.OS === 'android' ? '2.5%' : null,
        textAlign: Platform.OS === 'android' ? 'center' : null,
        borderWidth: Platform.OS === 'android' ? 1 : null,
        borderColor: Platform.OS === 'android' ? 'rgba(135,135,131,0.8)' : null,
        marginVertical: Platform.OS === 'android' ? 10 : null,
    },
    btn: {
        backgroundColor: 'black',
        height: 40,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 18,
        marginHorizontal: '2.5%',
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
 
export default Form;