import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './colors';
import { useState } from 'react';

export default function App() {
  const [working, setWorking] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({})
  const travel = ()=> setWorking(false);
  const work = ()=> setWorking(true);
  const onChangeText = (payload) =>setText(payload)
  const addToDo = ()=>{
    if (text === ""){
      return;
    }
    const newToDos = Object.assign(
      {},
      toDos,
      {[Date.now()]:{text, work: working}}
      )
    setToDos(newToDos);
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
      placeholder={working ? "Add a To Do" : "Where do you want to go?"}
      style={styles.input}
      />
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
    marginTop: 20,
    fontSize: 18,
  }
});
