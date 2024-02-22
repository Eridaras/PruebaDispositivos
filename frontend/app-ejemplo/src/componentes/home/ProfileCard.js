import React from "react";
import { View, Text, StyleSheet, Image, Linking, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const twitter = <Icon name={'twitter'} size={30} color={'black'}/>
const facebook = <Icon name={'facebook'} size={30} color={'black'}/>
const instagram = <Icon name={'instagram'} size={30} color={'black'}/>
const twitch = <Icon name={'twitch'} size={30} color={'black'}/>
const kwai = <Icon name={'film'} size={30} color={'black'}/>

const ProfileCard = () => {
  const user = {
    avatar: "https://scontent.fuio13-1.fna.fbcdn.net/v/t1.6435-9/82986557_788404334977113_3493443651726475264_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=be3454&_nc_eui2=AeHPBCXNTm9BKuwUvdYM994n8NuL1KSP-Ubw24vUpI_5RjPrszdR_4SLRj4Rh8sjB_ZPXIDPauvaqR6oBnoxumGU&_nc_ohc=Jf19RVA-xXUAX_eZhgX&_nc_ht=scontent.fuio13-1.fna&oh=00_AfCcPBJcyUafd31ZGD6qje8wlkAmHKZRQgn5KEq-nGjDqA&oe=65FD458D",
    coverPhoto: "https://z-p3-scontent.fgye10-1.fna.fbcdn.net/v/t39.30808-6/281686300_5452383861472549_4370732856657907688_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=783fdb&_nc_eui2=AeG7-NKhAqyFIru2IzBVNak4a8C4aAZmillrwLhoBmaKWSpu2PifLO4aYAV9foMmUF-Ub0WLnPkkKgr80Yb4mS3K&_nc_ohc=vGQyALAXsnYAX_V5dX1&_nc_zt=23&_nc_ht=z-p3-scontent.fgye10-1.fna&oh=00_AfB629rsZyvJvuz8oQ4NmGtxFLMKOqcDR2PQyyvy_0NxnQ&oe=65DBBB02",
    name: "Erick Gordillo"
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.coverPhoto }} style={styles.coverPhoto} />
      <View style={styles.avatarContainer}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
      </View>
         <View style={styles.buttonContainer}>

                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://facebook.com/')
                }}>
                    {facebook}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://twitter.com/')
                }}>
                    {twitter}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{color: 'blue'}} onPress={() => {
                    Linking.openURL('https://instagram.com/')
                }}>
                    {instagram}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>Linking.openURL('https://www.twitch.tv/')}>
                    {twitch}
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>Linking.openURL('https://www.kwai.com')}>
                    {kwai}
                </TouchableWithoutFeedback>

            </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center', // flex y grid
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
    fontSize: 30,
    fontWeight: 'bold'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 300,
    width: '80%',
    justifyContent: 'space-between'
  },
  iconContainer: {
    alignItems: 'center'
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 12,
    color: 'black'
  }
});

export default ProfileCard;
