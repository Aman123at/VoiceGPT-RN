import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export interface IChatProps {
  title: string;
  id: number;
  type: string;
}

export interface IImages {
  url: string;
  id: number;
  type: string;
  title: string;
  navigation?: any;
}

export interface IChatBarProps {
  chatText: string;
  setChatText: Function;
  handleSend: Function;
  nav: any;
}

type RootStackParamList = {
  Home: undefined;
  Voice: undefined;
  Image: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;

export type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

type ImageScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Image'
>;

export type ImageScreenProps = {
  navigation: ImageScreenNavigationProp;
};
