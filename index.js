/**
 * @format
 */
import { Text as RNText, TextProps } from 'react-native';

const oldRender = RNText.render;
RNText.render = function (...args) {
  const origin = oldRender.apply(this, args);
  return {
    ...origin,
    props: {
      ...origin.props,
      style: [
        { fontFamily: 'NotoSansKR-Regular', }, // 원하는 전역 폰트
        origin.props.style,
      ],
    },
  };
};

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
