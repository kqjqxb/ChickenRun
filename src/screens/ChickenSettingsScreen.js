import React, { useState } from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Share
} from 'react-native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

const fontInterRegular = 'Inter-Regular';
const fontKronaOneRegular = 'KronaOne-Regular';

const ChickenSettingsScreen = ({ setSelectedTimeChroniclesPage, chickenAudioEnabled, setChickenAudioEnabled }) => {
    const [dimensions, setDimensions] = useState(Dimensions.get('window'));

    const onShare = async () => {
        try {
            await Share.share({
                message: "Fishin' Time Chronicles is your personal fishing guide where you can record your fishing achievements, catch new fish species and create a unique aquarium. Save your best catches, learn interesting facts about fish and improve your fishing skills while enjoying an exciting game!",
            });
        } catch (error) {
            console.error('Error sharing text:', error);
        }
    };

    return (
        <SafeAreaView style={{ width: dimensions.width, height: dimensions.height }}>
            <Text
                style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: dimensions.width * 0.065,
                    fontWeight: 500,
                    alignSelf: 'center',
                    fontFamily: fontKronaOneRegular,
                }}>
                Settings
            </Text>

            <View style={{
                width: dimensions.width * 0.898,
                alignSelf: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                borderRadius: dimensions.width * 0.05551,
                paddingVertical: dimensions.height * 0.020101,
                paddingHorizontal: dimensions.width * 0.05,
                marginTop: dimensions.height * 0.1,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Text
                        style={{
                            color: 'black',
                            textAlign: 'left',
                            fontSize: dimensions.width * 0.05,
                            fontWeight: 500,
                            fontFamily: fontKronaOneRegular,
                            flex: 1,
                        }}>
                        Audio:
                    </Text>

                    <TouchableOpacity
                        onPress={() => setChickenAudioEnabled((prev) => !prev)}
                        style={{
                            width: dimensions.width * 0.18,
                            height: dimensions.height * 0.034,
                            borderRadius: dimensions.width * 0.525252,
                            borderWidth: dimensions.width * 0.003,
                            borderColor: 'black',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        {!chickenAudioEnabled && (
                            <Text
                                style={{
                                    color: 'black',
                                    textAlign: 'left',
                                    fontSize: dimensions.width * 0.04,
                                    fontWeight: 500,
                                    fontFamily: fontKronaOneRegular,
                                    paddingLeft: dimensions.width * 0.02,
                                }}>
                                on
                            </Text>
                        )}
                        <View style={{
                            width: dimensions.height * 0.034,
                            height: dimensions.height * 0.034,
                            borderRadius: dimensions.width * 0.5,
                            backgroundColor: 'black',
                        }} />

                        {chickenAudioEnabled && (
                            <Text
                                style={{
                                    color: 'black',
                                    textAlign: 'left',
                                    fontSize: dimensions.width * 0.04,
                                    fontWeight: 500,
                                    fontFamily: fontKronaOneRegular,
                                    marginRight: dimensions.width * 0.016,
                                }}>
                                off
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={{
                    marginVertical: dimensions.height * 0.05,
                    width: '100%'
                }}>
                    <Text
                        style={{
                            color: 'black',
                            textAlign: 'left',
                            fontSize: dimensions.width * 0.05,
                            alignSelf: 'flex-start',
                            fontWeight: 500,
                            fontFamily: fontKronaOneRegular,
                            marginVertical: dimensions.height * 0.05,
                        }}>
                        Volume:
                    </Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Text
                        style={{
                            color: 'black',
                            textAlign: 'left',
                            fontSize: dimensions.width * 0.05,
                            fontWeight: 500,
                            fontFamily: fontKronaOneRegular,
                            flex: 1,
                        }}>
                        Vibration:
                    </Text>

                    <TouchableOpacity
                        onPress={() => setChickenAudioEnabled((prev) => !prev)}
                        style={{
                            width: dimensions.width * 0.18,
                            height: dimensions.height * 0.034,
                            borderRadius: dimensions.width * 0.525252,
                            borderWidth: dimensions.width * 0.003,
                            borderColor: 'black',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                        {!chickenAudioEnabled && (
                            <Text
                                style={{
                                    color: 'black',
                                    textAlign: 'left',
                                    fontSize: dimensions.width * 0.04,
                                    fontWeight: 500,
                                    fontFamily: fontKronaOneRegular,
                                    paddingLeft: dimensions.width * 0.02,
                                }}>
                                on
                            </Text>
                        )}
                        <View style={{
                            width: dimensions.height * 0.034,
                            height: dimensions.height * 0.034,
                            borderRadius: dimensions.width * 0.5,
                            backgroundColor: 'black',
                        }} />

                        {chickenAudioEnabled && (
                            <Text
                                style={{
                                    color: 'black',
                                    textAlign: 'left',
                                    fontSize: dimensions.width * 0.04,
                                    fontWeight: 500,
                                    fontFamily: fontKronaOneRegular,
                                    marginRight: dimensions.width * 0.016,
                                }}>
                                off
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => {
                    setSelectedTimeChroniclesPage('Home');
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
                    position: 'absolute',
                    bottom: dimensions.height * 0.05,
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
                    Back Home
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default ChickenSettingsScreen;
