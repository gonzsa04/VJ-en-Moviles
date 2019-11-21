package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;

/**
 * Boton generico del que heredaran el resto de botones
 */
public abstract class Button extends GameObject {
    public Button(GameInterface game, String tag){
        super(game, tag);
    }

    public void init(){
        super.init();
    }

    public void render(){
        sprite_.draw(position_);
    }

    public void update(double deltaTime){}

    /**Si recibe un evento de pulsacion dentro de sus limites -> ha sido pulsado*/
    public boolean handleEvent(InputInterface.TouchEvent event){
        if(event.getEventType() == InputInterface.EventType.Pressed){
            if(onBounds(event.getPosition().x, event.getPosition().y)) {
                onPressed();
                return true;
            }
        }
        return false;
    }

    public void reset(){}

    private boolean onBounds(float x, float y){
        return (x >= position_.x - sprite_.getWidth()/2 && x <= position_.x + sprite_.getWidth()/2 &&
                y >= position_.y - sprite_.getHeight()/2 && y <= position_.y + sprite_.getHeight()/2);
    }

    /**Que hacer al haber sido pulsado -> redefinido segun conveniencia*/
    protected abstract void onPressed();
}
