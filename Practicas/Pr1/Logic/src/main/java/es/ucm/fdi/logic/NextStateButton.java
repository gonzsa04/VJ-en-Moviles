package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.StateInterface;

/**
 * Boton que al ser pulsado, cambia de estado
 */
public class NextStateButton extends Button {
    private StateInterface nextState_;
    private int numFrame_;

    NextStateButton(GameInterface game, String tag, int numFrame){
        super(game, tag);
        nextState_ = null;
        numFrame_ = numFrame;
    }

    public void init(){
        super.init();
        sprite_ = loadSprite("Sprites/buttons.png", 1, 10, numFrame_, 255);
    }

    public void setNextState(StateInterface nextState){
        nextState_ = nextState;
    }
    protected void onPressed(){
        if(nextState_ != null){
            nextState_.reset();
            game_.setState(nextState_);
        }
    }
}
