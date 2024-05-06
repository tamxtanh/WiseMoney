import React, { useState } from "react";
import TabContent from "./TabContent";
import { TabView, TabBar } from "react-native-tab-view";
import { Dimensions } from "react-native";
import { COLORS } from "../../constants";
import { Animated, StyleSheet } from "react-native";

const CustomTabBar = ({ widthOfPerTab = 100, nestedTabs, TabContent }) => {
  const [index, setIndex] = useState(0);

  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: "white",
    },
    perTab: {
      paddingBottom: 8,
      width: widthOfPerTab,
    },
    tabText: {
      color: COLORS.textColor3, // Change this color to your desired text color
      fontFamily: "InterSemiBold", // Add any other text styles as needed
      fontSize: 16,
      textTransform: "capitalize",
    },
    indicator: {
      backgroundColor: "black",
      height: 3,
      // width: 50,
    },
  });

  const handleIndexChange = (index) => {
    setIndex(index);
  };

  const renderScene = ({ route }) => {
    return <TabContent content={route.content} />;
  };

  const renderIndicator = (props) => {
    const { position, navigationState, getTabWidth } = props;
    const inputRange = navigationState.routes.map((_, i) => i);

    const translateX = position.interpolate({
      inputRange,
      outputRange: inputRange.map((i) => {
        // Tính toán vị trí trung tâm của mỗi tab
        const tabCenter = i * getTabWidth(i) + getTabWidth(i) / 2;
        // Trả về vị trí trung tâm của indicator so với tab hiện tại
        return tabCenter - 24; // 25 là nửa chiều rộng của indicator
      }),
    });

    return (
      <Animated.View
        style={[
          styles.indicator,
          {
            width: 48,
            height: 3,
            position: "absolute",
            bottom: 0, // Đặt indicator dưới tab
            transform: [{ translateX }],
            borderRadius: 10,
          },
        ]}
      />
    );
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      scrollEnabled={true} // Enable tab bar scrolling
      labelStyle={styles.tabText}
      activeColor="black"
      tabStyle={styles.perTab}
      pressColor="transparent"
      renderIndicator={renderIndicator}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes: nestedTabs }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={renderTabBar}
    />
  );
};

export default CustomTabBar;
