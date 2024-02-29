import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Styles from "../style/Styles";
import Header from "./Header";
import Footer from "./Footer";
import { FontAwesome6 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MAX_NBR_OF_SCOREBOARD_ROWS, SCOREBOARD_KEY } from "../Constants";
import { DataTable } from 'react-native-paper';
import { moderateScale, verticalScale } from "../Metrics";


export default Scoreboard = ({navigation}) => {

    const [highScores, setHighScores] = useState ([]); // highscore Array

    //-------Icon scoreboard--------
    const ScoreIcon = () => {
        return (
            <FontAwesome6
                style={Styles.scoreIcon}
                name="list-alt"
            />
        );
    };

    //------forcus listener----------

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
          getScoreboardData();
        });
        return unsubscribe;
      }, [navigation]);

   

    //--------get scoreboard data from async storage------
    const getScoreboardData = async() => {
        try {
            let scores = await AsyncStorage.getItem(SCOREBOARD_KEY);
            scores = scores ? JSON.parse(scores) : [];

            // Sort the count
            scores.sort((a, b) => b.score - a.score);
            // only top three are shown
            scores = scores.slice(0, 3);

            setHighScores(scores);
        } catch (error) {
            console.log(error);
        }
    };
    
    console.log(highScores);


    const clearScoreboard = async () => {
        try {
          await AsyncStorage.removeItem(SCOREBOARD_KEY);
          setHighScores([]);
          getScoreboardData();
        } catch (error) {
          console.log(error.message);
        }
    };

    return(
        <>
            <View style={Styles.scoreboard}>
                <Header/>
                <ScoreIcon/>
                <Text style={Styles.scoreTitle}>Top three scores</Text>
                
            </View>

            {highScores.length === 0 ? (
                <View style={Styles.scoreboard}>
                <Text style={Styles.scoreInfoText}>Scoreboard is empty</Text>
                <Footer/>
                </View>
            ) : (
                <View style={Styles.scoreboard}>
                    <DataTable>
                        <DataTable.Header style={{width: moderateScale (480)}}>
                            <DataTable.Title>Player</DataTable.Title>
                            <DataTable.Title>Date Time</DataTable.Title>
                            <DataTable.Title>Points</DataTable.Title>
                        </DataTable.Header>
                        {highScores.slice(0, MAX_NBR_OF_SCOREBOARD_ROWS).map((scoreData, i) => (
                        <DataTable.Row style={{width: moderateScale (480)}} key={i}>
                        <DataTable.Cell>{i+1}.{scoreData.player}</DataTable.Cell>
                        <DataTable.Cell>{scoreData.date}</DataTable.Cell>
                        <DataTable.Cell>{scoreData.score}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                    </DataTable>
                    <Pressable style={Styles.clearButton} onPress={clearScoreboard}>
                     <Text style={Styles.scoreButtonText}>CLEAR SCOREBOARD</Text>
                 </Pressable>
                 <Footer />
                </View>
            )}
        </>
    );
}

// added moderateScale (480) to DataTable Header and DataTable Row, now date and time is completely visable 