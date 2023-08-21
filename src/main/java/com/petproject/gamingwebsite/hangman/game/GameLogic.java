package com.petproject.gamingwebsite.hangman.game;

import com.petproject.gamingwebsite.hangman.word.Word;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;

public class GameLogic {
    private Map<Long, Word> allWords = new HashMap<>();
    private long numWords = 0;
    private String file = "./src/main/resources/words.txt";

    public GameLogic() {
        initWords();
    }

    private void initWords() {
        try (BufferedReader br = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = br.readLine()) != null) {
                allWords.put(numWords++, new Word(line));
            }
        } catch (IOException e) {
            System.out.println("File name 'words.txt' not found!");
            e.printStackTrace();
        }
    }

    public Word getNewWord() {
        long value = ThreadLocalRandom.current().nextLong(numWords);
        return allWords.get(value);
    }

    public int containsLetter(Word word, char letter) {
        int occurences = 0;

        for (int i = 0; i < word.getContent().length(); i++) {
            if (word.getGuesses().get(i).getAnswer() == letter) {
                word.getGuesses().get(i).setGuessed(true);
                occurences++;
            }
        }

        return occurences;
    }

    public void setAllWords(Map<Long, Word> allWords) {
        this.allWords = allWords;
    }

    public void setNumWords(long numWords) {
        this.numWords = numWords;
    }

    public String getFile() {
        return file;
    }

    public void setFile(String file) {
        this.file = file;
    }
}
