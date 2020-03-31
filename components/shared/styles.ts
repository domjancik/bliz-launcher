import {StyleSheet} from 'react-native';

const width = 115;
const height = width + 30;
const radius = 10;
const textOverflow = 40;

const styles = StyleSheet.create({
  body: {
    backgroundColor: '#70587C',
    alignItems: 'center',
    alignContent: 'center',
    minHeight: '100%',
  },
  buttonWrap: {
    width: width,
    height: height + textOverflow,
    margin: 8,
  },
  imageWrap: {
    borderRadius: radius,
    height: height,
    elevation: 5,
    backgroundColor: '#BD8A8B',
  },
  button: {
    height: height + textOverflow,
  },
  image: {
    borderRadius: radius,
    height: height,
  },
  text: {
    textAlign: 'center',
    fontFamily: 'sans-serif-thin',
    fontSize: 28,
    color: '#F9F4F5',
  },
});

export default styles;
