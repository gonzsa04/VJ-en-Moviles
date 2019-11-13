package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;

public class Player extends GameObject {
    private Sprite spriteAux;
    private ColorType type;

    public Player(GameInterface game, String tag){
        super(game, tag);
        init();
    }

    public void init(){
        super.init();
        setPosition(game_.getGraphics().getDefaultWidth()/2, 1200.0f);
        sprite_ = loadSprite("Sprites/players.png", 2, 1, 0, 255);
        spriteAux = loadSprite("Sprites/players.png", 2, 1, 1, 255);
        type = ColorType.WHITE;
    }

    public void render(){
        if(type == ColorType.WHITE) sprite_.draw(position_);
        else spriteAux.draw(position_);
    }

    public void update(double deltaTime){}

    public void handleEvent(InputInterface.TouchEvent event){
        if(event.getEventType() == InputInterface.EventType.Pressed){
            if(type == ColorType.WHITE) type = ColorType.BLACK;
            else type = ColorType.WHITE;
        }
    }
}
