package es.ucm.fdi.logic;

import java.awt.Color;

import es.ucm.fdi.interfaces.AbstractGraphics;
import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;

enum ColorType { WHITE, BLACK }

public class Ball extends GameObject {
    private float vel_;
    private Sprite spriteAux_;
    private ColorType type;

    public Ball(GameInterface game, String tag){
        super(game, tag);
        init();
    }

    public void init(){
        super.init();
        vel_ = 0;
        setScale(1.5f, 1.5f);
        setPosition(game_.getGraphics().getDefaultWidth()/2, 0.0f);
        setVelocity(500);
        sprite_ = loadSprite("Sprites/balls.png", 2, 10, 0, 255);
        spriteAux_ = loadSprite("Sprites/balls.png", 2, 10, 10, 255);
        type = ColorType.WHITE;
    }

    public void render(){
        if(type == ColorType.WHITE) sprite_.draw(position_);
        else spriteAux_.draw(position_);
    }

    public void update(double deltaTime){
        float maxX = game_.getGraphics().getDefaultHeight() - scale_.y;

        position_.y += vel_ * deltaTime;
        while(position_.y < 0 || position_.y > maxX) {
            if (position_.y < 0) {
                position_.y = -position_.y;
                vel_ *= -1;
            }
            else if (position_.y > maxX) {
                // Nos salimos por la derecha. Rebotamos
                position_.y = 2*maxX - position_.y;
                vel_ *= -1;
            }
        } // while
    }

    public void handleEvent(InputInterface.TouchEvent event){
        if(event.getEventType() == InputInterface.EventType.Pressed){
            if(type == ColorType.WHITE) type = ColorType.BLACK;
            else type = ColorType.WHITE;
        }
    }

    public void setVelocity(float vel){
        vel_=vel;
    }

    public float getVelocity(){
        return vel_;
    }
}
