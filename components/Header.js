import { Text, View } from "react-native";
import Styles from "../style/Styles";



export default Header = () => {

    return (
        <View style={Styles.header}>
            <Text style={Styles.headerTitle}>Mini-Yahtzee</Text>
        </View>
    )
}