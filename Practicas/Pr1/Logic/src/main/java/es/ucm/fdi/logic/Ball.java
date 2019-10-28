package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;

public class Ball extends GameObject {
    private float vel_;

    public Ball(GameInterface game){
        super(game);
    }

    public void init(){
        super.init();
        vel_ = 0;
    }

    public void render(){
        game_.getGraphics().drawImage(image_, position.x - scale.x * image_.getWidth()/2,
                position.y - scale.x * image_.getHeight()/2, scale.x * image_.getWidth(),
                scale.y * image_.getHeight(), 255);
    }

    public void update(double deltaTime){
        float maxX = game_.getGraphics().getHeight() - scale.y;

        position.y += vel_ * deltaTime;
        while(position.y < 0 || position.y > maxX) {
            if (position.y < 0) {
                position.y = -position.y;
                vel_ *= -1;
            }
            else if (position.y > maxX) {
                // Nos salimos por la derecha. Rebotamos
                position.y = 2*maxX - position.y;
                vel_ *= -1;
            }
        } // while
    }

    public void setVelocity(float vel){
        vel_=vel;
    }

    public float getVelocity(){
        return vel_;
    }
}
