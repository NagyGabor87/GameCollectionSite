package com.petproject.gamingwebsite.controller;

import com.google.gson.Gson;
import com.petproject.gamingwebsite.hangman.game.GameSessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class HangmanGameController {

    @Autowired
    GameSessionManager gameSessionManager = new GameSessionManager();

    public HangmanGameController() {
        gameSessionManager.addGame();
    }

    @GetMapping(value = "/hangman")
    public String getWord() {
        return new Gson().toJson(gameSessionManager.getCurrGame().getWord());
    }
    @PostMapping("/hangman")
    public String postLetter(@RequestBody Map<String, Character> map) {
        gameSessionManager.getCurrGame().guessHandler(map.get("letter"));
        StringBuilder sb = new StringBuilder(new Gson().toJson(gameSessionManager.getCurrGame().getWord()));

        if (gameSessionManager.getCurrGame().isLost()) {
            int last = sb.lastIndexOf("}");
            if (last >= 0) { sb.delete(last, sb.length()); }

            sb.append(", \"word\": \"").append(gameSessionManager.getCurrGame().getWord().getContent()).append("\"");
            sb.append("}");
        }

        return sb.toString();
    }

    @GetMapping("/hangman/status")
    public String getGameStatus() {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("{\"status\": \"");
        if (gameSessionManager.getCurrGame().isWon()) { stringBuilder.append("won"); }
        else if (gameSessionManager.getCurrGame().isLost()) { stringBuilder.append("lost"); }
        else { stringBuilder.append("in-progress"); }
        stringBuilder.append("\"}");

        return stringBuilder.toString();
    }

    @GetMapping("/hangman/stats")
    public String getGameStats() {
        StringBuilder stringBuilder = new StringBuilder();
        long wins = gameSessionManager.countWins();
        long losses = gameSessionManager.countLosses();
        stringBuilder.append("{")
                .append("\"wins\": ")
                .append(wins)
                .append(", ")
                .append("\"losses\": ")
                .append(losses)
                .append("}");

        return stringBuilder.toString();
    }

    @PostMapping("/hangman/newgame")
    public void createNewGame() {
        gameSessionManager.addGame();
    }
}
