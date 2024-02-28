import { Text, View } from "react-native";
import Styles from "../style/Styles";
import { useFonts } from "expo-font";



export default Header = () => {


  const [loaded] = useFonts ({
    LumanosimoRegular: require('/Users/franziskavogele/Documents/BIS/2. Semester Finnland/Mobile Programming/miniYahtzee/assets/fonts/Inconsolata/Lumanosimo/Lumanosimo-Regular.ttf')
  })

  if(!loaded) {
    return null;

  }
    return (
        <View style={Styles.header}>
            <Text style={Styles.headerTitle}>Mini-Yahtzee</Text>
        </View>
    )
}