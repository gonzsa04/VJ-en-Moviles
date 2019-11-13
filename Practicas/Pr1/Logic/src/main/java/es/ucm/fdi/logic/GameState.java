package es.ucm.fdi.logic;

import java.util.ArrayList;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.StateInterface;

enum ColorType { WHITE, BLACK }

public class GameState implements StateInterface {
    private GameInterface game_;
    private int backgroundColor;

    private Player player_;

    private ArrayList<Ball> balls_;

    private int score_;
    private int scoreToNextLevel_;
    private float gameVel_;

    public GameState(GameInterface game){
        game_ = game;
        backgroundColor = 0xFF00FFFF;
    }

    public void init(){
        score_ = 0;
        scoreToNextLevel_ = 10;
        gameVel_ = 1.0f;

        int numBalls = 5;
        int initialYPosition = 100;
        int spaceBetwBalls = 300;

        player_ = new Player(game_, "player");

        balls_ = new ArrayList<Ball>();
        for(int i = 0; i < numBalls; i++){
            balls_.add(new Ball(game_, "ball"));
            balls_.get(i).setInitialPosition(game_.getGraphics().getDefaultWidth()/2, initialYPosition);
            balls_.get(i).setPosition(game_.getGraphics().getDefaultWidth()/2, initialYPosition - i * spaceBetwBalls);
        }
    }

    public void render(){
        game_.getGraphics().clear(backgroundColor);

        player_.render();

        for(int i = 0; i < balls_.size(); i++){
            balls_.get(i).render();
        }
    }

    public void update(double deltaTime){
        if(score_ >= scoreToNextLevel_){
            scoreToNextLevel_ += 5;
            gameVel_ += 0.001f;
        }

        for(int i = 0; i < balls_.size(); i++) {
            balls_.get(i).setVelocity(balls_.get(i).getVelocity() * gameVel_);
            balls_.get(i).update(deltaTime);
        }
    }

    public void handleInput(){
        ArrayList<InputInterface.TouchEvent> events = game_.getInput().getTouchEvents();

        for(int i = 0; i < events.size(); i++){
            player_.handleEvent(events.get(i));
        }
    }

    private boolean collision(GameObject a, GameObject b){

        return false;
    }
}
