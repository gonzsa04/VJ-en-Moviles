package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;

public class LogicGame {
    private Ball ball;
    private GameInterface game_;

    public LogicGame(GameInterface game){
        game_ = game;
    }

    public void init(){
        ball = new Ball(game_);
        ball.init();
        ball.setPosition(game_.getGraphics().getWidth()/2, game_.getGraphics().getHeight()/2);
        ball.setScale(0.5f, 0.5f);
        ball.setVelocity(50);
    }

    public void render(){
        ball.render();
    }

    public void update(double deltaTime){
        ball.update(deltaTime);
    }
}
