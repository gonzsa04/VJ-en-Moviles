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
        ball.setPosition(200.0f, 200.0f);
        ball.setScale(0.5f, 0.5f);
        ball.setVelocity(50);
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
