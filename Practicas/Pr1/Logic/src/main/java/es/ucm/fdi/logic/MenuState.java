package es.ucm.fdi.logic;

import java.util.ArrayList;
import java.util.Random;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;
import es.ucm.fdi.interfaces.StateInterface;
import es.ucm.fdi.utils.Vector2;

/**
 * Estado de menu principal del juego
 */
public class MenuState implements StateInterface {
    private GameInterface game_;

    private StateInterface gameState_;

    private Background background_;

    // params
    private float tapToPlayAlpha_;
    private boolean increaseAlpha_;

    private Sprite title_, tapToPlay_;

    // botones
    private MuteButton muteButton_;
    private NextStateButton instrButton_;
    private ArrayList<Button> buttons_;

    public MenuState(GameInterface game, Background background){
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

        title_ = new Sprite(game_.getGraphics(), "Sprites/switchDashLogo.png", new Vector2(1.0f, 1.0f));
        tapToPlay_ = new Sprite(game_.getGraphics(), "Sprites/tapToPlay.png", new Vector2(1.0f, 1.0f));

        reset();
    }

    public void reset(){
        background_.setColor(new Random().nextInt(background_.getNumOfPossibleColors()));

        tapToPlayAlpha_ = 255;
        increaseAlpha_ = false;
    }

    public void render(){
        game_.getGraphics().clear(background_.getColor());
        background_.render();

        tapToPlay_.setAlpha((int)tapToPlayAlpha_);
        tapToPlay_.draw(game_.getGraphics().getGameWidth()/2, 950);
        title_.draw(game_.getGraphics().getGameWidth()/2, 356);

        for(int i = 0; i < buttons_.size(); i++){
            buttons_.get(i).render();
        }
    }

    public void update(double deltaTime){
        background_.update(deltaTime);

        if(tapToPlayAlpha_ <= 1) increaseAlpha_ = true;
        else if(tapToPlayAlpha_ >= 254) increaseAlpha_ = false;

        if(increaseAlpha_) tapToPlayAlpha_ += deltaTime*200;
        else tapToPlayAlpha_ -= deltaTime*200;
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
            if (events.get(j).getEventType() == InputInterface.EventType.Pressed) {
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
}
