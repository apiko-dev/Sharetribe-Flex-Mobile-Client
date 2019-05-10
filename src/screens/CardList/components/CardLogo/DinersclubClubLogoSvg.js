/* eslint-disable max-len */
import React from 'react';
import { View } from 'react-native';
import {
  Svg,
  Path,
  G,
  Defs,
  Rect,
  Filter,
  FeFlood,
  FeColorMatrix,
  FeOffset,
  FeGaussianBlur,
  FeBlend,
} from 'react-native-svg';
import s from './styles';

const DinersclubClubLogo = () => (
  <View style={s.logo}>
    <Svg
      width="360"
      height="178"
      viewBox="0 0 360 178"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G filter="url(#filter0_d)">
        <Rect
          x="16"
          y="20"
          width="328"
          height="128"
          rx="10"
          fill="white"
        />
        <Rect
          x="16.5"
          y="20.5"
          width="327"
          height="127"
          rx="9.5"
          stroke="#E9E9E9"
        />
      </G>
      <Path
        d="M186.583 65.4999C194.353 65.4999 201.506 59.1249 201.506 51.1249C201.506 42.4999 194.353 36.6249 186.583 36.6249H179.923C172.153 36.3749 165.74 42.6249 165.493 50.4999C165.493 50.7499 165.493 50.8749 165.493 51.1249C165.616 59.1249 172.03 65.4999 179.8 65.4999H186.583Z"
        fill="#004A98"
      />
      <Path
        d="M182.883 58.875V43.25C187.2 44.875 189.296 49.75 187.693 54C186.83 56.25 185.103 58 182.883 58.875ZM171.66 51C171.66 47.5 173.756 44.375 176.963 43.25V58.875C173.756 57.625 171.66 54.5 171.66 51ZM179.923 37.875C172.77 37.875 166.85 43.75 166.85 51.125C166.85 58.375 172.646 64.375 179.923 64.375C187.2 64.375 192.996 58.5 192.996 51.125C192.873 43.75 187.076 37.875 179.923 37.875Z"
        fill="white"
      />
      <Defs>
        <Filter
          id="filter0_d"
          x="-9"
          y="0"
          width="378"
          height="178"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <FeFlood flood-opacity="0" result="BackgroundImageFix" />
          <FeColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <FeOffset dy="5" />
          <FeGaussianBlur stdDeviation="12.5" />
          <FeColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
          />
          <FeBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <FeBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </Filter>
      </Defs>
    </Svg>
  </View>
);

export default DinersclubClubLogo;
