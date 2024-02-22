import React from "react";
import {View, Text, StyleSheet, Image, Linking,TouchableWithoutFeedback} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";


const pinterest = <Icon name={'pinterest'} size={30} color={'black'}/>
const spotify = <Icon name={'spotify'} size={30} color={'black'}/>
const reddit = <Icon name={'reddit'} size={30} color={'black'}/>
const github = <Icon name={'github'} size={30} color={'black'}/>
const youtube = <Icon name={'video-library'} size={30} color={'black'}/>
const UceCard = () => {
    const user = {
        avatar: "https://studio.youtube.com/channel/UCH8mJKRvLTYv8GgtrJbIHGQ/editing/images",
        coverPhoto: "https://i.pinimg.com/564x/f0/dc/bd/f0dcbdd092336fdbb3099b4172fdbcb5.jpg",
        name: "Elvis Herrera"
    }
    return (
        <View style={styles.container}>
            <Image source={{uri: user.coverPhoto}} style={styles.coverPhoto}/>
            <View style={styles.avatarContainer}>
                <Image source={{uri: user.avatar}} style={styles.avatar}/>
                <Text style={styles.name}>
                    {user.name}
                </Text>
            </View>
            <View style={styles.buttonContainer}>

                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://pin.it/3UCDTQpXE')
                }}>
                    {pinterest}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://open.spotify.com/user/22yrnwmk2yu47tjfjculn3mvi?si=lPyPppNJQSOWQj9mhpr-bw')
                }}>
                    {spotify}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://www.reddit.com/u/elvis6686/s/YIv4vdDCPN')
                }}>
                    {reddit}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>Linking.openURL('https://github.com/emherrerat')}>
                    {github}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>Linking.openURL('https://www.kwai.com/es')}>
                    {youtube}
                </TouchableWithoutFeedback>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '50%',
        alignItems: 'center' //flex y grid
    },
    coverPhoto: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'

    },
    avatarContainer: {
        alignItems: 'center',
        marginTop: -75
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 10,
        borderColor: 'white'
    },
    name: {
        marginTop: 15,
        fontSize: 20,
        fontWeight: 'bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
        width: '60%',
        justifyContent: 'space-between'
    }
});
export default UceCard