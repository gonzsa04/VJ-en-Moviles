package es.ucm.fdi.logic;

import java.util.Random;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;

public class Ball extends GameObject {
    private float vel_;
    private Sprite spriteAux_;
    private ColorType type_;

    public Ball(GameInterface game, String tag){
        super(game, tag);
        init();
    }

    public void init(){
        super.init();
        setPosition(game_.getGraphics().getDefaultWidth()/2, 0.0f);
        setVelocity(500);
        sprite_ = loadSprite("Sprites/balls.png", 2, 10, 0, 255);
        spriteAux_ = loadSprite("Sprites/balls.png", 2, 10, 10, 255);
        reboot();
    }

    public void reboot(){
        int newColor = new Random().nextInt(2);
        type_ = ColorType.values()[newColor];
        setActive(true);
    }

    public void render(){
        if(type_ == ColorType.WHITE) sprite_.draw(position_);
        else spriteAux_.draw(position_);
    }

    public void update(double deltaTime){
        position_.y += vel_ * deltaTime;
    }

    public boolean handleEvent(InputInterface.TouchEvent event){
        return false;
    }

    public void setVelocity(float vel){
        vel_=vel;
    }

    public float getVelocity(){
        return vel_;
    }

    public ColorType getColorType() {
        return type_;
    }
}