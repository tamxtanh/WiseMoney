import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
// import TabBar from "../../../components/tab-custom/TabBar";
import TabContent from "../../../components/tab-custom/TabContent";
import { TabView, TabBar, SceneMap } from "react-native-tab-view";
import { Dimensions } from "react-native";

// const ParentComponent = () => {
//   const [selectedTab, setSelectedTab] = useState(nestedTabs[0].id);

//   const handleTabChange = (tabId) => {
//     setSelectedTab(tabId);
//   };

//   return (
//     <View>
//       <TabBar
//         tabs={nestedTabs}
//         selectedTab={selectedTab}
//         onChange={handleTabChange}
//       />
//       <TabContent selectedTab={selectedTab}>
//         {nestedTabs.map((tab) => (
//           <View key={tab.id} id={tab.id}>
//             <Text>{tab.title}</Text>
//             <Text>{tab.description}</Text>
//           </View>
//         ))}
//       </TabContent>
//     </View>
//   );
// };

const nestedTabs = [
  {
    key: "1",
    title: "Nested tab 1",
    content: "Hello, I'm the nested tab 1",
  },
  {
    key: "2",
    title: "Nested tab 2",
    content: "Hello, I'm the nested tab 2",
  },
  {
    key: "3",
    title: "Nested tab 3",
    content: "Hello, I'm the nested tab 3",
  },
  {
    key: "4",
    title: "Nested tab 4",
    content: "Hello, I'm the nested tab 4",
  },
  {
    key: "5",
    title: "Nested tab 5",
    content: "Hello, I'm the nested tab 5",
  },
  {
    key: "6",
    title: "Nested tab 6",
    content: "Hello, I'm the nested tab 6",
  },
  {
    key: "7",
    title: "Nested tab 7",
    content: "Hello, I'm the nested tab 7",
  },
  {
    key: "8",
    title: "Nested tab 8",
    content: "Hello, I'm the nested tab 8",
  },
  {
    key: "9",
    title: "Nested tab 9",
    content: "Hello, I'm the nested tab 9",
  },
  {
    key: "10",
    title: "Nested tab 10",
    content: "Hello, I'm the nested tab 10",
  },
];

const renderScene = SceneMap({
  1: () => <TabContent content={nestedTabs[0].content} />,
  2: () => <TabContent content={nestedTabs[1].content} />,
  3: () => <TabContent content={nestedTabs[2].content} />,
  4: () => <TabContent content={nestedTabs[3].content} />,
  5: () => <TabContent content={nestedTabs[4].content} />,
  6: () => <TabContent content={nestedTabs[5].content} />,
  7: () => <TabContent content={nestedTabs[6].content} />,
  8: () => <TabContent content={nestedTabs[7].content} />,
  9: () => <TabContent content={nestedTabs[8].content} />,
  10: () => <TabContent content={nestedTabs[9].content} />,
});

// const ParentComponent = () => {
//   const [index, setIndex] = useState(0);

//   const handleIndexChange = (index) => {
//     setIndex(index);
//   };

//   return (
//     <TabView
//       navigationState={{ index, routes: nestedTabs }}
//       renderScene={renderScene}
//       onIndexChange={handleIndexChange}
//       initialLayout={{ width: 100, height: 100 }} // You may need to adjust this according to your layout
//       renderTabBar={(props) => (
//         <TabBar
//           {...props}
//           indicatorStyle={styles.indicator}
//           style={styles.tabBar}
//         />
//       )}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   tabBar: {
//     backgroundColor: "lightblue",
//   },
//   indicator: {
//     backgroundColor: "blue",
//   },
// });

// export default ParentComponent;

const ParentComponent = () => {
  const [index, setIndex] = useState(0);

  const handleIndexChange = (index) => {
    setIndex(index);
  };

  // const tabsData = [
  //   { title: "Future" },
  //   { title: "This Month" },
  //   { title: "Last Month" },
  //   { title: "2/2024" },
  //   { title: "1/2024" },
  //   { title: "12/2023" },
  //   { title: "11/2023" },
  // ];

  return (
    // <TabView
    //   navigationState={{ index, routes: nestedTabs }}
    //   renderScene={renderScene}
    //   onIndexChange={handleIndexChange}
    //   initialLayout={{ width: 100, height: 100 }} // You may need to adjust this according to your layout
    //   renderTabBar={(props) => (
    //     <TabBar
    //       {...props}
    //       indicatorStyle={styles.indicator}
    //       style={styles.tabBar}
    //     />
    //   )}
    //   lazy={true} // Enable lazy loading
    //   renderLazyPlaceholder={() => <View style={styles.lazyPlaceholder} />} // Placeholder while the tab is loading
    //   lazyPreloadDistance={0} // Load content of the tab immediately when it becomes visible
    // />
    <TabView
      navigationState={{ index, routes: nestedTabs }}
      renderScene={renderScene}
      onIndexChange={handleIndexChange}
      initialLayout={{ width: Dimensions.get("window").width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={styles.indicator}
          style={styles.tabBar}
          scrollEnabled={true} // Enable tab bar scrolling
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "lightblue",
  },
  indicator: {
    backgroundColor: "blue",
  },
  lazyPlaceholder: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
});

export default ParentComponent;
