package es.ucm.fdi.pcapp;

import es.ucm.fdi.logic.GameInitializer;
import es.ucm.fdi.pcversion.PCGame;

public class Main {

    public static void main(String[] args) {
        PCGame game = new PCGame("Pr1", 720, 1280);
        GameInitializer gameInitializer = new GameInitializer(game);
        game.setState(gameInitializer);
        game.run();
    }
}
