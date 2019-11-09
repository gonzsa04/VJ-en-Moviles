package es.ucm.fdi.logic;

import java.util.ArrayList;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.StateInterface;
import es.ucm.fdi.utils.Vector2;

public class GameState implements StateInterface {
    private Ball ball;
    private ArrayList<GameObject> gameObjects_;
    private GameInterface game_;
    private int backgroundColor;

    public GameState(GameInterface game){
        game_ = game;
        backgroundColor = 0xFF00FFFF;
    }

    public void init(){
        gameObjects_ = new ArrayList<GameObject>();
        ball = new Ball(game_, "ball");
        gameObjects_.add(ball);
    }

    public void render(){
        game_.getGraphics().clear(backgroundColor);
        for(int i = 0; i < gameObjects_.size(); i++){
            gameObjects_.get(i).render();
        }
    }

    public void update(double deltaTime){
        for(int i = 0; i < gameObjects_.size(); i++){
            gameObjects_.get(i).update(deltaTime);
        }
    }

    public void handleInput(){
        ArrayList<InputInterface.TouchEvent> events = game_.getInput().getTouchEvents();
        for(int i = 0; i < events.size(); i++){
            for(int j = 0; j < gameObjects_.size(); j++){
                gameObjects_.get(j).handleEvent(events.get(i));
            }
        }
    }

}
