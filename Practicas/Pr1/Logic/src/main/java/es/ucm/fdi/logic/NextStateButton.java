package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.StateInterface;

public class NextStateButton extends Button {
    private StateInterface nextState_;

    NextStateButton(GameInterface game, String tag, StateInterface state){
        super(game, tag);
        nextState_ = state;
    }

    public void init(){
        super.init();
        sprite_ = loadSprite("Sprites/buttons.png", 1, 10, 0, 255);
    }

    protected void onPressed(){
        game_.setState(nextState_);
    }
}
