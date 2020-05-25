import { StyleSheet } from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";

const headerHeight = ifIphoneX(50, 60);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "transparent" },
  headerContainer: {
    height: headerHeight,
  },
  headerComponentContainer: {
    height: 55,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 12,
    marginRight: 20,
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "500",
    letterSpacing: 0.019,
    flex: 1,
    textAlign: "center",
  },
  headlineWithAction: {
    transform: [{ translateX: 20 }],
  },

  titleContainer: {
    marginRight: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    letterSpacing: 0.011,
    fontWeight: "700",
    marginLeft: 16,
  },
  action: {
    alignSelf: "center",
  },

  actionSmall: {
    flexDirection: "row",
  },
});

export default styles;
