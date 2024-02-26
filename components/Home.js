import { View, Text, TextInput, Pressable, Keyboard } from "react-native";
import React, { useState, useEffect } from "react";
import Styles from "../style/Styles";
import Header from "./Header";
import Footer from "./Footer";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import Gameboard from "./Gameboard";
import { KeyboardAvoidingView, Platform } from "react-native";
import { BONUS_POINTS, BONUS_POINTS_LIMIT, MAX_SPOT, MIN_SPOT, NBR_OF_DICES, NBR_OF_THROWS } from "../Constants";



export default Home = ({navigation}) => {
    
    const [showRules, setShowRules] = useState(false);
    const [name, setName] = useState(''); 
      
    
    const InfoIcon = () => {
        return (
            <MaterialIcons
                style={Styles.infoIcon}
                name="info"
            />
        );
    };

    const pressOK = () => {
        if (!name.trim()) {
            alert('Name is empty');
        } else {
            setShowRules(true);
        }
    }

    const pressPlay = () => {
        navigation.navigate('Gameboard', {name: name});

    }

    return (
        <>
            {!showRules ? (
            <KeyboardAvoidingView style={Styles.home} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                 <View style={Styles.home}>
                 <Header />
                 <InfoIcon />
                 <Text style={Styles.infoText}>For scoreboard enter your name...</Text>
                 <TextInput
                     style={Styles.name}
                     placeholder="Enter your name"
                     onChangeText={setName}
                     value={name}
                     autoFocus={true}/>
                 <Pressable style={Styles.okButton} onPress={()=>pressOK(name)}>
                     <Text style={Styles.okButtonText}>OK</Text>
                 </Pressable>
                 <Footer />
                 </View>
             </KeyboardAvoidingView>
                
            ) : (
                <KeyboardAvoidingView style={Styles.home} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={Styles.home}>
                    <Header />
                    <InfoIcon />
                    <Text style={Styles.rulesHeader}>Rules of the game</Text> 
                    <Text style={[Styles.rules]}>
                    THE GAME: Upper section of the classic Yahtzee dice {'\n'} game. You have {NBR_OF_DICES} dices and for every dice you have {'\n'} {NBR_OF_THROWS} throws. After each throw you can keep dices in order {'\n'} to get the same dice spot counts as many as possible. At {'\n'} the end of the turn, you must select your points from {MIN_SPOT} {'\n'} to {MAX_SPOT}. Game ends when all points have been selected. {'\n'} The order for selecting those is free.{'\n\n'}
                    <Text style={Styles.rules}>POINTS: After each turn, the game calculates the sum for {'\n'}the dices you selected. Only the dices having the same {'\n'}spot count are calculated. Inside the game, you cannot {'\n'}select the same points from {MIN_SPOT} to {MAX_SPOT} again.{'\n\n'}</Text>
                    <Text style={Styles.rules}>GOAL: To get points as much as possible. {BONUS_POINTS_LIMIT} points {'\n'}is the limit of getting a bonus which gives you {BONUS_POINTS} points {'\n'}more.</Text>
                    </Text>
                    <Text style={Styles.goodLuck}>Good luck, {name}!</Text>
                    <Pressable style={Styles.playButton} onPress={pressPlay}>
                        <Text style={Styles.playButtonText}>PLAY</Text>
                    </Pressable>
                    <Footer />
                    </View>
                </KeyboardAvoidingView>

               
                
            )}
        </>
    );
};
