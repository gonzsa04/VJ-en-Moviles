package es.ucm.fdi.logic;

import java.util.Random;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;

public class Ball extends GameObject {
    protected float velY_;
    protected ColorType type_;

    public Ball(GameInterface game, String tag){
        super(game, tag);
    }

    public void init(){
        super.init();
        setPosition(game_.getGraphics().getGameWidth()/2, 0.0f);
        setVelocity(500);
        sprite_ = loadSprite("Sprites/balls.png", 2, 10, 0, 255);

        setRandomColorFrom(ColorType.WHITE);
        setActive(true);
    }

    public void reset(){
        setVelocity(500);
        setActive(true);
    }

    public void render(){
        sprite_.draw(position_);
    }

    public void update(double deltaTime){
        position_.y += velY_ * deltaTime;
    }

    public boolean handleEvent(InputInterface.TouchEvent event){
        return false;
    }

    public void setVelocity(float vel){
        velY_=vel;
    }

    public float getVelocity(){
        return velY_;
    }

    public void setRandomColorFrom(ColorType color){
        int newColor = new Random().nextInt(11);

        if(newColor < 7) type_ = color;
        else {
            if (color == ColorType.WHITE) type_ = ColorType.BLACK;
            else type_ = ColorType.WHITE;
        }

        if(type_ == ColorType.WHITE)
            sprite_.setFrame(0);
        else
            sprite_.setFrame(10);
    }

    public ColorType getColorType() {
        return type_;
    }
}