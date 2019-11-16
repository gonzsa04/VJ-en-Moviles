package es.ucm.fdi.logic;

import java.util.ArrayList;
import java.util.Random;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.StateInterface;

enum ColorType { WHITE, BLACK }

public class GameState implements StateInterface {
    private GameInterface game_;
    private int backgroundColor_;
    private int[] possibleColors_;

    private Background background_;
    private Text scoreText_;

    private Player player_;

    private ArrayList<Ball> balls_;
    private float spaceBetwBalls_;

    private int score_;
    private int scoreToNextLevel_;
    private float gameVel_;

    public GameState(GameInterface game){
        game_ = game;
    }

    public void init(){
        score_ = 0;
        scoreToNextLevel_ = 10;
        gameVel_ = 1.0f;

        int numBalls = 4;
        spaceBetwBalls_ = 400;

        possibleColors_ = new int[]{0x41a85f, 0x00a885, 0x3d8eb9, 0x2969b0, 0x553982, 0x28324e, 0xf37934, 0xd14b41, 0x75706b};
        backgroundColor_ = new Random().nextInt(possibleColors_.length);

        background_ = new Background(game_, "arrows");
        background_.setBackground(backgroundColor_);

        scoreText_ = new Text(game_, "scoreText");
        scoreText_.setPosition(game_.getGraphics().getDefaultWidth() - 100, 150);
        scoreText_.setText(Integer.toString(score_));

        balls_ = new ArrayList<Ball>();
        for(int i = 0; i < numBalls; i++){
            balls_.add(new Ball(game_, "ball"));
            balls_.get(i).setPosition(game_.getGraphics().getDefaultWidth()/2, balls_.get(i).getHeight() - i * spaceBetwBalls_);
        }

        player_ = new Player(game_, "player");
    }

    public void render(){
        game_.getGraphics().clear(possibleColors_[backgroundColor_]);

        background_.render();
        scoreText_.render();

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
            gameVel_ += 0.01f;
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

        if(player_.isActive()) {
            for (int i = 0; i < events.size(); i++) {
                player_.handleEvent(events.get(i));
            }
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
            if(collision(balls_.get(i), player_) && player_.isActive() && balls_.get(i).isActive()){
                if(balls_.get(i).getColorType() == player_.getColorType()){
                    score_++;
                    scoreText_.setText(Integer.toString(score_));
                    ball.reboot();
                    if(i - 1 < 0) i = balls_.size();
                    ball.setPosition(ball.getPosition().x, balls_.get(i-1).getPosition().y - spaceBetwBalls_);
                }
                else gameOver();
                break;
            }
        }
    }

    private void gameOver(){
        GameOverState gOState = new GameOverState(game_);
        gOState.init();
        gOState.setScoreText(score_);
        gOState.setBackground(background_);
        gOState.setBackgroundColor(possibleColors_[backgroundColor_]);
        game_.setState(gOState);
    }
}
