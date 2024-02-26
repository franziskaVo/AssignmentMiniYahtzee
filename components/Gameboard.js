import { View, Text, TextInput, Pressable } from "react-native";
import React, { useState, useEffect } from "react";
import Styles from "../style/Styles";
import Header from "./Header";
import Footer from "./Footer";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BONUS, NBR_OF_DICES, NBR_OF_THROWS, SCOREBOARD_KEY, SUM_FOR_BONUS } from "../Constants";
import { moderateScale } from "../Metrics";


let board = [];
let nbrSum = [0, 0, 0, 0, 0, 0];
let nbrSelectPossible = false;
let diceSelectPossible = false;
let throwPossible = true;
let getBonus = false;
let gameOver = false;


export default function Gameboard({route}) {

    //State Variables
    const { name:player } = route.params;
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [sum, setSum] = useState(0);
    const [status, setStatus] = useState('');
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [usedNbrs, setUsedNbrs] = useState(new Array(6).fill(false));
    const [scoreboard, setScoreboard] = useState([]);

    useEffect(() => {
        checkBonus()
    }, [sum]);

    //-------ICON------------
    const DicesIcon = () => {
        return (
            <MaterialCommunityIcons
                style={Styles.infoIcon}
                name="dice-multiple"
            />
        );
    };

    //Check game status with dice throw
    useEffect(() => {
        getScoreboardData();
        if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points before next throw');
            throwPossible = false;
            nbrSelectPossible = true;
        } else if (nbrOfThrowsLeft < NBR_OF_THROWS) {
            setStatus('Select and throw dice again');
            throwPossible = true;
            nbrSelectPossible = true;
            diceSelectPossible = true;
        } else if (nbrOfThrowsLeft === NBR_OF_THROWS && !usedNbrs.every((x) => x === true)) {
            setStatus('Throw the dices.');
            throwPossible = true;
            nbrSelectPossible = false;
            diceSelectPossible = false;
        } else if (nbrOfThrowsLeft === NBR_OF_THROWS && usedNbrs.every((x) => x === true)) {
            saveDataInScoreboard()
            setStatus('Game over! All points selected.');
            throwPossible = false;
            diceSelectPossible = false;
            nbrSelectPossible = false;
            gameOver = true;
        } 
    }, [nbrOfThrowsLeft]);

    //Check of bonus must be added and return appropriate text
    function checkBonus() {
        if (sum >= SUM_FOR_BONUS) {
            getBonus = true;
            return ("You got the Bonus!")
        } else {
            return ("You are " + (SUM_FOR_BONUS - sum) + " points away from bonus.");
        }
    }

    //Scoreboard and async storage, player points

    // Store Data
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value);
          await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
        } catch (e) {
            console.log(e);
          // saving error
        }
      }


    //save data in score board 
    const saveDataInScoreboard = async () => {
        const scoreData = {
            player: player,
            date: new Date().toLocaleString(),
            score: getBonus ? sum + BONUS : sum, //under 63 points only dices sum, 63 or more points dices sum + bonus
        }
    

        try {
            let scores = await AsyncStorage.getItem(SCOREBOARD_KEY);
            scores = scores ? JSON.parse(scores) : [];

            scores.push(scoreData);
            scores.sort((a, b) => b.score - a.score);

            scores = scores.slice(0, 3);

            await AsyncStorage.setItem(SCOREBOARD_KEY, JSON.stringify(scores));
        } catch (error) {
            console.log(error);
        }
    }

    const getScoreboardData = async() => {
        try {
            return AsyncStorage.getItem(SCOREBOARD_KEY)
            .then (req => JSON.parse(req))
            .then (json => {
                if (json === null) {
                    json=[];
                }
                setScoreboard(json);
            })
            .catch (error => console.log(error));
        } catch (e){
            console.log(e);
        }
      }




    // Dices
    const diceRow = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        diceRow.push(
            <Pressable
                key={"row" + i}
                onPress={() => selectDice(i)}
            >
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"row" + i}
                    size={moderateScale(65)}
                    color={selectedDices[i] ? "white" : "#8b819b"}
                />
            </Pressable>
        );
    }

    //Select dices
    function selectDice(i) {
        if (diceSelectPossible) {
            let dices = [...selectedDices];
            dices[i] = selectedDices[i] ? false : true;
            setSelectedDices(dices);
        } else (
            setStatus("You have to throw dices first.")
        )
    }

    //Throw dices
    function throwDices() {
        if (throwPossible && !gameOver) {
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * 6 + 1);
                    board[i] = 'dice-' + randomNumber;
                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
        } else if (gameOver) {
            newGame();
        }
    }



    // Numbers
    const nbrRow = [];
    for (let i = 0; i < 6; i++) {
        nbrRow.push(
            <View style={Styles.numbers} key={"nbrRow" + i}>
                <Text style={Styles.nbrSum}>{nbrSum[i]}</Text>
                <Pressable
                    key={"nbrRow" + i}
                    onPress={() => useNbr(i)}>
                    <MaterialCommunityIcons
                        name={'numeric-' + (i + 1) + '-circle'}
                        key={"nbrRow" + i}
                        size={moderateScale(50)}
                        color={usedNbrs[i] ? "white" : "#8b819b"}/>
                </Pressable>
            </View>
        );
    }

    //Use number
    function useNbr(i) {
        if (throwPossible && !gameOver){
            setStatus("Throw 3 times before setting points")
        } else {
        let nbrs = [...usedNbrs];
        if (nbrSelectPossible && !nbrs[i]) {
            nbrs[i] = true;
            setUsedNbrs(nbrs);
            let tempSum = 0;
            for (let x = 0; x < diceRow.length; x++) {
                let diceVal = parseInt(board[x].match(/(\d+)/)[0]); //Extract the dice value from the board array (Alternatively a second array could have been created.)
                if (diceVal -1 === i) {
                    tempSum += diceVal;
                }
            }
            
            nbrSum[i] = tempSum;
            setSum(sum + parseInt(tempSum));
            //Reset variables for next game moves
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
            setNbrOfThrowsLeft(3);
        } else if (nbrs[i]) {
            setStatus("You already selected points for " + (i + 1));
        }
        }
    }



    //Reset variables for new game
    function newGame() {
        gameOver = false;
        setSum(0);
        setUsedNbrs(new Array(6).fill(false));
        nbrSum = [0, 0, 0, 0, 0, 0];
        setNbrOfThrowsLeft(3);
        nbrSelectPossible = true;
        diceSelectPossible = true;
        throwPossible = true;
        getBonus = false;
        throwDices();
    }


    return(
        <View style={Styles.gameboard}>
            <Header/>
            <View style={Styles.numberFlex}>{nbrOfThrowsLeft == 3 ? (
                <DicesIcon/>
            ):(diceRow)}

            </View>
            <Text style={Styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={Styles.gameinfo}>{status}</Text>
            <Pressable style={[Styles.throwDiceButton, Styles.dropShadow]}
                onPress={() => throwDices()}>
                <Text style={Styles.throwButtonText}>
                    {gameOver ? 'New Game' : 'Throw dices'}
                </Text>
            </Pressable>
            <Text style={[Styles.gameinfo, Styles.gamevalue]}>Total: {getBonus ? (sum + BONUS) : sum }</Text>
            <Text style={Styles.gameinfo}>{checkBonus()}</Text>
            <View style={Styles.numberFlex}>{nbrRow}</View>
            <Text style={Styles.goodLuck}>Player: {player}</Text>
            <Footer/>
        </View>
    )

};
