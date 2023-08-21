package com.petproject.gamingwebsite.hangman.game;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
public class GameSessionManager {
    private static List<GameSession> gamesPlayed;
    private static GameSession currGame;

    public GameSessionManager() {
        gamesPlayed = new CopyOnWriteArrayList<>();
        addGame();
    }

    public void addGame() {
        GameSession newGame = new GameSession();

        currGame = newGame;
        gamesPlayed.add(newGame);
    }
    public void addGame(GameSession gameSession) {
        currGame = gameSession;
        gamesPlayed.add(gameSession);
    }

    public GameSession getCurrGame() {
        return currGame;
    }

    public long countWins() {
        return gamesPlayed.stream()
                .filter(GameSession::isWon)
                .count();
    }

    public long countLosses() {
        long completedLosses =  gamesPlayed.stream()
                .mapToLong(GameSession::getNumCorrect)
                .sum();
        long refreshes = gamesPlayed.size() - countWins() - completedLosses;

        return completedLosses + refreshes - 2;
    }
    public long countCorrect() {
        return gamesPlayed.stream()
                .mapToLong(GameSession::getNumCorrect)
                .sum();
    }

    public long countIncorrect() {
        return gamesPlayed.stream()
                .mapToLong(GameSession::getNumIncorrect)
                .sum();
    }

    public static List<GameSession> getGamesPlayed() {
        return gamesPlayed;
    }


}
