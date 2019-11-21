package es.ucm.fdi.logic;

import java.util.ArrayList;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;
import es.ucm.fdi.interfaces.StateInterface;
import es.ucm.fdi.utils.Vector2;

/**
 * Menu de instrucciones
 */
public class InstructionsState implements StateInterface {
    private GameInterface game_;

    private StateInterface gameState_;

    private Background background_;

    // params
    private float tapToPlayAlpha_;
    private boolean increaseAlpha_;

    // imagenes mostradas
    private Sprite howToPlay_, instructions_, tapToPlay_;

    // transicion blanca
    private float transitionAlpha;
    private Sprite whiteTransition_;

    // botones
    NextStateButton exitButton_;
    private ArrayList<Button> buttons_;

    public InstructionsState(GameInterface game, Background background){
        game_ = game;
        background_ = background;
    }

    /**Crea los objetos del estado*/
    public void init(){
        buttons_ = new ArrayList<Button>();

        // nex state llevara al estado que le indiques -> en el inicializador de estados
        exitButton_ = new NextStateButton(game_, "exitButton", 1);
        exitButton_.init();
        exitButton_.setPosition(game_.getGraphics().getGameWidth() - 100, 75 + exitButton_.getHeight()/2);
        buttons_.add(exitButton_);

        whiteTransition_ = new Sprite(game_.getGraphics(), "Sprites/white.png", new Vector2(1.0f, 1.0f));
        whiteTransition_.setWidth(game_.getGraphics().getWindowWidth());
        whiteTransition_.setHeight(game_.getGraphics().getWindowHeight());

        howToPlay_ = new Sprite(game_.getGraphics(), "Sprites/howToPlay.png", new Vector2(1.0f, 1.0f));
        instructions_ = new Sprite(game_.getGraphics(), "Sprites/instructions.png", new Vector2(1.0f, 1.0f));
        tapToPlay_ = new Sprite(game_.getGraphics(), "Sprites/tapToPlay.png", new Vector2(1.0f, 1.0f));
    }

    public void reset(){
        tapToPlayAlpha_ = 255;
        transitionAlpha = 255;
        increaseAlpha_ = false;
    }

    public void render(){
        game_.getGraphics().clear(background_.getColor());

        background_.render();

        tapToPlay_.setAlpha((int)tapToPlayAlpha_);
        tapToPlay_.draw(game_.getGraphics().getGameWidth()/2, 1464);
        howToPlay_.draw(game_.getGraphics().getGameWidth()/2, 290);
        instructions_.draw(game_.getGraphics().getGameWidth()/2, 900);

        for(int i = 0; i < buttons_.size(); i++){
            buttons_.get(i).render();
        }

        whiteTransition_.drawRaw();
    }

    public void update(double deltaTime){
        background_.update(deltaTime);

        if(transitionAlpha > 0) {
            transitionAlpha -= 1000 * deltaTime;
            whiteTransition_.setAlpha((int) transitionAlpha);
        }

        if(tapToPlayAlpha_ <= 0) increaseAlpha_ = true;
        else if(tapToPlayAlpha_ >= 255) increaseAlpha_ = false;

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
        exitButton_.setNextState(gameState_);
    }
}
