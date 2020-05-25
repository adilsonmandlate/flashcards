/**
 * Taken from https://github.com/jonsamp. With some minor things added
 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, ScrollView, Text, Animated, Dimensions } from "react-native";
import Fade from "../../Fade";
import styles from "../styles";

const { height } = Dimensions.get("window");

class HeaderScrollView extends Component {
  static propTypes = {
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    headlineStyle: PropTypes.object,
    children: PropTypes.node,
    actions: PropTypes.node,
    containerStyle: PropTypes.object,
    headerContainerStyle: PropTypes.object,
    headerComponentContainerStyle: PropTypes.object,
    scrollContainerStyle: PropTypes.object,
    fadeDirection: PropTypes.string,
    scrollViewProps: PropTypes.object,
  };

  static defaultProps = {
    scrollViewProps: {},
  };

  state = {
    headerHeight: 0,
    headerY: 0,
    isHeaderScrolled: false,
    fadeDirection: "",
  };

  onLayout = (event) => {
    this.setState({
      headerHeight: event.nativeEvent.layout.height,
      headerY: event.nativeEvent.layout.y,
    });
  };

  scrollAnimatedValue = new Animated.Value(0);

  handleScroll = (event) => {
    const offset = event.nativeEvent.contentOffset.y;
    const scrollHeaderOffset = this.state.headerHeight + this.state.headerY - 8;
    const isHeaderScrolled = scrollHeaderOffset < offset;

    if (!this.state.isHeaderScrolled && isHeaderScrolled) {
      this.setState({
        isHeaderScrolled,
      });
    }

    if (this.state.isHeaderScrolled && !isHeaderScrolled) {
      this.setState({
        isHeaderScrolled,
      });
    }
  };

  render() {
    const {
      children,
      actions = undefined,
      title = "",
      titleStyle = {},
      containerStyle = {},
      headerContainerStyle = {},
      headerComponentContainerStyle = {},
      headlineStyle = {},
      scrollContainerStyle = {},
      fadeDirection,
      scrollViewProps = {},
    } = this.props;

    const fontSize = titleStyle.fontSize || 34;
    const titleStyles = {
      fontSize,
      lineHeight: fontSize * 1.2,
    };

    const animatedFontSize = this.scrollAnimatedValue.interpolate({
      inputRange: [-height, 0],
      outputRange: [fontSize * 1.75, fontSize],
      extrapolate: "clamp",
    });

    return (
      <View style={[styles.container, containerStyle]}>
        <View style={[styles.headerContainer, headerContainerStyle]}>
          <Fade visible={this.state.isHeaderScrolled} direction={fadeDirection}>
            <View
              style={[
                styles.headerComponentContainer,
                headerComponentContainerStyle,
              ]}
            >
              <Text
                style={[
                  styles.headline,
                  actions ? styles.headlineWithAction : "",
                  headlineStyle,
                ]}
              >
                {title}
              </Text>
              {actions && <View style={styles.actionSmall}>{actions}</View>}
            </View>
          </Fade>
        </View>
        <ScrollView
          onScroll={Animated.event(
            [
              {
                nativeEvent: { contentOffset: { y: this.scrollAnimatedValue } },
              },
            ],
            {
              listener: this.handleScroll,
            }
          )}
          scrollEventThrottle={8}
          contentContainerStyle={scrollContainerStyle}
          {...scrollViewProps}
        >
          <View style={styles.titleContainer}>
            <Animated.Text
              style={[
                styles.title,
                titleStyle,
                titleStyles,
                {
                  fontSize: animatedFontSize,
                },
              ]}
              onLayout={this.onLayout}
            >
              {title}
            </Animated.Text>
            {actions && (
              <Animated.View style={styles.action}>{actions}</Animated.View>
            )}
          </View>
          {children}
        </ScrollView>
      </View>
    );
  }
}

export default HeaderScrollView;
