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

    public GameObject(GameInterface game){
        game_ = game;
    }

    public void init(){
        position_ = new Vector2(0.0f, 0.0f);
        scale_ = new Vector2(1.0f, 1.0f);
        image_ = new Sprite(game_.getGraphics(), "Sprites/java.png", scale_); // imagen por defecto
    }

    public abstract void render();

    public abstract void update(double deltaTime);

    public void setSprite(String name){
        image_ = new Sprite(game_.getGraphics(), name, scale_);
    }

    public void setSprite(String name, int left, int top, int right, int bottom, int alpha){
        image_ = new Sprite(game_.getGraphics(), name, scale_, left, top, right, bottom, alpha);
    }

    public void setPosition(Vector2 position){ position_ = position; }

    public Vector2 getPosition(){
        return position_;
    }

    public void setScale(Vector2 scale){
        scale_ = scale;
        image_.setScale(scale_);
    }

    public Vector2 getScale(){
        return scale_;
    }
}
