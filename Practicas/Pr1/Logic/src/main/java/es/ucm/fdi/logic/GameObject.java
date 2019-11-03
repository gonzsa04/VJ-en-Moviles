package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.ImageInterface;
import es.ucm.fdi.interfaces.Sprite;
import es.ucm.fdi.utils.Vector2;

public abstract class GameObject {
    protected GameInterface game_;
    protected Vector2 position_;
    protected Vector2 scale_;
    protected Sprite image_;
    protected boolean active_;

    public GameObject(GameInterface game){
        game_ = game;
        position_ = new Vector2(0.0f, 0.0f);
        scale_ = new Vector2(1.0f, 1.0f);
    }

    public abstract void render();

    public abstract void update(double deltaTime);

    public void setSprite(String name){
        image_ = new Sprite(game_.getGraphics(), name, scale_);
    }

    public void setSprite(String name, int rows, int cols, int frame, int alpha){
        image_ = new Sprite(game_.getGraphics(), name, scale_, rows, cols, frame, alpha);
    }

    public void setPosition(float x, float y){
        position_.x = x;
        position_.y = y;
    }

    public Vector2 getPosition(){
        return position_;
    }

    public void setScale(float x, float y){
        scale_.x = x;
        scale_.y = y;
        if(image_ != null) image_.setScale(scale_);
    }

    public Vector2 getScale(){
        return scale_;
    }

    public void setActive(boolean active){
        active_ = active;
    }

    public boolean isActive(){
        return active_;
    }
}
