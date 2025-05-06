import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Text,
} from 'react-native';

import ChickenSettingsScreen from './ChickenSettingsScreen';
import LinearGradient from 'react-native-linear-gradient';

import AsyncStorage from '@react-native-async-storage/async-storage';
import ChickenSkinsScreen from './ChickenSkinsScreen';
import ChickenQuizScreen from './ChickenQuizScreen';
import ChickenRunGameScreen from './ChickenRunGameScreen';
import { useAudio } from '../context/AudioContext';
import Sound from 'react-native-sound';

const fontKronaOneRegular = 'KronaOne-Regular';

const ChickenRunHomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [selectedFunnyChickensRunScreen, setSelectedFunnyChickensRunScreen] = useState('Home');
  const [chickenMusicEnabled, setChickenMusicEnabled] = useState(false);
  const [chickenVibrationEnabled, setChickenVibrationEnabled] = useState(false);

  const { volume } = useAudio();
  const [funnyChickensTrackIndex, setFunnyChickensTrackIndex] = useState(0);
  const [sound, setSound] = useState(null);

  const funnyTracksOfBg = ['chickenGameSound.wav', 'chickenGameSound.wav'];

  useEffect(() => {
    playFunnyChickensTrack(funnyChickensTrackIndex);

    return () => {
      if (sound) {
        sound.stop(() => {
          sound.release();
        });
      }
    };
  }, [funnyChickensTrackIndex]);

  useEffect(() => {
    if (sound) {
      sound.setVolume(chickenMusicEnabled ? 1 : 0);
    }
  }, [chickenMusicEnabled, sound]);

  const playFunnyChickensTrack = (index) => {
    if (sound) {
      sound.stop(() => {
        sound.release();
      });
    }

    const newChickenSound = new Sound(funnyTracksOfBg[index], Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Помилка завантаження треку:', error);
        return;
      }
      newChickenSound.setVolume(volume);
      newChickenSound.play((success) => {
        if (success) {
          setFunnyChickensTrackIndex((prevIndex) => (prevIndex + 1) % funnyTracksOfBg.length);
        } else {
          console.log('Error play track');
        }
      });
      setSound(newChickenSound);
    });
  };

  useEffect(() => {
    const loadChickenSettingsOfApp = async () => {
      try {
        const storedChickenNotifications = await AsyncStorage.getItem('chickenMusicEnabled');

        const storedChickenVibro = await AsyncStorage.getItem('chickenVibroEnabled');

        if (storedChickenNotifications !== null) {
          setChickenMusicEnabled(JSON.parse(storedChickenNotifications));
        }

        if (storedChickenVibro !== null) {
          setChickenVibrationEnabled(JSON.parse(storedChickenVibro));
        }
      } catch (error) {
        console.error('Error loading chicken run setting:', error);
      }
    };

    loadChickenSettingsOfApp();
  }, [])




  return (
    <View style={{
      flex: 1,
      width: '100%',
      height: dimensions.height,
    }}>
      <LinearGradient
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        colors={['#F88700', '#FE1B2F']}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
      />
      {selectedFunnyChickensRunScreen === 'Home' ? (
        <SafeAreaView style={{
          flex: 1,
          alignItems: 'center',
        }}>
          <Image
            source={require('../assets/images/chickenRunHomeImage.png')}
            style={{
              width: dimensions.width * 0.5,
              height: dimensions.height * 0.19,
              marginBottom: dimensions.height * 0.07,
              alignSelf: 'center',
            }}
            resizeMode='contain'
          />

          {['Play', 'Skins', 'Quiz', 'Settings'].map((button, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedFunnyChickensRunScreen(button);
              }}
              style={{
                backgroundColor: 'white',
                alignSelf: 'center',
                width: dimensions.width * 0.75,
                alignItems: 'center',
                height: dimensions.height * 0.0754,
                borderRadius: dimensions.width * 0.1111111,
                borderWidth: dimensions.width * 0.003,
                borderColor: 'black',
                marginBottom: dimensions.height * 0.05,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontSize: dimensions.width * 0.065,
                  fontWeight: 700,
                  alignSelf: 'center',
                  fontFamily: fontKronaOneRegular,
                }}>
                {button}
              </Text>
            </TouchableOpacity>
          ))}

        </SafeAreaView>
      ) : selectedFunnyChickensRunScreen === 'Settings' ? (
        <ChickenSettingsScreen setSelectedFunnyChickensRunScreen={setSelectedFunnyChickensRunScreen} chickenMusicEnabled={chickenMusicEnabled} setChickenMusicEnabled={setChickenMusicEnabled}
          chickenVibrationEnabled={chickenVibrationEnabled} setChickenVibrationEnabled={setChickenVibrationEnabled}
        />
      ) : selectedFunnyChickensRunScreen === 'Skins' ? (
        <ChickenSkinsScreen setSelectedFunnyChickensRunScreen={setSelectedFunnyChickensRunScreen} />
      ) : selectedFunnyChickensRunScreen === 'Quiz' ? (
        <ChickenQuizScreen setSelectedFunnyChickensRunScreen={setSelectedFunnyChickensRunScreen} />
      ) : selectedFunnyChickensRunScreen === 'Play' ? (
        <ChickenRunGameScreen setSelectedFunnyChickensRunScreen={setSelectedFunnyChickensRunScreen} chickenMusicEnabled={chickenMusicEnabled}/>
      ) : null}
    </View>
  );
};

export default ChickenRunHomeScreen;
