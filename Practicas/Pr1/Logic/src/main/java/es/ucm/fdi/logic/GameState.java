package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.StateInterface;
import es.ucm.fdi.utils.Vector2;

public class GameState implements StateInterface {
    private Ball ball;
    private GameInterface game_;
    private int backgroundColor;

    public GameState(GameInterface game){
        game_ = game;
        backgroundColor = 0xFF00FFFF;
    }

    public void init(){
        ball = new Ball(game_);
        ball.setScale(1.5f, 1.5f);
        ball.setPosition(game_.getGraphics().getDefaultWidth()/2, 0.0f);
        ball.setVelocity(500);
        ball.setSprite("Sprites/balls.png", 2, 10, 0, 255);
    }

    public void render(){
        game_.getGraphics().clear(backgroundColor);
        ball.render();
    }

    public void update(double deltaTime){
        ball.update(deltaTime);
    }
}
