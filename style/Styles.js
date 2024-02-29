import { StyleSheet } from "react-native";
import { verticalScale, moderateScale } from "../Metrics";

export default StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#f5cac3',
    },

    home: {
        flex: 1,
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: "column",
        backgroundColor: '#f5cac3',
    },

    infoText:{
        color:'white',
        textAlign: 'center',
        marginTop: verticalScale(20),
        marginBottom: verticalScale(20),
        justifyContent:'center',
        fontFamily:'Roboto',
        fontSize: moderateScale(18),
    },

    name:{
        textAlign:'center',
        backgroundColor: '#f5cac3',
        color:'#ffffff',
        fontWeight: 'bold',
        fontSize: moderateScale(25),
        fontFamily:'Roboto',
    },

    header: {
        marginTop: moderateScale(5),
        marginBottom: moderateScale(15),
        backgroundColor: '#f28482',
        flexDirection: 'row',
        
    },

    headerTitle: {
        color: '#ffffff',
        fontWeight: 'bold',
        flex: 1,
        fontSize: moderateScale(23),
        textAlign: 'center',
        margin: moderateScale(10),
        fontFamily:'monospace'
    },

    footer: {
        marginTop: verticalScale(20),
        backgroundColor: '#f28482',
        flexDirection: 'row'
    },

    author: {
        color: '#fff',
        flex: 1,
        fontSize: moderateScale(15),
        textAlign: 'center',
        margin: moderateScale(10),
        fontFamily:'monospace'
    },

    okButton: {
        margin: moderateScale(25),
        flexDirection: "row",
        padding: moderateScale(10),
        backgroundColor: "#8b819b",
        width: moderateScale(160),
        borderRadius: moderateScale(15),
        justifyContent: 'center',
        alignItems: 'center',
    },

    okButtonText: {
        color:"#ffffff",
        fontSize: moderateScale(20),
        fontFamily:'sans-serif-medium',
    },

    infoIcon: {
        textAlign:'center',
        color: '#8b819b',
        fontSize: moderateScale(80)
    },

    rulesHeader:{
        color:"#ffffff",
        textAlign: 'center',
        fontSize: moderateScale(20),
        fontWeight: 'bold',
        marginBottom: moderateScale(5),
        marginTop: moderateScale(10),
        fontFamily:'Roboto',
    },

    rules:{
        color:"#ffffff",
        textAlign: 'center',
        fontSize: moderateScale(12),
        lineHeight: moderateScale(15),
        marginTop: moderateScale(10),
        marginBottom: moderateScale(5),
        fontFamily:'Roboto',
    },

    goodLuck:{
        color:"#ffffff",
        textAlign:'center',
        fontSize: moderateScale(25),
        marginTop: moderateScale(5),
        marginBottom: moderateScale(5),
        fontFamily:'Roboto',
    },

    playButton: {
        margin: moderateScale(15),
        flexDirection: "row",
        padding: moderateScale(10),
        backgroundColor: "#8b819b",
        width: moderateScale(150),
        borderRadius: moderateScale(15),
        justifyContent: 'center',
        alignItems: 'center',
    },

    playButtonText: {
        color:"#ffffff",
        fontSize: moderateScale(20),
        fontFamily:'sans-serif-medium',
    },

    gameboard: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor: '#f5cac3',
    },

    gameinfo: {
        backgroundColor: '#f5cac3',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: moderateScale(18),
    },
      gamevalue: {
        fontSize: moderateScale(24),
        fontWeight: 'bold',
        paddingBottom: moderateScale(0),
    },

    scoreboard: {
        flex: 1,
        alignItems:'center',
        alignContent: 'center',
        backgroundColor: '#f5cac3',
    },

    scoreIcon: {
        color: '#8b819b',
        fontSize: moderateScale(80),
        marginBottom: moderateScale(20),
        marginTop: moderateScale(20)
    },

    scoreTitle:{
        fontSize: moderateScale(30),
        fontWeight: 'bold',
        color:'#ffffff',
        marginBottom: moderateScale(5),
        marginTop: moderateScale(20),
        fontFamily:'Roboto',
    },

    scoreInfoText:{
        fontSize: moderateScale(20),
        marginTop: moderateScale(20),
        marginBottom: moderateScale(35),
        color:'#ffffff',
        fontFamily:'Roboto',
    },

    scoreboardTable: {
        alignItems:'center',
        backgroundColor: '#f5cac3',
        
    },

    clearButton: {
        flexDirection: "row",
        padding: moderateScale(10),
        backgroundColor: "#8b819b",
        width: moderateScale(160),
        borderRadius: moderateScale(15),
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },

    scoreButtonText: {
        textAlign:'center',
        color:"#ffffff",
        fontSize: moderateScale(18),
        fontFamily:'sans-serif-medium'
    },

    gameinfo: {
        backgroundColor: '#f5cac3',
        textAlign: 'center',
        justifyContent: 'center',
        fontSize: moderateScale(20),
        marginTop: moderateScale(10),
        color:"#ffffff",
        fontFamily:'Roboto',
      },
    
    flex: {
        flexDirection: "row"
    },

    throwDiceButton:{
        margin: moderateScale(25),
        flexDirection: "row",
        padding: moderateScale(10),
        backgroundColor: "#8b819b",
        width: moderateScale(150),
        borderRadius: moderateScale(15),
        justifyContent: 'center',
        alignItems: 'center'
    },

    throwButtonText: {
        color:"#ffffff",
        fontSize: moderateScale(20),
        fontFamily:'sans-serif-medium',
    },

    numbers: {
        flexDirection: 'column',
      },

    nbrSum: {
        width: '100%',
        textAlign: 'center',
        fontSize: moderateScale(18),
        color:"#ffffff",
      },

    numberFlex: {
        flexDirection: "row",
        marginTop: moderateScale(15),
        marginVertical: moderateScale(10),
        paddingHorizontal: moderateScale(18),
        
    },

    bottomContainer: {
        flex: 1,
        justifyContent: 'flex-end',
    }

})