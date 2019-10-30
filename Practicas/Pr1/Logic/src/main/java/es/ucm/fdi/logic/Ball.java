package es.ucm.fdi.logic;

import es.ucm.fdi.interfaces.GameInterface;

public class Ball extends GameObject {
    private float vel_;

    public Ball(GameInterface game){ super(game); }

    public void init(){
        super.init();
        vel_ = 0;
    }

    public void render(){
        image_.draw(position_);
    }

    public void update(double deltaTime){
        float maxX = game_.getGraphics().getHeight() - scale_.y;

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

    public void setVelocity(float vel){
        vel_=vel;
    }

    public float getVelocity(){
        return vel_;
    }
}
