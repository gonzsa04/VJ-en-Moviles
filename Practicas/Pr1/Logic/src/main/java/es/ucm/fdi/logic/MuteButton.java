package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.Sprite;

public class MuteButton extends Button {
    private Sprite spriteAux_;
    private boolean pressed_;

    public MuteButton(GameInterface game, String tag){
        super(game, tag);
    }

    public void init(){
        super.init();
        sprite_ = loadSprite("Sprites/buttons.png", 1, 10, 2, 255);
        spriteAux_ = loadSprite("Sprites/buttons.png", 1, 10, 3, 255);
        pressed_ = false;
    }

    public void render(){
        if(!pressed_) sprite_.draw(position_);
        else spriteAux_.draw(position_);
    }

    protected void onPressed(){
        pressed_ = !pressed_;
    }
}
