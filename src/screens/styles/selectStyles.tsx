import { StyleSheet } from "react-native";

const pickerSelectStyles = {
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 0,
    borderColor: 'gray',
    borderRadius: 5,
    color: 'black',
    paddingRight: 30, // Para ícones de dropdown
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderWidth: 0,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // Para ícones de dropdown
  },
};

export default pickerSelectStyles;
