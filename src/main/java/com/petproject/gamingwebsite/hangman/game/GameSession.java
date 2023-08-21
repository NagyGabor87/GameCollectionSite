package com.petproject.gamingwebsite.hangman.game;

import com.petproject.gamingwebsite.hangman.word.Word;

public class GameSession {
    private final int MAX_WRONG_GUESSES = 10;
    private Word word;
    private int numIncorrect;
    private int numCorrect;

    private GameLogic logic = new GameLogic();

    public GameSession() {
        this.word = logic.getNewWord();
        this.numIncorrect = 0;
        this.numCorrect = 0;
    }

    public boolean guessHandler(char c) {
        if (!word.getUniqueChars().contains(c)) {
            numIncorrect++;
            if (isLost()) { return false; }
        }

        numCorrect += logic.containsLetter(word, c);
        return isWon();
    }
    public boolean isWon() {
        return numCorrect == word.getContent().length();
    }

    public boolean isLost() {
        return numIncorrect >= MAX_WRONG_GUESSES;
    }

    public Word getWord() {
        return word;
    }

    public void setWord(Word word) {
        this.word = word;
    }

    public int getNumIncorrect() {
        return numIncorrect;
    }

    public void setNumIncorrect(int numIncorrect) {
        this.numIncorrect = numIncorrect;
    }

    public int getNumCorrect() {
        return numCorrect;
    }

    public void setNumCorrect(int numCorrect) {
        this.numCorrect = numCorrect;
    }
}
