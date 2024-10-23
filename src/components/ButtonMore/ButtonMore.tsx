import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ButtonMoreStye';

export default function ButtonMore() {
    return(
        <TouchableOpacity style={styles.containerBtnMore}>
            <Icon name="plus" size={28} color="white" />
        </TouchableOpacity>
    )
}