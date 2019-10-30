package es.ucm.fdi.pcapp;

import es.ucm.fdi.logic.GameState;
import es.ucm.fdi.pcversion.PCGame;

public class Main {

    public static void main(String[] args) {
        PCGame game = new PCGame("Pr1", 800, 800);
        GameState gameState = new GameState(game);
        gameState.init();
        game.setState(gameState);
        game.run();
    }
}
