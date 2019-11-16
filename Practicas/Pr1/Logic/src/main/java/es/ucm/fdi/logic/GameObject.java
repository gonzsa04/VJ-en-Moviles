package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.ImageInterface;
import es.ucm.fdi.interfaces.InputInterface;
import es.ucm.fdi.interfaces.Sprite;
import es.ucm.fdi.utils.Vector2;

public abstract class GameObject {
    protected GameInterface game_;
    protected Vector2 position_;
    protected Vector2 scale_;
    protected Sprite sprite_;
    protected boolean active_;
    protected String tag_;

    public GameObject(GameInterface game, String tag){
        game_ = game;
        position_ = new Vector2(0.0f, 0.0f);
        scale_ = new Vector2(1.0f, 1.0f);
        tag_ = tag;
    }

    public void init(){
        setActive(true);
    }

    public abstract void render();

    public abstract void update(double deltaTime);

    public abstract boolean handleEvent(InputInterface.TouchEvent event);

    public Sprite loadSprite(String name){
        return new Sprite(game_.getGraphics(), name, scale_);
    }

    public Sprite loadSprite(String name, int rows, int cols, int frame, int alpha){
        return new Sprite(game_.getGraphics(), name, scale_, rows, cols, frame, alpha);
    }

    public void setSprite(Sprite sprite){
        sprite_ = sprite;
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
        if(sprite_ != null) sprite_.setScale(scale_);
    }

    public Vector2 getScale(){
        return scale_;
    }

    public float getWidth(){
        return scale_.x*sprite_.getWidth();
    }
    public float getHeight(){
        return scale_.y*sprite_.getHeight();
    }

    public void setActive(boolean active){
        active_ = active;
    }

    public boolean isActive(){
        return active_;
    }
}
