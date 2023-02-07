import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [meals, setMeals] = useState([]);
  
  const getMeals = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => setMeals(data.meals))
    .catch(error => {Alert.alert('Error', error);
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <TextInput style={{marginTop: 70, fontSize: 18}} placeholder='keyword' 
        onChangeText={text => setKeyword(text)} />
      <Button title="Find" onPress={getMeals} />
      <FlatList 
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
            <Image source={{uri: item.strMealThumb}}
            style={{
            width:150,
            height:150,
            borderWidth:2,
            borderColor:'#d35647',
            resizeMode:'contain',
            margin:8
                }}/>
          </View>}
        data={meals} 
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
