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

    private int colorIndex_;
    private int[] possibleColors_;

    private float vel_;

    public Background(GameInterface game, String tag){
        super(game, tag);
    }

    public void init(){
        super.init();
        sprite_ = loadSprite("Sprites/arrowsBackground.png", 1, 1, 0, 70);
        sprite2_ = loadSprite("Sprites/arrowsBackground.png", 1, 1, 0, 70);

        possibleColors_ = new int[]{0x41a85f, 0x00a885, 0x3d8eb9, 0x2969b0, 0x553982, 0x28324e, 0xf37934, 0xd14b41, 0x75706b};
        setColor(0);

        arrowsIniposY = Math.round(-getHeight()/2 - (getHeight()-game_.getGraphics().getDefaultHeight()));
        sprite1Y_ = arrowsIniposY;
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
            sprite1Y_ = sprite2Y_ - getHeight() - 1;
        }
        else if (sprite2Y_ > maxY) {
            sprite2Y_ = sprite1Y_ - getHeight() - 1;
        }
    }

    public boolean handleEvent(InputInterface.TouchEvent event){
        return false;
    }

    public void setColor(int colorIndex){
        colorIndex_ = colorIndex;
        arrowBackground_ = loadSprite("Sprites/backgrounds.png", 1, 9, colorIndex_, 255);
        arrowBackground_.setWidth(sprite_.getWidth());
        arrowBackground_.setHeight(sprite_.getHeight());
    }

    public int getColor(){
        return possibleColors_[colorIndex_];
    }

    public int getNumOfPossibleColors(){
        return possibleColors_.length;
    }

    public void setVelocity(float vel){
        vel_=vel;
    }

    public float getVelocity(){
        return vel_;
    }
}
