package es.ucm.fdi.pcapp;

import es.ucm.fdi.logic.LogicGame;
import es.ucm.fdi.pcversion.PCGame;

public class Main {

    public static void main(String[] args) {
        PCGame game = new PCGame("Pr1", 800, 800);
        LogicGame logic = new LogicGame(game);
        logic.init();
        game.setLogic(logic);
        game.run();
    }
}
