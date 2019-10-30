package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.StateInterface;
import es.ucm.fdi.utils.Vector2;

public class GameState implements StateInterface {
    private Ball ball;
    private GameInterface game_;

    public GameState(GameInterface game){
        game_ = game;
    }

    public void init(){
        ball = new Ball(game_);
        ball.init();
        ball.setScale(new Vector2(0.5f, 0.5f));
        ball.setVelocity(50);
    }

    public void render(){
        ball.render();
    }

    public void update(double deltaTime){
        ball.update(deltaTime);
    }
}
