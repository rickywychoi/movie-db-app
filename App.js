import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, TouchableHighlight, Modal } from 'react-native';
import axios from 'axios';
import styles from './Styles';

const App = () => {
  const apiurl = 'http://www.omdbapi.com/?apikey=eb73710b';
  const [state, setState] = useState({
    s: "Enter a movie...",
    results: [],
    selected: {}
  });

  const search = () => {
    axios.get(apiurl, {
        params: {
          s: state.s
        }
    }).then(({ data }) => {
      let results = data.Search;
      setState(prevState => {
        return { ...prevState, results: results }
      })
    })
  }

  const openPopup = id => {
    axios.get(apiurl, {
      params: {
        i: id
      }
    }).then(({ data }) => {
      let result = data;
      setState(prevState => {
        return { ...prevState, selected: result }
      })
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Movie DB</Text>
      <TextInput 
        style={styles.searchBox}
        clearTextOnFocus={true}
        onChangeText={text => setState(prevState => {
          return {...prevState, s: text}
        })}
        onSubmitEditing={search}
        value={state.s}
      />
      <ScrollView style={styles.results}>
        {state.results.map(result => (
          <TouchableHighlight 
            key={result.imdbID}
            onPress={() => openPopup(result.imdbID)}
          >
            <View style={styles.result}>
              <Image
                source={{ uri: result.Poster }}
                style={{
                  width: '100%',
                  height: 300
                }}
                resizeMode="cover"
              />
              <Text style={styles.heading}>{result.Title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>

      <Modal
        animationType="fade"
        transparent={false}
        visible={(typeof state.selected.Title != "undefined") ? true : false}
      >
        <View style={styles.popup}>
          <Text style={styles.popTitle}>{state.selected.Title}</Text>
          <Text style={{marginBottom: 20}}>Rating: {state.selected.imdbRating}</Text>
          <Text>{state.selected.Plot}</Text>
        </View>
        <TouchableHighlight
          onPress={() => setState(prevState => {
            return { ...prevState, selected: {} }
          })}
        >
          <Text style={styles.closeBtn}>Close</Text>
        </TouchableHighlight>
      </Modal>
    </View>
  );
}

export default App;