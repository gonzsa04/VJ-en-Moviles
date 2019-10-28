package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;
import es.ucm.fdi.interfaces.ImageInterface;
import es.ucm.fdi.utils.Vector2;

public abstract class GameObject {
    protected GameInterface game_;
    protected Vector2 position;
    protected Vector2 scale;
    protected ImageInterface image_;

    public GameObject(GameInterface game){
        game_ = game;
    }

    public void init(){
        position = new Vector2(0.0f, 0.0f);
        scale = new Vector2(1.0f, 1.0f);
        image_ = game_.getGraphics().newImage("Sprites/java.png"); // imagen por defecto
    }

    public abstract void render();

    public abstract void update(double deltaTime);

    public void setImage(String name){
        image_ = game_.getGraphics().newImage(name);
    }

    public void setPosition(float x, float y){
        position = new Vector2(x, y);
    }

    public Vector2 getPosition(){
        return position;
    }

    public void setScale(float x, float y){
        scale = new Vector2(x, y);
    }

    public Vector2 getScale(){
        return scale;
    }
}
