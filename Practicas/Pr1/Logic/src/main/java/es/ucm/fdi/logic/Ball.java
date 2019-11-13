package es.ucm.fdi.logic;

import java.util.Random;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;
import es.ucm.fdi.utils.Vector2;

public class Ball extends GameObject {
    private float vel_;
    private Vector2 iniPos_;
    private Sprite spriteAux_;
    private ColorType type_;

    public Ball(GameInterface game, String tag){
        super(game, tag);
        iniPos_ = new Vector2(0.0f, 0.0f);
        init();
    }

    public void init(){
        super.init();
        setInitialPosition(game_.getGraphics().getDefaultWidth()/2, 0.0f);
        setPosition(game_.getGraphics().getDefaultWidth()/2, 0.0f);
        setVelocity(500);
        sprite_ = loadSprite("Sprites/balls.png", 2, 10, 0, 255);
        spriteAux_ = loadSprite("Sprites/balls.png", 2, 10, 10, 255);
        configure();
    }

    private void configure(){
        position_ = iniPos_;
        int newColor = new Random().nextInt(2);
        type_ = ColorType.values()[newColor];
    }

    public void render(){
        if(type_ == ColorType.WHITE) sprite_.draw(position_);
        else spriteAux_.draw(position_);
    }

    public void update(double deltaTime){
        float maxX = game_.getGraphics().getDefaultHeight() - scale_.y;

        position_.y += vel_ * deltaTime;

        if (position_.y > maxX) {
            configure();
        }
    }

    public void handleEvent(InputInterface.TouchEvent event){
        if(event.getEventType() == InputInterface.EventType.Pressed){
            if(type_ == ColorType.WHITE) type_ = ColorType.BLACK;
            else type_ = ColorType.WHITE;
        }
    }

    public void setInitialPosition(float x, float y){
        iniPos_.x = x;
        iniPos_.y = y;
    }

    public Vector2 getInitialPosition(){
        return iniPos_;
    }

    public void setVelocity(float vel){
        vel_=vel;
    }

    public float getVelocity(){
        return vel_;
    }
}