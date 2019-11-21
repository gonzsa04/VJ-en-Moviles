package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;

/**
 * Boton que al ser pulsado, cambia la imagen que pinta
 */
public class MuteButton extends Button {
    private boolean pressed_;

    public MuteButton(GameInterface game, String tag){
        super(game, tag);
    }

    public void init(){
        super.init();
        sprite_ = loadSprite("Sprites/buttons.png", 1, 10, 2, 255);
        pressed_ = false;
    }

    public void render(){
        sprite_.draw(position_);
    }

    protected void onPressed(){
        pressed_ = !pressed_;
        if(!pressed_) sprite_.setFrame(2);
        else sprite_.setFrame(3);
    }
}
