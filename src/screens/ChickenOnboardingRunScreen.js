import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Animated, Text, TouchableOpacity, Dimensions, Image, SafeAreaView } from 'react-native';
import fishingOnboardingData from '../components/fishingOnboardingData';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const fontKronaOneRegular = 'KronaOne-Regular';

const ChickenOnboardingRunScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [currentIndexOfChickenSlide, setCurrentIndexOfChickenSlide] = useState(0);
  const refOfChicken = useRef(null);
  const ChickenRefHorizontalScrollX = useRef(new Animated.Value(0)).current;
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
      setCurrentIndexOfChickenSlide(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollNextChickenSlide = () => {
    if (currentIndexOfChickenSlide >= fishingOnboardingData.length - 1) {
      navigation.replace('ChickenRunHomeScreen');
    } else {
      refOfChicken.current.scrollToIndex({ index: currentIndexOfChickenSlide + 1 });
    }
  };

  const renderChickenItem = ({ item }) => (
    <View style={{
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      height: dimensions.height,
      width: dimensions.width,
    }}>
      <View style={{
        alignSelf: 'flex-end',
        alignItems: 'center',
        width: dimensions.width,
      }}>
        <Image
          source={item.itemImage}
          style={{
            marginTop: dimensions.height * 0.1,
            alignSelf: 'center',
            width: dimensions.width * 0.9,
            height: dimensions.height * 0.65,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
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
          showsHorizontalScrollIndicator={false}
          renderItem={renderChickenItem}
          onViewableItemsChanged={viewableItemsChanged}
          keyExtractor={(item) => item.id.toString()}
          ref={refOfChicken}
          bounces={false}
          data={fishingOnboardingData}
          pagingEnabled
          viewabilityConfig={viewConfig}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: ChickenRefHorizontalScrollX } } }], {
            useNativeDriver: false,
          })}
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          scrollNextChickenSlide();
        }}
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          borderRadius: dimensions.width * 0.0616161,
          justifyContent: 'center',
          marginTop: dimensions.height * 0.03,
          backgroundColor: '#fff',
          height: dimensions.height * 0.08,
          width: dimensions.width * 0.8818,
          position: 'absolute',
          bottom: dimensions.height * 0.05,
          borderColor: 'black',
          borderWidth: dimensions.width * 0.003,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'black',
            fontFamily: fontKronaOneRegular,
            fontWeight: 700,
            paddingHorizontal: dimensions.width * 0.05,
            fontSize: dimensions.width * 0.06,
          }}>
          {currentIndexOfChickenSlide >= fishingOnboardingData.length - 1 ? 'Start' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ChickenOnboardingRunScreen;
