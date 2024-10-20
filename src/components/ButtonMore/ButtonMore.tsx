import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './ButtonMoreStye';

export default function ButtonMore() {
    return(
        <TouchableOpacity style={styles.container}>
            <Icon name="plus" size={28} color="#ffff" />
        </TouchableOpacity>
    )
}