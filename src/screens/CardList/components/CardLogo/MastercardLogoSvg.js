/* eslint-disable max-len */
import React from 'react';
import { View } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import s from './styles';

const MastercardLogo = () => (
  <View style={s.logo}>
    <Svg
      width="48"
      height="30"
      viewBox="0 0 48 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M31.03 3.49854H16.9697V26.5015H31.03V3.49854Z"
        fill="#FF5F00"
      />
      <Path
        d="M18.4173 15C18.4173 10.5103 20.4703 6.27214 23.9927 3.49848C17.6567 -1.48673 8.47764 -0.38466 3.49302 5.96149C-1.49159 12.3076 -0.391284 21.5162 5.9521 26.5088C11.2469 30.6804 18.7053 30.6804 24.0001 26.5088C20.4703 23.7352 18.4173 19.4896 18.4173 15Z"
        fill="#EB001B"
      />
      <Path
        d="M47.6308 15.0001C47.6308 23.077 41.088 29.6302 33.024 29.6302C29.7526 29.6302 26.5698 28.5282 24 26.5015C30.3434 21.5089 31.4437 12.3152 26.4591 5.9616C25.7354 5.04444 24.9157 4.21604 24 3.49858C30.3434 -1.49402 39.5225 -0.391948 44.5071 5.95421C46.5305 8.53557 47.6308 11.716 47.6308 15.0001Z"
        fill="#F79E1B"
      />
    </Svg>
  </View>
);

export default MastercardLogo;
