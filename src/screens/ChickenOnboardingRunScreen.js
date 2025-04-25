import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text, TouchableOpacity, Dimensions, Image, SafeAreaView } from 'react-native';
import fishingOnboardingData from '../components/fishingOnboardingData';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const fontKronaOneRegular = 'KronaOne-Regular';

const ChickenOnboardingRunScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [currentTimeChroniclesIndex, setCurrentTimeChroniclesIndex] = useState(0);
  const timeChroniclesRef = useRef(null);
  const timeChroniclesRefHorizontalScrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
    };
    const dimensionListener = Dimensions.addEventListener('change', onChange);
    return () => {
      dimensionListener.remove();
    };
  }, []);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems && viewableItems.length > 0) {
      setCurrentTimeChroniclesIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollNextTimeChroniclesSlide = () => {
    if (currentTimeChroniclesIndex >= fishingOnboardingData.length - 1) {
      navigation.replace('TimeChroniclesHome');
    } else {
      timeChroniclesRef.current.scrollToIndex({ index: currentTimeChroniclesIndex + 1 });
    }
  };

  const timechroniclesItemRender = ({ item }) => (
    <View style={{
      width: dimensions.width,
      alignItems: 'center',
      height: dimensions.height,
      flex: 1,
      justifyContent: 'space-between',
    }}>
      <View style={{
        width: dimensions.width,
        alignItems: 'center',
        alignSelf: 'flex-end',
      }}>
        <Image
          source={item.itemImage}
          style={{
            width: dimensions.width * 0.9,
            alignSelf: 'center',
            height: dimensions.height * 0.65,
            marginTop: dimensions.height * 0.1,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        justifyContent: 'space-between',
        flex: 1,
        alignItems: 'center',
      }}
    >
      <LinearGradient
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
        colors={['#F88700', '#FE1B2F']}
        start={{ x: 1, y: 1 }}
        end={{ x: 0, y: 0 }}
      />
      <View style={{ display: 'flex' }}>
        <FlatList
          horizontal
          scrollEventThrottle={32}
          keyExtractor={(item) => item.id.toString()}
          renderItem={timechroniclesItemRender}
          pagingEnabled
          onViewableItemsChanged={viewableItemsChanged}
          ref={timeChroniclesRef}
          bounces={false}
          data={fishingOnboardingData}
          viewabilityConfig={viewConfig}
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: timeChroniclesRefHorizontalScrollX } } }], {
            useNativeDriver: false,
          })}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          scrollNextTimeChroniclesSlide();
        }}
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: dimensions.height * 0.03,
          backgroundColor: '#fff',
          height: dimensions.height * 0.08,
          width: dimensions.width * 0.8818,
          position: 'absolute',
          bottom: dimensions.height * 0.05,
          borderRadius: dimensions.width * 0.0616161,
          borderWidth: dimensions.width * 0.003,
          borderColor: 'black',
        }}
      >
        <Text
          style={{
            paddingHorizontal: dimensions.width * 0.05,
            color: 'black',
            fontWeight: 700,
            fontFamily: fontKronaOneRegular,
            fontSize: dimensions.width * 0.06,
            textAlign: 'center',
          }}>
          {currentTimeChroniclesIndex >= fishingOnboardingData.length - 1 ? 'Start' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChickenOnboardingRunScreen;
