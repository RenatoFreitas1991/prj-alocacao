import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#181818",
        padding: 24,
    },
    calendar: {
        backgroundColor: "transparent",
    },
    selected: {
        color: "#FFF",
        fontSize: 16,
        marginTop: 42,
    },
    dayText: {
        color: "#E8E8E8",
        fontSize: 14,
    }, 
    day: {
        width: 30,
        height: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15, 
    },
    disabled: {
        color: "#717171",
    },
    today: {
        color: "#F06543",
        fontWeight: "bold",
    },
    selectedDay: {
        backgroundColor: "#F06543",
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#FFF",
    },
});

export default styles;