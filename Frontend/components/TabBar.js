import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { icons } from '../constants';
import { Image } from 'react-native';

const FloatingTabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel !== undefined ? options.tabBarLabel : options.title !== undefined ? options.title : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        let iconComponent;
        if (route.name === 'Chat') {
          iconComponent = (
            <View style={[
              styles.circle,
              { backgroundColor: isFocused ? '#b23af2' : '#8E8E93' }
            ]} />
          );
        } else {
          let iconName;
          if (route.name === 'Home') {
            iconName = icons.home;
          } else if (route.name === 'Friends') {
            iconName = icons.profile;
          }
          iconComponent = (
            <Image 
              source={iconName} 
              style={[
                styles.icon, 
                { tintColor: isFocused ? '#b23af2' : '#8E8E93' }
              ]} 
            />
          );
        }

        return (
          <TouchableOpacity
            key={index}
            onPress={onPress}
            style={styles.tabButton}
          >
            {iconComponent}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#3A3A3C',
    borderRadius: 25,
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
});

export default FloatingTabBar;