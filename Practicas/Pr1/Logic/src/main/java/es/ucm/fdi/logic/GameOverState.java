package es.ucm.fdi.logic;

import java.util.ArrayList;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;
import es.ucm.fdi.interfaces.StateInterface;
import es.ucm.fdi.utils.Vector2;

/**
 * Estado de game over
 */
public class GameOverState implements StateInterface {
    private GameInterface game_;

    private StateInterface gameState_;

    private Background background_;

    // params
    private float playAgainAlpha_;
    private boolean increaseAlpha_;

    // imagenes / textos
    private Text scoreText_, pointsText_;
    private Sprite playAgain_, gameOver_;

    // botones
    private MuteButton muteButton_;
    private NextStateButton instrButton_;
    private ArrayList<Button> buttons_;

    public GameOverState(GameInterface game, Background background)
    {
        game_ = game;
        background_ = background;
    }

    /**Crea los objetos del estado*/
    public void init(){
        buttons_ = new ArrayList<Button>();

        // mute no hara nada -> solo cambiar de sprite
        muteButton_ = new MuteButton(game_, "muteButton");
        muteButton_.init();
        muteButton_.setPosition(100, 75 + muteButton_.getHeight()/2);
        buttons_.add(muteButton_);

        // next state llevara al estado que le indiques -> en el inicializador de estados
        instrButton_ = new NextStateButton(game_, "muteButton", 0);
        instrButton_.init();
        instrButton_.setPosition(game_.getGraphics().getGameWidth() - 100, 75 + instrButton_.getHeight()/2);
        buttons_.add(instrButton_);

        scoreText_ = new Text(game_, "scoreText");
        scoreText_.init();

        pointsText_ = new Text(game_, "pointsText");
        pointsText_.init();
        pointsText_.setText("points");

        playAgain_ = new Sprite(game_.getGraphics(), "Sprites/playAgain.png", new Vector2(1.0f, 1.0f));
        gameOver_ = new Sprite(game_.getGraphics(), "Sprites/gameOver.png", new Vector2(1.0f, 1.0f));

        reset();
    }

    public void reset(){
        playAgainAlpha_ = 255;
        increaseAlpha_ = false;
        // centramos los textos en pantalla
        scoreText_.setPosition(game_.getGraphics().getGameWidth()/2 + scoreText_.getWidth()/2,
                game_.getGraphics().getGameHeight()/2);
        pointsText_.setPosition(game_.getGraphics().getGameWidth()/2 + pointsText_.getWidth()/2,
                game_.getGraphics().getGameHeight()/2 + pointsText_.getHeight());
    }

    public void render(){
        game_.getGraphics().clear(background_.getColor());

        background_.render();

        scoreText_.render();
        pointsText_.render();
        playAgain_.setAlpha((int)playAgainAlpha_);
        playAgain_.draw(game_.getGraphics().getGameWidth()/2, 1396);
        gameOver_.draw(game_.getGraphics().getGameWidth()/2, 364);

        for(int i = 0; i < buttons_.size(); i++){
            buttons_.get(i).render();
        }
    }

    public void update(double deltaTime){
        background_.update(deltaTime);

        if(playAgainAlpha_ <= 0) increaseAlpha_ = true;
        else if(playAgainAlpha_ >= 255) increaseAlpha_ = false;

        if(increaseAlpha_) playAgainAlpha_ += deltaTime*200;
        else playAgainAlpha_ -= deltaTime*200;
    }

    public void handleInput() {

        ArrayList<InputInterface.TouchEvent> events = game_.getInput().getTouchEvents();

        for (int j = 0; j < events.size(); j++) {
            // si el evento lo detecta algun boton -> se ha pulsado sobre el
            for (int i = 0; i < buttons_.size(); i++) {
                if (buttons_.get(i).isActive()) {
                    if (buttons_.get(i).handleEvent(events.get(j))) return;
                }
            }
            // si no, se ha pulsado en la pantalla -> siguiente estado
            if (events.get(j).getEventType() == InputInterface.EventType.Pressed){
                gameState_.reset();
                game_.setState(gameState_);
            }
        }
    }

    public void setGameState(StateInterface gameState){
        gameState_ = gameState;
    }

    public void setInstructionsState(StateInterface instrState){
        instrButton_.setNextState(instrState);
    }

    public void setScoreText(int score){
        scoreText_.setText(Integer.toString(score));
    }
}
