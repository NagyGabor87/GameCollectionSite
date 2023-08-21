package com.petproject.gamingwebsite.hangman.word;

import com.petproject.gamingwebsite.hangman.Guessable.Guessable;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;
import java.util.List;

public class Word {
    private transient String content;
    private transient Set<Character> uniqueChars;
    private List<Guessable> guesses;

    public Word(String content) {
        this.content = content;
        this.guesses = new ArrayList<>(content.length());
        this.uniqueChars = new HashSet<>();

        int index = 0;
        for (char c : content.toCharArray()) {
            uniqueChars.add(c);
            guesses.add(new Guessable(c, index++));
        }
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public List<Guessable> getGuesses() {
        return guesses;
    }

    public void setGuesses(List<Guessable> guesses) {
        this.guesses = guesses;
    }

    public Set<Character> getUniqueChars() {
        return uniqueChars;
    }

    public void setUniqueChars(Set<Character> uniqueChars) {
        this.uniqueChars = uniqueChars;
    }
}
