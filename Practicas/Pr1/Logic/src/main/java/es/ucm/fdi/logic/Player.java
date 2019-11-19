package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;

/**
 * Barra que cambia de color y elimina las pelotas
 */
public class Player extends GameObject {
    private ColorType type_;

    public Player(GameInterface game, String tag){
        super(game, tag);
    }

    public void init(){
        super.init();
        setPosition(game_.getGraphics().getGameWidth()/2, 1200.0f);
        sprite_ = loadSprite("Sprites/players.png", 2, 1, 0, 255);

        reset();
    }

    public void render(){
        sprite_.draw(position_);
    }

    public void update(double deltaTime){}

    // al detectar pulsacion cambia de color
    public boolean handleEvent(InputInterface.TouchEvent event){
        if(event.getEventType() == InputInterface.EventType.Pressed){
            if(type_ == ColorType.WHITE) {
                type_ = ColorType.BLACK;
                sprite_.setFrame(1);
            }
            else {
                type_ = ColorType.WHITE;
                sprite_.setFrame(0);
            }
            return true;
        }
        return false;
    }

    public void reset(){
        type_ = ColorType.WHITE;
        sprite_.setFrame(0);
        setActive(true);
    }

    public ColorType getColorType() {
        return type_;
    }
}
