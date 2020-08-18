import React, { useEffect, useState } from "react";
import api from './services/api';
import RepositoriesService from './services/RepositoriesService'

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchRepositories = async () => {
      const result = await RepositoriesService.fetchAll();
      setRepositories(result);
    };

    fetchRepositories();
  }, [])


  async function handleLikeRepository(id) {
    const response = await RepositoriesService.like(id);
    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    repositories[repositoryIndex] = {
      ...repositories[repositoryIndex],
      likes: response.likes,
    };
    setRepositories([...repositories]);
  }

  function getLikeText(likeCount) {
    return likeCount === 1 ? 'curtida' : 'curtidas'
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>

        {
          repositories.map(repository => (
            <View style={styles.repositoryContainer} key={repository.id}>
              <Text style={styles.repository}>{repository.title}</Text>

              {repository.techs?.length > 0 && (
                <View style={styles.techsContainer}>
                  {
                    repository.techs.map(tech => {
                      <Text style={styles.tech}>
                        {tech}
                      </Text>
                    })
                  }
                </View>
              )}

              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-${repository.id}`}
                >
                  {repository.likes} {getLikeText(repository.likes)}
            </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                testID={`like-button-${repository.id}`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>
          ))
        }


      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
