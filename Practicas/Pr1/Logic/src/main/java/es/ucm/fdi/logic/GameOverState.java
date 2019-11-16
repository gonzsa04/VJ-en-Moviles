package es.ucm.fdi.logic;

import java.util.ArrayList;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;
import es.ucm.fdi.interfaces.StateInterface;
import es.ucm.fdi.utils.Vector2;

public class GameOverState implements StateInterface {
    private GameInterface game_;
    private int backgroundColor_;

    private GameState gameState_;

    private Background background_;

    private float playAgainAlpha_;
    private boolean increaseAlpha_;

    private Text scoreText_, pointsText_;
    private Sprite playAgain_, gameOver_;

    private ArrayList<Button> buttons_;

    public GameOverState(GameInterface game){
        game_ = game;
    }

    public void init(){
        buttons_ = new ArrayList<Button>();

        gameState_ = new GameState(game_);
        gameState_.init();

        MuteButton muteButton = new MuteButton(game_, "muteButton");
        muteButton.setPosition(100, 75 + muteButton.getHeight()/2);
        buttons_.add(muteButton);

        NextStateButton nextStateButton = new NextStateButton(game_, "muteButton", gameState_);
        nextStateButton.setPosition(game_.getGraphics().getDefaultWidth() - 100, 75 + nextStateButton.getHeight()/2);
        buttons_.add(nextStateButton);

        scoreText_ = new Text(game_, "scoreText");
        scoreText_.setPosition(game_.getGraphics().getDefaultWidth()/2, game_.getGraphics().getDefaultHeight()/2);

        pointsText_ = new Text(game_, "pointsText");
        pointsText_.setText("points");
        pointsText_.setPosition(game_.getGraphics().getDefaultWidth()/2 + 155, game_.getGraphics().getDefaultHeight()/2 + pointsText_.getHeight());

        playAgain_ = new Sprite(game_.getGraphics(), "Sprites/playAgain.png", new Vector2(1.0f, 1.0f));
        gameOver_ = new Sprite(game_.getGraphics(), "Sprites/gameOver.png", new Vector2(1.0f, 1.0f));

        playAgainAlpha_ = 255;
        increaseAlpha_ = false;
    }

    public void render(){
        game_.getGraphics().clear(backgroundColor_);
        background_.render();
        scoreText_.render();
        pointsText_.render();
        playAgain_.setAlpha((int)playAgainAlpha_);
        playAgain_.draw(game_.getGraphics().getDefaultWidth()/2, 1396);
        gameOver_.draw(game_.getGraphics().getDefaultWidth()/2, 364);

        for(int i = 0; i < buttons_.size(); i++){
            buttons_.get(i).render();
        }
    }

    public void update(double deltaTime){
        background_.update(deltaTime);
        if(playAgainAlpha_ <= 1) increaseAlpha_ = true;
        else if(playAgainAlpha_ >= 254) increaseAlpha_ = false;

        if(increaseAlpha_) playAgainAlpha_ += deltaTime*200;
        else playAgainAlpha_ -= deltaTime*200;
    }

    public void handleInput() {

        ArrayList<InputInterface.TouchEvent> events = game_.getInput().getTouchEvents();

        for (int j = 0; j < events.size(); j++) {
            for (int i = 0; i < buttons_.size(); i++) {
                if (buttons_.get(i).isActive()) {
                    if (buttons_.get(i).handleEvent(events.get(j))) return;
                }
            }
            if (events.get(j).getEventType() == InputInterface.EventType.Pressed) game_.setState(gameState_);
        }
    }

    public void setBackground(Background background){
        background_ = background;
    }

    public void setBackgroundColor(int backgroundColor){
        backgroundColor_ = backgroundColor;
    }

    public void setScoreText(int score){
        scoreText_.setText(Integer.toString(score));
    }
}
