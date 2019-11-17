package es.ucm.fdi.logic;

import java.util.ArrayList;
import java.util.Random;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;
import es.ucm.fdi.interfaces.StateInterface;
import es.ucm.fdi.utils.Vector2;

enum ColorType { WHITE, BLACK }

public class GameState implements StateInterface {
    private GameInterface game_;

    private GameOverState gameOverState_;

    private Background background_;
    private Text scoreText_;

    private Player player_;

    private ArrayList<Ball> balls_;
    private int numBalls_;
    private float spaceBetwBalls_;

    private int score_;
    private int scoreToNextLevel_;
    private float gameVel_;

    private float transitionAlpha;
    private Sprite whiteTransition_;

    private ParticleManager particleManager_;

    public GameState(GameInterface game, Background background){
        game_ = game;
        background_ = background;
    }

    public void init(){
        numBalls_ = 4;
        spaceBetwBalls_ = 400;

        scoreText_ = new Text(game_, "scoreText");
        scoreText_.init();
        scoreText_.setPosition(game_.getGraphics().getDefaultWidth() - 100, 150);

        whiteTransition_ = new Sprite(game_.getGraphics(), "Sprites/white.png", new Vector2(1.0f, 1.0f));
        whiteTransition_.setScale(game_.getGraphics().getDefaultWidth()/whiteTransition_.getWidth(),
                game_.getGraphics().getDefaultHeight()/whiteTransition_.getHeight());

        balls_ = new ArrayList<Ball>();
        for(int i = 0; i < numBalls_; i++){
            balls_.add(new Ball(game_, "ball"));
            balls_.get(i).init();
        }

        player_ = new Player(game_, "player");
        player_.init();

        particleManager_ = new ParticleManager(game_, 8, 12, 60);
        particleManager_.init();
        particleManager_.setPosition(player_.getPosition().x, player_.getPosition().y - balls_.get(0).getHeight()/2);

        reset();
    }

    public void reset(){
        score_ = 0;
        scoreToNextLevel_ = 10;
        gameVel_ = 1.0f;
        transitionAlpha = 255;

        scoreText_.setText(Integer.toString(score_));

        background_.setColor(new Random().nextInt(background_.getNumOfPossibleColors()));

        for(int i = 0; i < numBalls_; i++){
            balls_.get(i).setPosition(game_.getGraphics().getDefaultWidth()/2, balls_.get(i).getHeight() - i * spaceBetwBalls_);
        }

        particleManager_.reset();
    }

    public void render(){
        game_.getGraphics().clear(background_.getColor());

        background_.render();
        scoreText_.render();

        for(int i = 0; i < balls_.size(); i++){
            if (balls_.get(i).isActive()) {
                balls_.get(i).render();
            }
        }

        if(player_.isActive()) player_.render();

        particleManager_.render();

        whiteTransition_.draw();
    }

    public void update(double deltaTime){
        if(transitionAlpha > 0) {
            transitionAlpha -= 1000 * deltaTime;
            whiteTransition_.setAlpha((int)transitionAlpha);
        }

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

        particleManager_.update(deltaTime);
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
            if(collision(ball, player_) && player_.isActive() && ball.isActive()){
                if(ball.getColorType() == player_.getColorType()){
                    score_++;
                    scoreText_.setText(Integer.toString(score_));
                    particleManager_.spawnParticles(ball.getColorType());
                    ball.reboot();
                    if(i - 1 < 0) i = balls_.size();
                    ball.setPosition(ball.getPosition().x, balls_.get(i-1).getPosition().y - spaceBetwBalls_);
                }
                else gameOver();
                break;
            }
        }
    }

    public void setGameOverState(GameOverState gameOverState){
        gameOverState_ = gameOverState;
    }

    private void gameOver(){
        gameOverState_.reset();
        gameOverState_.setScoreText(score_);
        game_.setState(gameOverState_);
    }
}
