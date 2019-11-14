package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;
import es.ucm.fdi.utils.Vector2;

public class Background extends GameObject {
    private Sprite sprite2_;
    private Sprite arrowBackground_;

    private float sprite1Y_, sprite2Y_;
    private float arrowsIniposY;

    private float vel_;

    public Background(GameInterface game, String tag){
        super(game, tag);
        init();
    }

    public void init(){
        super.init();
        sprite_ = loadSprite("Sprites/arrowsBackground.png", 1, 1, 0, 255);
        sprite2_ = loadSprite("Sprites/arrowsBackground.png", 1, 1, 0, 255);

        arrowsIniposY = -getHeight()/2 - (getHeight()-game_.getGraphics().getDefaultHeight());
        sprite1Y_ = arrowsIniposY -2;
        sprite2Y_ = arrowsIniposY + getHeight();
        setVelocity(500);
    }

    public void render(){
        arrowBackground_.draw();
        sprite_.draw(game_.getGraphics().getDefaultWidth()/2, sprite1Y_);
        sprite2_.draw(game_.getGraphics().getDefaultWidth()/2, sprite2Y_);
    }

    public void update(double deltaTime) {
        float maxY = game_.getGraphics().getDefaultHeight() + (getHeight() / 2);

        sprite1Y_ += vel_ * deltaTime;
        sprite2Y_ += vel_ * deltaTime;

        if (sprite1Y_ > maxY) {
            sprite1Y_ = arrowsIniposY - 2;
            sprite2Y_ = arrowsIniposY + getHeight();
        }
        else if (sprite2Y_ > maxY) {
            sprite2Y_ = arrowsIniposY - 2;
            sprite1Y_ = arrowsIniposY + getHeight();
        }
    }

    public void handleEvent(InputInterface.TouchEvent event){
    }

    public void setBackground(int numOfColor){
        arrowBackground_ = loadSprite("Sprites/backgrounds.png", 1, 9, numOfColor, 255);
        arrowBackground_.setWidth(sprite_.getWidth());
        arrowBackground_.setHeight(sprite_.getHeight());
    }

    public void setVelocity(float vel){
        vel_=vel;
    }

    public float getVelocity(){
        return vel_;
    }
}
