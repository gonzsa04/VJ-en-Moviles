package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;

public abstract class Button extends GameObject {
    public Button(GameInterface game, String tag){
        super(game, tag);
        init();
    }

    public void init(){
        super.init();
    }

    public void render(){
        sprite_.draw(position_);
    }

    public void update(double deltaTime){}

    public boolean handleEvent(InputInterface.TouchEvent event){
        if(event.getEventType() == InputInterface.EventType.Pressed){
            if(onBounds(event.getPosition().x, event.getPosition().y)) {
                onPressed();
                return true;
            }
        }
        return false;
    }

    private boolean onBounds(float x, float y){
        return (x >= position_.x - sprite_.getWidth()/2 && x <= position_.x + sprite_.getWidth()/2 &&
                y >= position_.y - sprite_.getHeight()/2 && y <= position_.y + sprite_.getHeight()/2);
    }

    protected abstract void onPressed();
}
