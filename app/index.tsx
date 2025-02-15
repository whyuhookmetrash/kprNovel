import React, { useEffect, useState } from "react";
import { Text, View, Image, Button, StyleSheet } from "react-native";
import images, { ImageKeys } from './importer';

interface Scene {
  image: ImageKeys;
  text: string;
  options: Array<{
    text: string;
    nextIndex: number;
  }>;
}

interface StoryData {
  scenes: Scene[];
}

const initialStoryData: StoryData = {
  scenes: [
    {
      image: 'scene0', // замените на ключ изображения
      text: 'Это текст первой сцены.',
      options: [
        { text: 'Перейти ко второй сцене', nextIndex: 1 },
        { text: 'Перейти к третьей сцене', nextIndex: 2 },
      ]
    }
  ],
};

export default function Index() {
  const [storyData, setStoryData] = useState<StoryData>(initialStoryData);;
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/whyuhookmetrash/kprNovelData/main/data/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStoryData(data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };
    fetchData();
  }, []);

  const currentScene = storyData.scenes[currentIndex];
  const imageSource = { uri: images[currentScene.image] };

  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />
      <View style={styles.textContainer}>
        <Text style={styles.overlayTextOutline}>{currentScene.text}</Text>

        {currentScene.options.map((option, index) => (
          <Button key={index} title={option.text} onPress={() => setCurrentIndex(option.nextIndex)}  color="#5c5c5c"/>
        ))}

      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'relative',
    backgroundColor: '#1d2324'
  },
  textContainer: {
    position: 'absolute',
    bottom: 20, // Отступ от низа
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: '100%', // Задайте ширину и высоту по желанию
    height: '80%',
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
  },
  overlayTextOutline: {
    color: 'white',
    fontSize: 24, // Немного больший размер для обводки
    textAlign: 'center',
    marginVertical: 20,
    fontWeight: 'bold',
    textShadowColor: 'black', // Цвет тени
    textShadowOffset: { width: -2, height: -2 }, // Смещение тени
    textShadowRadius: 10, // Радиус размытия тени
  },
});
