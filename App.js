import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './colors';
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage"

const STORAGE_KEY = "@toDos"

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  useEffect(()=>{
    loadToDos()
  },[])
  const travel = ()=> setWorking(false);
  const work = ()=> setWorking(true);
  const onChangeText = (payload) =>setText(payload)
  const saveToDos = async (toSave)=>{
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  }
  const loadToDos =  async()=>{
    const s = await AsyncStorage.getItem(STORAGE_KEY)
    s !== null ? setToDos(JSON.parse(s)) : null;
  }
  const addToDo = async ()=>{
    if (text === ""){
      return;
    }
      const newToDos = {
        ...toDos,
        [Date.now()]: {text,  working},
      }
    setToDos(newToDos);
    await saveToDos(newToDos)
    setText("")
  }
  return (
    <View style={styles.container}>
      <StatusBar style='auto'/>
      <View style={styles.header}>
        <TouchableOpacity onPress={work}>
          <Text style={{...styles.btnText, color: working ? "white" : theme.grey}}>
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={travel}>
          <Text style={{...styles.btnText, color: !working ? "white" : theme.grey}}>
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
      onSubmitEditing={addToDo}
      onChangeText={onChangeText}
      returnKeyType='done'
      value={text}
      placeholder={working ? "What do you have to do?" : "Where do you want to go?"}
      style={styles.input}
      />
      <ScrollView>
        {Object.keys(toDos).map((key)=>
          toDos[key].working ===working ? (
          <View style={styles.toDo} key={key}>
            <Text style={styles.toDoText}>{toDos[key].text}</Text>
          </View>
        ):null
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header:{
    justifyContent:"space-between",
    flexDirection:"row",
    marginTop:100,
  },
  btnText:{
    fontSize: 38,
    fontWeight:"600",
  },
  input:{
    backgroundColor:"white",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 20,
    fontSize: 18,
  },
  toDo:{
    backgroundColor: theme.toDoBg,
    marginBottom: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius:15
  },
  toDoText: {
    color:"white",
    fontSize: 16,
    fontWeight:"600"
  }
});
