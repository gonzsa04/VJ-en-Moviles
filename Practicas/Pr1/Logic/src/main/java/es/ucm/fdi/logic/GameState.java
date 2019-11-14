package es.ucm.fdi.logic;

import java.util.ArrayList;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.StateInterface;

enum ColorType { WHITE, BLACK }

public class GameState implements StateInterface {
    private GameInterface game_;
    private int backgroundColor_;

    private Background background_;

    private Player player_;

    private ArrayList<Ball> balls_;
    private float spaceBetwBalls_;

    private int score_;
    private int scoreToNextLevel_;
    private float gameVel_;

    public GameState(GameInterface game){
        game_ = game;
        backgroundColor_ = 0xFF00FFFF;
    }

    public void init(){
        score_ = 0;
        scoreToNextLevel_ = 10;
        gameVel_ = 1.0f;

        int numBalls = 4;
        spaceBetwBalls_ = 400;

        background_ = new Background(game_, "arrows");
        background_.setBackground(0);

        balls_ = new ArrayList<Ball>();
        for(int i = 0; i < numBalls; i++){
            balls_.add(new Ball(game_, "ball"));
            balls_.get(i).setPosition(game_.getGraphics().getDefaultWidth()/2, balls_.get(i).getHeight() - i * spaceBetwBalls_);
        }

        player_ = new Player(game_, "player");
    }

    public void render(){
        game_.getGraphics().clear(backgroundColor_);

        background_.render();

        for(int i = 0; i < balls_.size(); i++){
            if (balls_.get(i).isActive()) {
                balls_.get(i).render();
            }
        }

        if(player_.isActive()) player_.render();
    }

    public void update(double deltaTime){
        if(score_ >= scoreToNextLevel_){
            scoreToNextLevel_ += 5;
            gameVel_ += 0.001f;
            for(int i = 0; i < balls_.size(); i++) {
                balls_.get(i).setVelocity(balls_.get(i).getVelocity() * gameVel_);
            }
            background_.setVelocity((background_.getVelocity()*gameVel_));
        }

        background_.update(deltaTime);

        for(int i = 0; i < balls_.size(); i++) {
            if (balls_.get(i).isActive()) {
                balls_.get(i).update(deltaTime);
            }
        }

        playerBallsCollision();
    }

    public void handleInput(){
        ArrayList<InputInterface.TouchEvent> events = game_.getInput().getTouchEvents();

        for(int i = 0; i < events.size(); i++){
            player_.handleEvent(events.get(i));
        }
    }

    private boolean collision(GameObject a, GameObject b){
        return (a.getPosition().x < b.getPosition().x + b.getWidth() &&
                a.getPosition().x + a.getWidth() > b.getPosition().x &&
                a.getPosition().y < b.getPosition().y + b.getHeight() &&
                a.getHeight() + a.getPosition().y > b.getPosition().y);
    }

    private void playerBallsCollision(){
        for(int i = 0; i < balls_.size(); i++){
            Ball ball = balls_.get(i);
            if(collision(balls_.get(i), player_)){
                //if(balls_.get(i).getColorType() == player_.getColorType()){
                    score_++;
                    ball.reboot();
                    if(i - 1 < 0) i = balls_.size();
                    ball.setPosition(ball.getPosition().x, balls_.get(i-1).getPosition().y - spaceBetwBalls_);
                //}
                //else gameOver();
                break;
            }
        }
    }

    private void gameOver(){
        for(int i = 0; i < balls_.size(); i++){
            balls_.get(i).setActive(false);
        }
        score_ = 0;
        player_.setActive(false);
    }
}
